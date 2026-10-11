// Gemini API service for structured knowledge graph generation
import { searchTavily } from './tavily.js';
import { resolveTopicAccurateImage, getThematicImageUrl } from './imageService.js';

const GEMINI_MODELS = [
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash',
  'gemini-flash-latest',
];

/**
 * Call Gemini API with model fallback and JSON mode
 */
async function callGemini(apiKey, systemInstruction, userPrompt) {
  let lastError = null;

  for (const model of GEMINI_MODELS) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
      
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemInstruction}\n\nTask:\n${userPrompt}` }]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.3,
          maxOutputTokens: 8192,
          thinkingConfig: {
            thinkingBudget: 0,
          },
        }
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`[Gemini API] Model ${model} returned error ${response.status}: ${errorText}`);
        lastError = new Error(`Gemini API error (${response.status}): ${errorText}`);
        continue;
      }

      const data = await response.json();
      let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!rawText) {
        throw new Error('Empty response from Gemini API');
      }

      // Strip markdown code fences if present
      rawText = rawText.trim();
      if (rawText.startsWith('```json')) {
        rawText = rawText.slice(7);
      } else if (rawText.startsWith('```')) {
        rawText = rawText.slice(3);
      }
      if (rawText.endsWith('```')) {
        rawText = rawText.slice(0, -3);
      }
      rawText = rawText.trim();

      const parsed = JSON.parse(rawText);
      return parsed;
    } catch (err) {
      console.warn(`[Gemini API] Failed with ${model}:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error('All Gemini models failed');
}

/**
 * Validate and sanitize generated exploration graph schema
 */
export async function validateAndCleanGraph(data, query, sources = []) {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid graph data format');
  }

  const id = (data.id || query.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) || 'exploration';
  const title = data.title || query;
  const summary = data.summary || `Knowledge exploration into "${query}"`;
  
  const rawConcepts = Array.isArray(data.concepts) ? data.concepts : [];
  if (rawConcepts.length === 0) {
    throw new Error('Generated graph contains no concepts');
  }

  const conceptMap = new Map();
  const validEvidenceTypes = new Set(['evidence-supported', 'speculative', 'analogy']);
  const usedImages = new Set();
  const cleanedConcepts = [];

  // Sanitize concepts and resolve authentic topic-accurate photography
  for (let idx = 0; idx < rawConcepts.length; idx++) {
    const c = rawConcepts[idx];
    const conceptId = String(c.id || `concept-${idx}`).toLowerCase().replace(/[^a-z0-9-_]/g, '');
    const label = String(c.label || c.title || `Concept ${idx + 1}`).trim();
    
    // Validate type
    let type = c.type;
    if (!['core', 'related', 'cross', 'weird-bridge'].includes(type)) {
      type = idx === 0 ? 'core' : 'related';
    }

    // Sanitize Weird Bridges
    const weirdBridges = Array.isArray(c.weirdBridges)
      ? c.weirdBridges.map(wb => ({
          targetConceptId: String(wb.targetConceptId || '').toLowerCase().replace(/[^a-z0-9-_]/g, ''),
          targetLabel: String(wb.targetLabel || 'Unexpected Connection'),
          evidenceType: validEvidenceTypes.has(wb.evidenceType) ? wb.evidenceType : 'speculative',
          explanation: String(wb.explanation || 'An intriguing interdisciplinary connection.'),
        }))
      : [];

    // Sanitize Sources - merge with verified search results if relevant
    const conceptSources = Array.isArray(c.sources) ? c.sources : [];
    const mergedSources = [
      ...conceptSources.map(s => ({
        title: s.title || 'Research Reference',
        url: s.url && s.url.startsWith('http') ? s.url : `https://scholar.google.com/scholar?q=${encodeURIComponent((s.title || label) + ' research')}`,
        snippet: s.snippet || '',
        isVerified: !!s.isVerified || !!(s.url && s.url.startsWith('http'))
      })),
      ...(sources.length > 0 && idx === 0 ? sources.slice(0, 3) : [])
    ];

    // Guarantee that every concept receives an authentic, topic-representing image with per-graph deduplication
    const imageUrl = await resolveTopicAccurateImage(label, c.tags || [], c.overview || '', usedImages);
    usedImages.add(imageUrl);

    const cleaned = {
      id: conceptId,
      label,
      type,
      tagline: String(c.tagline || 'Key concept in this exploration'),
      tags: Array.isArray(c.tags) ? c.tags.slice(0, 6) : ['Concept'],
      overview: String(c.overview || 'Exploration into the principles and connections of this topic.'),
      imageUrl,
      icon: c.icon || 'circle',
      sources: mergedSources,
      weirdBridges,
      keyConnections: Array.isArray(c.keyConnections) ? c.keyConnections : []
    };

    cleanedConcepts.push(cleaned);
    conceptMap.set(conceptId, cleaned);
  }

  // Ensure root concept exists
  let rootConceptId = data.rootConceptId;
  if (!conceptMap.has(rootConceptId)) {
    // pick first 'core' or first concept
    const coreConcept = cleanedConcepts.find(c => c.type === 'core');
    rootConceptId = coreConcept ? coreConcept.id : cleanedConcepts[0].id;
  }
  // Ensure the root concept has type 'core'
  if (conceptMap.has(rootConceptId)) {
    conceptMap.get(rootConceptId).type = 'core';
  }

  // Sanitize edges: ensure source & target exist
  const rawEdges = Array.isArray(data.edges) ? data.edges : [];
  const cleanedEdges = [];
  const edgeSet = new Set();

  rawEdges.forEach((e, idx) => {
    const source = String(e.source || '').toLowerCase().replace(/[^a-z0-9-_]/g, '');
    const target = String(e.target || '').toLowerCase().replace(/[^a-z0-9-_]/g, '');

    if (source && target && source !== target && conceptMap.has(source) && conceptMap.has(target)) {
      const edgeKey = `${source}->${target}`;
      if (!edgeSet.has(edgeKey)) {
        edgeSet.add(edgeKey);
        cleanedEdges.push({
          id: e.id || `e-${idx + 1}`,
          source,
          target,
          type: ['related', 'cross', 'suggested', 'weird-bridge'].includes(e.type) ? e.type : 'related',
          label: String(e.label || 'connects to')
        });
      }
    }
  });

  // If no edges, connect root to all other concepts
  if (cleanedEdges.length === 0) {
    cleanedConcepts.forEach((c, idx) => {
      if (c.id !== rootConceptId) {
        cleanedEdges.push({
          id: `e-auto-${idx}`,
          source: rootConceptId,
          target: c.id,
          type: 'related',
          label: 'relates to'
        });
      }
    });
  }

  // Populate keyConnections if missing
  cleanedConcepts.forEach(c => {
    if (!c.keyConnections || c.keyConnections.length === 0) {
      const neighbors = cleanedEdges
        .filter(e => e.source === c.id || e.target === c.id)
        .map(e => (e.source === c.id ? e.target : e.source))
        .filter(nId => conceptMap.has(nId));
      
      c.keyConnections = neighbors.slice(0, 4).map(nId => ({
        id: nId,
        label: conceptMap.get(nId).label,
        note: `Connected via knowledge network`
      }));
    }
  });

  const followUps = Array.isArray(data.followUps) && data.followUps.length > 0
    ? data.followUps.slice(0, 5)
    : [
        `How does this connect to emerging modern technology?`,
        `What are the major scientific controversies surrounding this?`,
        `What foundational experiments established these principles?`
      ];

  return {
    id,
    query,
    title,
    summary,
    stats: {
      conceptsCount: cleanedConcepts.length,
      connectionsCount: cleanedEdges.length,
    },
    rootConceptId,
    concepts: cleanedConcepts,
    edges: cleanedEdges,
    followUps,
    isAiGenerated: true,
  };
}

