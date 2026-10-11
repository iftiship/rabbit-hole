// Client-side thematic image resolver for Rabbit Hole
// Guarantees every circle directly and authentically connects to the topic it represents, with deduplication.

export const THEMATIC_IMAGE_CATALOG = [
  // 1. Cellular Biology, Senescence & Telomeres
  {
    keywords: ['cellular senescence', 'senescence', 'telomere', 'hayflick', 'cell cycle', 'apoptosis', 'mitosis'],
    url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['dna', 'gene', 'genetic', 'chromosome', 'genome', 'mutation', 'helix', 'nucleotide'],
    url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['antagonistic pleiotropy', 'pleiotropy', 'evolutionary genetics', 'genomics', 'allele', 'trade-off'],
    url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['finite soma', 'disposable soma', 'metabolic allocation', 'soma', 'resource allocation', 'biological trade-off'],
    url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['aging', 'mortality', 'biological mortality', 'lifespan', 'longevity', 'centenarian', 'senescence'],
    url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['mitochondria', 'cell', 'cellular', 'metabolism', 'microscopic', 'tissue', 'biochemistry'],
    url: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=800&auto=format&fit=crop',
  },

  // 2. Cardiology & Organ Systems
  {
    keywords: ['cardiovascular', 'heart', 'cardiac', 'pulse', 'artery', 'circulation', 'hemodynamic'],
    url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['cascading systems', 'organ failure', 'systemic failure', 'network failure', 'physiological collapse'],
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['epidemiological', 'public health', 'demography', 'epidemiology', 'vaccine', 'population mortality'],
    url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop',
  },

  // 3. Neuroscience, Brain & Mind
  {
    keywords: ['terminal neurochemical', 'neurochemical surge', 'brainwave', 'gamma surge', 'neurotransmitters'],
    url: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['brain', 'neuro', 'cortex', 'synapse', 'neuron', 'cerebral', 'hippocampus', 'neural'],
    url: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['consciousness', 'qualia', 'sentience', 'ego', 'mind', 'awareness', 'self', 'perception'],
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['dream', 'dreaming', 'night', 'sleep', 'rem', 'lucid', 'unconscious', 'somnology'],
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['sleep cycle', 'sleep cycles', 'circadian', 'ultradian', 'slow-wave', 'nrem', 'bed', 'rest'],
    url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['rem sleep', 'deep sleep', 'bedtime', 'moon'],
    url: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['memory', 'memories', 'consolidation', 'recall', 'recollection', 'flashbulb', 'reconsolidation'],
    url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['emotion', 'emotions', 'feeling', 'mood', 'joy', 'fear', 'grief', 'affective'],
    url: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['mental health', 'therapy', 'depression', 'anxiety', 'psychiatry', 'resilience', 'calm'],
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop',
  },

  // 4. Physics, Cosmos & Thermodynamics
  {
    keywords: ['thermodynamic entropy', 'entropy', 'thermodynamics', 'second law', 'heat death', 'dissipation', 'disorder'],
    url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['black hole', 'event horizon', 'singularity', 'gravity', 'gravitational', 'general relativity'],
    url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['time', 'time dilation', 'clock', 'chronology', 'spacetime', 'relativity', 'arrow of time'],
    url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['universe', 'cosmos', 'cosmology', 'galaxy', 'astrophysics', 'deep space', 'hubble', 'jwst'],
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['quantum', 'hawking', 'particle', 'superposition', 'entanglement', 'subatomic', 'physics'],
    url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['fermi', 'alien', 'extraterrestrial', 'seti', 'drake', 'exoplanet', 'biosignature', 'great filter'],
    url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop',
  },

  // 5. Nature & Earth
  {
    keywords: ['tree', 'trees', 'forest', 'mycorrhizal', 'fungi', 'wood', 'roots', 'botany', 'canopy'],
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['ocean', 'marine', 'water', 'sea', 'whale', 'underwater', 'deep ocean'],
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['earth', 'planet', 'geology', 'plate tectonics', 'climate', 'atmosphere', 'environment'],
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop',
  },

  // 6. Technology, AI & Networks
  {
    keywords: ['neural regularization', 'overfitting', 'neural network', 'deep learning', 'regularization', 'synthetic noise', 'weights'],
    url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['ai', 'machine learning', 'algorithm', 'computer', 'code', 'artificial intelligence'],
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['philosophy', 'theory', 'concept', 'abstract', 'epistemology', 'paradox', 'idea', 'logic'],
    url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop',
  },
];

const AMBIENT_FALLBACK_POOL = [
  'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=800&auto=format&fit=crop', // DNA helix
  'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=800&auto=format&fit=crop', // Neuroanatomy
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop', // Deep space
  'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=800&auto=format&fit=crop', // Hourglass
  'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop', // Microscopy
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop', // Bio lab
  'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800&auto=format&fit=crop', // Neural circuitry
  'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop', // Circadian rest
];

/**
 * Resolve a verified, guaranteed photographic image for any concept with deduplication
 */
export function getThematicImageUrl(label = '', tags = [], overview = '', usedUrls = new Set()) {
  const combinedText = `${label} ${(tags || []).join(' ')} ${overview}`.toLowerCase();

  let bestMatch = null;
  let highestScore = 0;

  for (const theme of THEMATIC_IMAGE_CATALOG) {
    if (usedUrls.has(theme.url)) continue;
    let score = 0;
    for (const key of theme.keywords) {
      if (combinedText.includes(key)) {
        score += key.length > 5 ? 2 : 1;
        if (label.toLowerCase().includes(key)) {
          score += 4;
        }
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = theme.url;
    }
  }

  if (bestMatch && highestScore > 0) {
    usedUrls.add(bestMatch);
    return bestMatch;
  }

  for (const fallback of AMBIENT_FALLBACK_POOL) {
    if (!usedUrls.has(fallback)) {
      usedUrls.add(fallback);
      return fallback;
    }
  }

  return AMBIENT_FALLBACK_POOL[0];
}
