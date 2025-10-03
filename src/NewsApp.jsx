import { useState, useEffect } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Categories from "./components/Categories";
import NewsCard from "./components/NewsCard";
import Search from "./components/Search"
import ExchangeRates from "./components/ExchangeRates";

const GNEWS_BASE = "https://gnews.io/api/v4";

const getNews = async ({ q, category }, apiKey) => {
  let url;

  if (category) {
    url = `${GNEWS_BASE}/top-headlines?category=${category.toLowerCase()}&lang=en&max=10&apikey=${apiKey}`;
  } else {
    const query = q ? q : "news";
    url = `${GNEWS_BASE}/search?q=${encodeURIComponent(query)}&lang=en&max=10&apikey=${apiKey}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};


// function ExchangeRates() {
//   const [rates, setRates] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const API_KEY = "aa06261284f56e5d9e574313";
//     fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`)
//       .then(res => res.json())
//       .then(data => {
//         setRates(data.conversion_rates);
//         setLoading(false);
//       })
//       .catch(err => console.error(err));
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   // Обрані валюти
//   const selectedCurrencies = ["USD", "EUR", "UAH", "CZK"];

//   return (
//     <div>
//       <h2>Selected Rates:</h2>
//       <div>
//         {selectedCurrencies.map((cur, i) => (
//           <span key={cur}>
//             {cur}: {rates[cur]}
//             {i < selectedCurrencies.length - 1 ? " | " : ""}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

export default function NewsApp() {
  const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeArticle, setActiveArticle] = useState(null);
  const [activeCategory, setActiveCategory] = useState("");

  const fetchNews = async (params) => {
    if (!API_KEY) {
      setError("API key not set");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await getNews(params, API_KEY);
      setArticles(data.articles || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews({ q: "news" });
  }, []);

  const handleReadMore = (article) => {
    setActiveArticle(article);
  };

  const closeModal = () => setActiveArticle(null);
  

  return (
    <div className="site background">
      <div className="site__container">
        <Header />

        <main className="site__main main">
          <div className="main__controls">
            <ExchangeRates/>
            <Search onSearch={(q) => fetchNews({ q })} />
            <Categories
              onSelect={(cat) => {
                setActiveCategory(cat);
                fetchNews({ category: cat });
              }}
              active={activeCategory}
            />
            <div className="main__hint">
              {loading ? "Loading..." : error ? `Error: ${error}` : null}
            </div>
          </div>
          <section className="main__news news-list">
            {loading ? (
              <Loader />
            ) : articles.length === 0 ? (
              <div className="news-list__empty">No results</div>
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
                  <img
                    src={activeArticle.image}
                    alt={activeArticle.title}
                  />
                )}
                <p>{activeArticle.content || activeArticle.description}</p>
                <p>
                  Source:{" "}
                  <a
                    href={activeArticle.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {activeArticle.source.name}
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
            <a href="https://tsn.ua/en" target="_blank" className="footer__col">
              <span className="footer__links__text">TSN</span>
            </a>
            <a
              href="https://www.bbc.com/news"
              target="_blank"
              className="footer__col"
            >
              <span className="footer__links__text">BBC</span>
            </a>
            <a
              href="https://edition.cnn.com/"
              target="_blank"
              className="footer__col"
            >
              <span className="footer__links__text">CNN</span>
            </a>
            <a
              href="https://news.sky.com/world"
              target="_blank"
              className="footer__col"
            >
              <span className="footer__links__text">SKY</span>
            </a>
            <a
              href="https://www.nbcnews.com/world"
              target="_blank"
              className="footer__col"
            >
              <span className="footer__links__text">NBC</span>
            </a>
            <a
              href="https://abcnews.go.com/international"
              target="_blank"
              className="footer__col"
            >
              <span className="footer__links__text">ABC</span>
            </a>
            <a
              href="https://www.foxnews.com/"
              target="_blank"
              className="footer__col"
            >
              <span className="footer__links__text">FOX</span>
            </a>
          </div>
          <div className="footer__copy">
            © {new Date().getFullYear()} Web News
          </div>
        </footer>
      </div>
    </div>
  );
}
