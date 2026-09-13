import './ArticleCardSkeleton.css';

// Mirrors ArticleCard's DOM shape (title / divider / two paragraphs / footer)
// so it reuses the real card's shell, divider and footer layout rules —
// no layout shift when the real content swaps in.
export default function ArticleCardSkeleton() {
  return (
    <div className="article-card article-card-skeleton" aria-hidden="true">
      <div className="skeleton-block skeleton-block--title" />

      <hr className="article-card__divider" />

      <div className="article-card__body">
        <div className="skeleton-paragraph">
          <div className="skeleton-line" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
        </div>
        <div className="skeleton-paragraph skeleton-paragraph--second">
          <div className="skeleton-line" />
          <div className="skeleton-line" />
        </div>
      </div>

      <div className="article-card__footer">
        <div className="article-card__footer-actions">
          <div className="skeleton-block skeleton-block--link" />
          <div className="skeleton-block skeleton-block--bookmark" />
        </div>

        <div className="skeleton-block skeleton-block--time" />
      </div>
    </div>
  );
}
