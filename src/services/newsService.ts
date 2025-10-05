import { type NewsParams, type NewsResponse } from "../types/interfaces.ts";

const GNEWS_BASE = "https://gnews.io/api/v4";

export async function getNews(params: NewsParams = {}): Promise<NewsResponse> {
  let url: string;

  const apiKey = import.meta.env.VITE_GNEWS_API_KEY as string;

  if (params.category) {
    url = `${GNEWS_BASE}/top-headlines?category=${params.category.trim().toLowerCase()}&lang=en&max=10&apikey=${apiKey}`;
  } else {
    const query = params.q?.trim().toLowerCase() || "news";
    url = `${GNEWS_BASE}/search?q=${encodeURIComponent(query)}&lang=en&max=10&apikey=${apiKey}`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data: NewsResponse = await res.json();
  return data;
}
