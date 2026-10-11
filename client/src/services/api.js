// API service for Rabbit Hole frontend
import { sampleExplorations, conceptExpansions } from '../data/sampleData.js';

const API_BASE = '/api';

/**
 * Check backend status and API key configuration
 */
export async function getBackendStatus() {
  try {
    const res = await fetch(`${API_BASE}/status`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend unavailable, running in pure client demo mode:', err.message);
  }
  return {
    ok: false,
    demoMode: true,
    geminiConfigured: false,
    tavilyConfigured: false,
    message: 'Backend server offline. Running in local demo mode with sample datasets.'
  };
}

/**
 * Fetch exploration graph for a query
 */
export async function fetchExploration(query) {
  try {
    const res = await fetch(`${API_BASE}/explore`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn('API call failed, falling back to local dataset:', err.message);
  }

  // Pure frontend offline fallback
  const q = query.toLowerCase();
  let matched = sampleExplorations['why-do-humans-dream'];
  if (q.includes('conscious') || q.includes('mind') || q.includes('brain')) {
    matched = sampleExplorations['the-nature-of-consciousness'];
  } else if (q.includes('black hole') || q.includes('time') || q.includes('relativity') || q.includes('gravity')) {
    matched = sampleExplorations['black-holes-and-time'];
  } else if (q.includes('memory') || q.includes('memories') || q.includes('recall')) {
    matched = sampleExplorations['the-psychology-of-memories'];
  } else if (q.includes('alone') || q.includes('universe') || q.includes('alien') || q.includes('fermi')) {
    matched = sampleExplorations['are-we-alone-in-the-universe'];
  }

  return {
    graph: {
      ...matched,
      id: `local-${q.replace(/[^a-z0-9]+/g, '-')}`,
      query,
      title: query.endsWith('?') ? query : `${query.charAt(0).toUpperCase() + query.slice(1)}?`,
      isDemo: true,
    },
    isDemo: true,
    message: 'Curated Demo Mode: Showing curated knowledge graph.',
  };
}

/**
 * Expand a concept with child nodes ("Explore Deeper")
 */
export async function expandConcept(concept, explorationContext) {
  try {
    const res = await fetch(`${API_BASE}/expand`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ concept, explorationContext }),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('API expansion failed, using local expansion:', err.message);
  }

  // Local fallback expansion
  if (conceptExpansions[concept.id]) {
    return { ...conceptExpansions[concept.id], isDemo: true };
  }

  const childId1 = `${concept.id}-deep-1`;
  const childId2 = `${concept.id}-deep-2`;
  return {
    isDemo: true,
    newConcepts: [
      {
        id: childId1,
        label: `${concept.label} Fundamentals`,
        type: 'related',
        tagline: `Underlying mechanisms and principles of ${concept.label}.`,
        tags: [...(concept.tags || []), 'Foundations'],
        overview: `A closer inspection into the building blocks that govern ${concept.label}, highlighting empirical observations and theoretical structures.`,
        imageUrl: concept.imageUrl,
        icon: 'network',
        sources: [
          {
            title: `Key Research on ${concept.label}`,
            url: 'https://scholar.google.com',
            snippet: `Seminal paper mapping foundational dynamics.`,
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: concept.id,
            targetLabel: concept.label,
            evidenceType: 'speculative',
            explanation: `Cross-system correspondence between internal components and external models.`
          }
        ],
        keyConnections: [
          { id: concept.id, label: concept.label, note: 'Parent concept' }
        ]
      },
      {
        id: childId2,
        label: `${concept.label} Frontiers`,
        type: 'cross',
        tagline: `Emerging inquiries and open questions at the frontier of ${concept.label}.`,
        tags: ['Frontiers', 'Emerging Research'],
        overview: `Recent experiments and hypotheses challenging classical perspectives on ${concept.label}.`,
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
        icon: 'sparkles',
        sources: [],
        weirdBridges: [
          {
            targetConceptId: childId1,
            targetLabel: `${concept.label} Fundamentals`,
            evidenceType: 'analogy',
            explanation: `Modern frontiers reconcile microscopic laws with macroscopic phenomena.`
          }
        ],
        keyConnections: [
          { id: concept.id, label: concept.label, note: 'Direct ancestor' }
        ]
      }
    ],
    newEdges: [
      { id: `local-exp-${Date.now()}-1`, source: concept.id, target: childId1, type: 'related', label: 'deepens into' },
      { id: `local-exp-${Date.now()}-2`, source: concept.id, target: childId2, type: 'cross', label: 'frontiers of' }
    ]
  };
}

/**
 * Fetch sample by id
 */
export async function fetchSampleById(id) {
  try {
    const res = await fetch(`${API_BASE}/sample/${id}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // fallback
  }
  return sampleExplorations[id] || sampleExplorations['why-do-humans-dream'];
}
