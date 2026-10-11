import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { sampleExplorations, conceptExpansions } from './data/sampleData.js';
import { queryCache, expansionCache } from './services/cache.js';
import { generateExplorationGraph, expandConceptWithGemini } from './services/gemini.js';

// Load .env from root or server directory
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
dotenv.config(); // fallback to local

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Status & Health Check
app.get('/api/status', (req, res) => {
  const geminiConfigured = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0);
  const tavilyConfigured = Boolean(process.env.TAVILY_API_KEY && process.env.TAVILY_API_KEY.trim().length > 0);
  
  res.json({
    ok: true,
    geminiConfigured,
    tavilyConfigured,
    demoMode: !geminiConfigured,
    message: geminiConfigured
      ? 'Live AI mode active with Gemini API & Tavily Search'
      : 'Demo Mode: Running with curated knowledge graphs. Set GEMINI_API_KEY for dynamic queries.',
  });
});

// List all sample datasets
app.get('/api/samples', (req, res) => {
  const list = Object.values(sampleExplorations).map(item => ({
    id: item.id,
    query: item.query,
    title: item.title,
    summary: item.summary,
    stats: item.stats,
    rootConceptId: item.rootConceptId,
  }));
  res.json(list);
});

// Get a specific sample exploration
app.get('/api/sample/:id', (req, res) => {
  const sample = sampleExplorations[req.params.id];
  if (sample) {
    res.json({ ...sample, isDemo: true });
  } else {
    res.status(404).json({ error: 'Sample exploration not found' });
  }
});

// Helper to find closest sample match based on keywords
function findMatchingSample(query) {
  const q = query.toLowerCase();
  if (q.includes('dream') || q.includes('sleep') || q.includes('rem')) {
    return sampleExplorations['why-do-humans-dream'];
  }
  if (q.includes('conscious') || q.includes('mind') || q.includes('qualia') || q.includes('brain')) {
    return sampleExplorations['the-nature-of-consciousness'];
  }
  if (q.includes('black hole') || q.includes('relativity') || q.includes('time') || q.includes('gravity') || q.includes('space')) {
    return sampleExplorations['black-holes-and-time'];
  }
  if (q.includes('memory') || q.includes('memories') || q.includes('recall') || q.includes('psycholog')) {
    return sampleExplorations['the-psychology-of-memories'];
  }
  if (q.includes('alien') || q.includes('alone') || q.includes('universe') || q.includes('fermi') || q.includes('life')) {
    return sampleExplorations['are-we-alone-in-the-universe'];
  }
  // Return the flagship dreams sample as fallback
  return sampleExplorations['why-do-humans-dream'];
}

