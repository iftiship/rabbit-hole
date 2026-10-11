// Tavily Search API service for factual research and source grounding
import { researchCache } from './cache.js';

export async function searchTavily(query) {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    return [];
  }

  const cacheKey = `tavily:${query.trim().toLowerCase()}`;
  const cached = researchCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey.trim(),
        query: query.trim(),
        search_depth: 'basic',
        include_answer: false,
        max_results: 5,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`[Tavily Search API] Status ${response.status}: ${errorText}`);
      return [];
    }

    const data = await response.json();
    const rawResults = data.results || [];

    const formattedSources = rawResults.map(item => {
      let domain = '';
      try {
        domain = new URL(item.url).hostname.replace('www.', '');
      } catch (e) {
        domain = 'source';
      }

      return {
        title: item.title || 'Research Source',
        url: item.url || '#',
        snippet: item.content || '',
        isVerified: true,
        domain,
      };
    });

    researchCache.set(cacheKey, formattedSources);
    return formattedSources;
  } catch (error) {
    console.error('[Tavily Search API] Error during search:', error.message);
    return [];
  }
}
