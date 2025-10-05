import { useState, useEffect } from "react";
import Header from "./components/Header.tsx";
import Loader from "./components/Loader.tsx";
import Categories from "./components/Categories.tsx";
import NewsCard from "./components/NewsCard.tsx";
import Search from "./components/Search.tsx";
import ExchangeRates from "./components/ExchangeRates.tsx";
import Error from "./components/Error.tsx";
import Empty from "./components/Empty.tsx";
import { getNews } from "./services/newsService.ts";
import { type Article, type FetchParams } from "./types/interfaces.ts";

export default function NewsApp() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("");

  const fetchNews = async (params: FetchParams) => {
    setLoading(true);
    setError("");

    try {
      const data = await getNews(params);
      setArticles(data.articles || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews({ q: "news" });
  }, []);

  const handleReadMore = (article: Article) => setActiveArticle(article);
  const closeModal = () => setActiveArticle(null);

  const footerLinks: string[] = [
    "tsn.ua/en",
    "bbc.com/news",
    "edition.cnn.com",
    "news.sky.com/world",
    "nbcnews.com/world",
    "abcnews.go.com/international",
    "foxnews.com",
  ];

  return (
    <div className="site background">
      <div className="site__container">
        <Header />

        <main className="site__main main">
          <div className="main__controls">
            <ExchangeRates />
            <Search onSearch={(q) => fetchNews({ q })} />
            <Categories
              onSelect={(cat) => {
                setActiveCategory(cat);
                fetchNews({ category: cat });
              }}
              active={activeCategory}
            />
          </div>

          <section className="main__news news-list">
            {loading ? (
              <Loader />
            ) : articles.length === 0 ? (
              <Empty/>
            ) : error ? (
              <Error/>
            ) : (
              articles.map((a, i) => (
                <div className="news-list__item" key={i}>
                  <NewsCard article={a} onReadMore={() => handleReadMore(a)} />
                </div>
              ))
            )}
          </section>

          {activeArticle && (
            <div className="modal" onClick={closeModal}>
              <div
                className="modal__content"
                onClick={(e) => e.stopPropagation()}
              >
                <h2>{activeArticle.title}</h2>
                {activeArticle.image && (
                  <img src={activeArticle.image} alt={activeArticle.title} />
                )}
                <p>{activeArticle.content || activeArticle.description}</p>
                <p>
                  Source:{" "}
                  <a
                    href={activeArticle.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {activeArticle.source?.name}
                  </a>
                </p>
                <button onClick={closeModal}>Close</button>
              </div>
            </div>
          )}
        </main>

        <footer className="site__footer footer">
          <h6 className="site__footer__title">Partner Links</h6>
          <div className="footer__links">
            {footerLinks.map((url) => {
              const text = url.split(".")[0]?.toUpperCase() || "LINK";
              return (
                <a
                  key={url}
                  href={`https://${url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="footer__col"
                >
                  <span className="footer__links__text">{text}</span>
                </a>
              );
            })}
          </div>
          <div className="footer__copy">© {new Date().getFullYear()} Web News</div>
        </footer>
      </div>
    </div>
  );
}