/**
 * Generate exploration graph using Gemini AI and Brave Search
 */
export async function generateExplorationGraph(query) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    return null; // Will trigger sample fallback
  }

  // Step 1: Perform Tavily Search for factual grounding
  let searchSources = [];
  try {
    searchSources = await searchTavily(query);
  } catch (err) {
    console.warn('[Gemini Service] Tavily search error:', err.message);
  }

  const sourcesContext = searchSources.length > 0
    ? `\nVerified Web Research Findings:\n` + searchSources.map(s => `- ${s.title}: ${s.snippet} (${s.url})`).join('\n')
    : '';

  // Step 2: System instruction for structured knowledge graph
  const systemInstruction = `You are the knowledge synthesis engine for "Rabbit Hole", an interactive visual knowledge explorer.
You generate rich, intellectually fascinating knowledge graphs in JSON format.
Your signature feature is "Weird Bridges": surprising, unexpected, yet illuminating connections between distant disciplines (e.g. neurobiology with distributed databases, quantum mechanics with evolutionary biology, sleep with AI regularization).

Every Weird Bridge MUST be labeled with one of three explicit evidence types:
1. "evidence-supported": Empirically documented or peer-reviewed research findings.
2. "speculative": Intriguing theoretical hypothesis or emerging research proposal.
3. "analogy": Structural or mechanistic conceptual isomorphism between disparate fields.

CRITICAL RULES:
- Return ONLY valid JSON matching the exact schema below.
- Do NOT wrap in markdown code blocks or add explanatory text outside JSON.
- Create 8 to 10 distinct, high-quality concepts.
- Provide 1 root concept (type: "core") representing the primary focus.
- Connect concepts with 12 to 18 meaningful directional edges.
- Provide real, well-written overviews (60-90 words each), clear taglines, and relevant domain tags.
- Provide 3-5 thought-provoking follow-up questions.
- Never fabricate citations. Distinguish verified facts from analogies and speculations.

REQUIRED JSON OUTPUT FORMAT:
{
  "id": "slug-id",
  "title": "Title of the exploration",
  "summary": "1-2 sentence compelling summary",
  "rootConceptId": "id-of-core-concept",
  "concepts": [
    {
      "id": "concept-id-slug",
      "label": "Short Title (1-3 words)",
      "type": "core" | "related" | "cross" | "weird-bridge",
      "tagline": "One punchy sentence",
      "tags": ["Tag1", "Tag2", "Tag3"],
      "overview": "Detailed explanation of this concept and how it directly illuminates the core topic.",
      "imageUrl": "https://images.unsplash.com/photo-...",
      "icon": "brain" | "moon" | "sparkles" | "eye" | "activity" | "tree-pine" | "sunset" | "mountain" | "network" | "book-open" | "cpu" | "disc" | "clock" | "zap",
      "weirdBridges": [
        {
          "targetConceptId": "other-concept-id",
          "targetLabel": "Unexpected Target Field",
          "evidenceType": "evidence-supported" | "speculative" | "analogy",
          "explanation": "Clear explanation of how these two fields connect surprisingly."
        }
      ],
      "keyConnections": [
        { "id": "other-concept-id", "label": "Other Label", "note": "Short explanation of connection" }
      ],
      "sources": [
        { "title": "Authoritative paper or article", "url": "https://...", "snippet": "Key claim", "isVerified": true }
      ]
    }
  ],
  "edges": [
    { "id": "e1", "source": "concept-id-1", "target": "concept-id-2", "type": "related" | "cross" | "suggested" | "weird-bridge", "label": "short action label" }
  ],
  "followUps": [
    "Thought provoking question 1?",
    "Thought provoking question 2?"
  ]
}`;

  const userPrompt = `User question to explore in Rabbit Hole: "${query}"${sourcesContext}`;

  const generatedJson = await callGemini(apiKey, systemInstruction, userPrompt);
  return await validateAndCleanGraph(generatedJson, query, searchSources);
}

