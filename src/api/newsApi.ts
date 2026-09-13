import type { TopHeadlinesResponse } from '../types/article';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL ?? 'https://newsapi.org/v2';


export interface FetchArticlesParams {
  country?: string;
  page?: number;
  pageSize?: number;
}

export async function fetchArticles({
  country = 'us',
  page = 1,
  pageSize = 6,
}: FetchArticlesParams = {}): Promise<TopHeadlinesResponse> {
  const url = new URL(`${BASE_URL}/top-headlines`);
  url.searchParams.set('country', country);
  url.searchParams.set('page', String(page));
  url.searchParams.set('pageSize', String(pageSize));
  url.searchParams.set('apiKey', API_KEY);

  const response = await fetch(url.toString());

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? `Request failed with status ${response.status}`);
  }

  return response.json();
}
