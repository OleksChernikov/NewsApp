export interface Article {
  title: string;
  description?: string;
  content?: string;
  image?: string;
  url?: string;
  source?: { name: string };
}

export interface FetchParams {
  q?: string;
  category?: string;
}

export interface ExchangeRatesData {
  [currency: string]: number;
}

export interface NewsParams {
  category?: string;
  q?: string;
}

export interface NewsItem {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

export interface NewsResponse {
  totalArticles: number;
  articles: NewsItem[];
}

export interface Props {
  article: Article;
  onReadMore: () => void;
}

export interface CategoriesProps {
  onSelect: (category: string) => void;
  active: string;
}

export interface SearchProps {
  onSearch: (query: string) => void;
}
