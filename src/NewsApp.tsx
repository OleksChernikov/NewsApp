import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./state/hooks.ts";
import {
  fetchNews,
  setActiveCategory,
  setActiveArticle,
  clearActiveArticle,
} from "./state/newsSlice.ts";

import Header from "./components/Header.tsx";
import Loader from "./components/Loader.tsx";
import Categories from "./components/Categories.tsx";
import NewsCard from "./components/NewsCard.tsx";
import Search from "./components/Search.tsx";
import ExchangeRates from "./components/ExchangeRates.tsx";
import Error from "./components/Error.tsx";
import Empty from "./components/Empty.tsx";
import Footer from "./components/Footer.tsx";

export default function NewsApp() {
  const dispatch = useAppDispatch();
  const { articles, loading, error, activeCategory, activeArticle } =
    useAppSelector((s) => s.news);

  useEffect(() => {
    dispatch(fetchNews({ q: "news" }));
  }, [dispatch]);

  return (
    <div className="site background">
      <div className="site__container">
        <Header />

        <main className="site__main main">
          <div className="main__controls">
            <ExchangeRates />
            <Search onSearch={(q) => dispatch(fetchNews({ q }))} />
            <Categories
              onSelect={(cat) => {
                dispatch(setActiveCategory(cat));
                dispatch(fetchNews({ category: cat }));
              }}
              active={activeCategory}
            />
          </div>

          <section className="main__news news-list">
            {loading ? (
              <Loader />
            ) : error ? (
              <Error />
            ) : articles.length === 0 ? (
              <Empty />
            ) : (
              articles.map((a, i) => (
                <div className="news-list__item" key={i}>
                  <NewsCard
                    article={a}
                    onReadMore={() => dispatch(setActiveArticle(a))}
                  />
                </div>
              ))
            )}
          </section>

          {activeArticle && (
            <div className="modal" onClick={() => dispatch(clearActiveArticle())}>
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
                <button onClick={() => dispatch(clearActiveArticle())}>
                  Close
                </button>
              </div>
            </div>
          )}
        </main>
        <Footer/>
      </div>
    </div>
  );
}
