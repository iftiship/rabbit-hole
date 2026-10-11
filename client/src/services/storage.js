// LocalStorage service for Saved Maps, Bookmarked Concepts, and History

const STORAGE_KEYS = {
  SAVED_MAPS: 'rabbithole_saved_maps_v1',
  BOOKMARKS: 'rabbithole_bookmarks_v1',
  RECENTS: 'rabbithole_recents_v1',
};

// Default initial recents from the UI mockup
const INITIAL_RECENTS = [
  { id: 'why-do-humans-dream', query: 'Why do humans dream?' },
  { id: 'the-nature-of-consciousness', query: 'The nature of consciousness' },
  { id: 'black-holes-and-time', query: 'Black holes and time' },
  { id: 'the-psychology-of-memories', query: 'The psychology of memories' },
  { id: 'are-we-alone-in-the-universe', query: 'Are we alone in the universe?' },
];

/**
 * Get all saved maps
 */
export function getSavedMaps() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_MAPS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read saved maps from localStorage:', err);
    return [];
  }
}

/**
 * Save an exploration map
 */
export function saveMap(graph) {
  if (!graph || !graph.id) return false;
  try {
    const existing = getSavedMaps();
    const mapEntry = {
      id: graph.id,
      title: graph.title || graph.query,
      query: graph.query,
      summary: graph.summary || '',
      stats: graph.stats || { conceptsCount: graph.concepts?.length || 0, connectionsCount: graph.edges?.length || 0 },
      savedAt: new Date().toISOString(),
      graphData: graph,
    };

    const index = existing.findIndex(m => m.id === graph.id);
    if (index >= 0) {
      existing[index] = mapEntry;
    } else {
      existing.unshift(mapEntry);
    }

    localStorage.setItem(STORAGE_KEYS.SAVED_MAPS, JSON.stringify(existing));
    return true;
  } catch (err) {
    console.error('Failed to save map:', err);
    return false;
  }
}

/**
 * Delete a saved map
 */
export function deleteMap(id) {
  try {
    const existing = getSavedMaps();
    const filtered = existing.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.SAVED_MAPS, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('Failed to delete map:', err);
    return false;
  }
}

/**
 * Rename a saved map
 */
export function renameMap(id, newTitle) {
  try {
    const existing = getSavedMaps();
    const target = existing.find(m => m.id === id);
    if (target) {
      target.title = newTitle;
      if (target.graphData) {
        target.graphData.title = newTitle;
      }
      localStorage.setItem(STORAGE_KEYS.SAVED_MAPS, JSON.stringify(existing));
      return true;
    }
    return false;
  } catch (err) {
    console.error('Failed to rename map:', err);
    return false;
  }
}

/**
 * Check if a map is saved
 */
export function isMapSaved(id) {
  const existing = getSavedMaps();
  return existing.some(m => m.id === id);
}

/**
 * Bookmarks: Get all bookmarked concepts
 */
export function getBookmarkedConcepts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read bookmarks:', err);
    return [];
  }
}

/**
 * Toggle bookmark for a concept
 */
export function toggleConceptBookmark(concept, mapContext) {
  if (!concept || !concept.id) return false;
  try {
    const existing = getBookmarkedConcepts();
    const index = existing.findIndex(b => b.conceptId === concept.id);

    if (index >= 0) {
      existing.splice(index, 1);
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(existing));
      return false; // Removed
    } else {
      const newBookmark = {
        conceptId: concept.id,
        label: concept.label,
        type: concept.type,
        tagline: concept.tagline,
        mapId: mapContext?.id || '',
        mapTitle: mapContext?.title || '',
        savedAt: new Date().toISOString(),
        conceptData: concept,
      };
      existing.unshift(newBookmark);
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(existing));
      return true; // Added
    }
  } catch (err) {
    console.error('Failed to toggle bookmark:', err);
    return false;
  }
}

/**
 * Check if concept is bookmarked
 */
export function isConceptBookmarked(conceptId) {
  const existing = getBookmarkedConcepts();
  return existing.some(b => b.conceptId === conceptId);
}

/**
 * History / Recent Explorations
 */
export function getRecentExplorations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.RECENTS, JSON.stringify(INITIAL_RECENTS));
      return INITIAL_RECENTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    return INITIAL_RECENTS;
  }
}

export function addRecentExploration(query, id) {
  try {
    const existing = getRecentExplorations();
    const filtered = existing.filter(r => r.query.toLowerCase() !== query.toLowerCase());
    filtered.unshift({ id: id || query.toLowerCase().replace(/[^a-z0-9]+/g, '-'), query });
    const trimmed = filtered.slice(0, 10);
    localStorage.setItem(STORAGE_KEYS.RECENTS, JSON.stringify(trimmed));
    return trimmed;
  } catch (err) {
    return [];
  }
}
