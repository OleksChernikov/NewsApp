export default function Footer() {
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
      <div className="footer__copy">
        © {new Date().getFullYear()} Web News
      </div>
    </footer>
  );
}
