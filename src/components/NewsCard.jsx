export default function NewsCard({ article, onReadMore }) {
  return (
    <article className="news-card">
      {article.image && (
        <img
          className="news-card__image"
          src={article.image}
          alt={article.title}
        />
      )}
      <div className="news-card__body">
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__desc">{article.description}</p>
        <button className="news-card__link" onClick={onReadMore}>
          Read more
        </button>
      </div>
    </article>
  );
}