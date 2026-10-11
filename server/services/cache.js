// In-memory LRU-like cache for queries, node expansions, and research results

class SimpleCache {
  constructor(maxItems = 100, ttlMs = 1000 * 60 * 60 * 24) { // 24 hours
    this.maxItems = maxItems;
    this.ttlMs = ttlMs;
    this.store = new Map();
  }

  get(key) {
    const normalizedKey = key.trim().toLowerCase();
    const entry = this.store.get(normalizedKey);
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
      this.store.delete(normalizedKey);
      return null;
    }

    return entry.value;
  }

  set(key, value) {
    const normalizedKey = key.trim().toLowerCase();
    if (this.store.size >= this.maxItems) {
      // Evict oldest item
      const oldestKey = this.store.keys().next().value;
      this.store.delete(oldestKey);
    }

    this.store.set(normalizedKey, {
      value,
      expiry: Date.now() + this.ttlMs,
    });
  }

  has(key) {
    return this.get(key) !== null;
  }

  clear() {
    this.store.clear();
  }
}

export const queryCache = new SimpleCache(50);
export const researchCache = new SimpleCache(100);
export const expansionCache = new SimpleCache(100);