/**
 * Expand a single concept with 2-3 new related concepts and edges
 */
export async function expandConceptWithGemini(concept, queryContext) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    return null;
  }

  const systemInstruction = `You are the expansion engine for "Rabbit Hole".
The user has clicked "Explore Deeper" on the concept: "${concept.label}" (${concept.tagline}) in the context of "${queryContext}".
Generate 2 to 3 brand new, deeply relevant child/connected concepts and connecting edges in JSON format.
Include at least one "Weird Bridge" connection with an evidence label ("evidence-supported" | "speculative" | "analogy").

Return ONLY JSON matching:
{
  "newConcepts": [
    {
      "id": "new-concept-slug",
      "label": "Short Title",
      "type": "related" | "cross" | "weird-bridge",
      "tagline": "Punchy tagline",
      "tags": ["Tag1", "Tag2"],
      "overview": "Detailed overview paragraph (80-120 words).",
      "imageUrl": "https://images.unsplash.com/...",
      "icon": "zap" | "shield" | "compass" | "brain" | "sparkles",
      "weirdBridges": [
        {
          "targetConceptId": "${concept.id}",
          "targetLabel": "${concept.label}",
          "evidenceType": "evidence-supported" | "speculative" | "analogy",
          "explanation": "Why this unexpected bridge holds true."
        }
      ],
      "keyConnections": [
        { "id": "${concept.id}", "label": "${concept.label}", "note": "Parent explored concept" }
      ],
      "sources": []
    }
  ],
  "newEdges": [
    { "id": "exp-e-1", "source": "${concept.id}", "target": "new-concept-slug", "type": "related", "label": "deepens into" }
  ]
}`;

  const userPrompt = `Expand concept: ${concept.label}`;
  const responseJson = await callGemini(apiKey, systemInstruction, userPrompt);
  
  if (!responseJson || !Array.isArray(responseJson.newConcepts)) {
    throw new Error('Invalid expansion response structure');
  }

  const usedExpImages = new Set();
  for (let i = 0; i < responseJson.newConcepts.length; i++) {
    const nc = responseJson.newConcepts[i];
    nc.imageUrl = await resolveTopicAccurateImage(nc.label, nc.tags || [], nc.overview || '', usedExpImages);
    usedExpImages.add(nc.imageUrl);
  }

  return responseJson;
}