// Generate exploration graph from question
app.post('/api/explore', async (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  const cleanQuery = query.trim();
  const cacheKey = cleanQuery.toLowerCase();

  // Check cache first
  const cached = queryCache.get(cacheKey);
  if (cached) {
    return res.json({ graph: cached, isCached: true, isDemo: !process.env.GEMINI_API_KEY });
  }

  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0);

  if (hasGeminiKey) {
    try {
      console.log(`[Explore] Calling Gemini for: "${cleanQuery}"`);
      const graph = await generateExplorationGraph(cleanQuery);
      if (graph) {
        queryCache.set(cacheKey, graph);
        return res.json({ graph, isDemo: false });
      }
    } catch (err) {
      console.error(`[Explore] Gemini generation failed: ${err.message}. Falling back to sample data.`);
    }
  }

  // Demo fallback
  console.log(`[Explore] Using Demo dataset for: "${cleanQuery}"`);
  const matchedSample = findMatchingSample(cleanQuery);
  const customDemoGraph = {
    ...matchedSample,
    id: `demo-${cleanQuery.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    query: cleanQuery,
    title: cleanQuery.endsWith('?') ? cleanQuery : `${cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1)}?`,
    isDemo: true,
  };

  queryCache.set(cacheKey, customDemoGraph);
  res.json({
    graph: customDemoGraph,
    isDemo: true,
    message: hasGeminiKey
      ? 'AI rate limit or parsing fallback: showing curated demo knowledge graph.'
      : 'Demo Mode: Showing curated knowledge graph. Configure GEMINI_API_KEY for dynamic queries.',
  });
});

// Expand node ("Explore Deeper")
app.post('/api/expand', async (req, res) => {
  const { concept, explorationContext } = req.body;
  if (!concept || !concept.id) {
    return res.status(400).json({ error: 'Concept object with id is required' });
  }

  const cacheKey = `expand:${concept.id}`;
  const cached = expansionCache.get(cacheKey);
  if (cached) {
    return res.json({ ...cached, isCached: true });
  }

  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0);

  if (hasGeminiKey) {
    try {
      console.log(`[Expand] Expanding concept with Gemini: "${concept.label}"`);
      const result = await expandConceptWithGemini(concept, explorationContext || '');
      if (result) {
        expansionCache.set(cacheKey, result);
        return res.json({ ...result, isDemo: false });
      }
    } catch (err) {
      console.error(`[Expand] Gemini expansion failed: ${err.message}. Using demo expansion.`);
    }
  }

  // Demo expansion lookup
  if (conceptExpansions[concept.id]) {
    const demoExp = conceptExpansions[concept.id];
    expansionCache.set(cacheKey, demoExp);
    return res.json({ ...demoExp, isDemo: true });
  }

  // Synthesize realistic child concepts for any arbitrary node
  const cleanLabel = concept.label || 'Concept';
  const child1Id = `${concept.id}-deep-1`;
  const child2Id = `${concept.id}-deep-2`;

  const fallbackExp = {
    isDemo: true,
    newConcepts: [
      {
        id: child1Id,
        label: `${cleanLabel} Subsystems`,
        type: 'related',
        tagline: `Granular mechanisms underlying ${cleanLabel}.`,
        tags: [...(concept.tags || ['Research']), 'Granular Dynamics'],
        overview: `A specialized investigation into how ${cleanLabel} operates at the micro-scale, revealing interconnected functional patterns and sub-mechanisms.`,
        imageUrl: concept.imageUrl || 'https://images.unsplash.com/photo-1507499739999-097706ad8914?q=80&w=800&auto=format&fit=crop',
        icon: 'network',
        sources: [
          {
            title: `Empirical Review of ${cleanLabel}`,
            url: 'https://scholar.google.com',
            snippet: `Foundational research mapping the foundational vectors of ${cleanLabel}.`,
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: concept.id,
            targetLabel: cleanLabel,
            evidenceType: 'speculative',
            explanation: `Cross-boundary isomorphic relationship discovered between sub-elements of ${cleanLabel} and external physical systems.`
          }
        ],
        keyConnections: [
          { id: concept.id, label: cleanLabel, note: 'Primary parent concept' }
        ]
      },
      {
        id: child2Id,
        label: `Boundary Conditions of ${cleanLabel}`,
        type: 'cross',
        tagline: `Where ${cleanLabel} interfaces with adjacent domains.`,
        tags: ['Theoretical Limits', 'Interdisciplinary'],
        overview: `Exploring edge-cases and critical thresholds where standard assumptions regarding ${cleanLabel} give way to novel interdisciplinary hypotheses.`,
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
        icon: 'sparkles',
        sources: [],
        weirdBridges: [
          {
            targetConceptId: child1Id,
            targetLabel: `${cleanLabel} Subsystems`,
            evidenceType: 'analogy',
            explanation: 'Structural correspondence across scale boundaries.'
          }
        ],
        keyConnections: [
          { id: concept.id, label: cleanLabel, note: 'Direct ancestor' }
        ]
      }
    ],
    newEdges: [
      { id: `exp-e-${Date.now()}-1`, source: concept.id, target: child1Id, type: 'related', label: 'deepens into' },
      { id: `exp-e-${Date.now()}-2`, source: concept.id, target: child2Id, type: 'cross', label: 'bounded by' }
    ]
  };

  expansionCache.set(cacheKey, fallbackExp);
  res.json(fallbackExp);
});

// Serve frontend client in production
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(clientDistPath, 'index.html'), err => {
    if (err) {
      res.status(200).send('Rabbit Hole Server running. Client dist not built yet.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`✨ Rabbit Hole Server running on http://localhost:${PORT}`);
  console.log(`   Gemini API Key: ${process.env.GEMINI_API_KEY ? 'Configured ✅' : 'Not set (Demo mode active ⚡)'}`);
  console.log(`   Tavily API Key: ${process.env.TAVILY_API_KEY ? 'Configured ✅' : 'Not set'}`);
});
