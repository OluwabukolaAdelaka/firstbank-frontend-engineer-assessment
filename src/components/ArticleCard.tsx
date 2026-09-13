import type { Article } from '../types/article';
import { timeAgo } from '../utils/timeAgo';
import { truncateToLastSentence } from '../utils/text';
import starIcon from '../assets/icons/star.svg';
import './ArticleCard.css';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const description = (article.description ?? '').trim();
  const content = (article.content ?? '').replace(/\s*\[\+\d+ chars\]$/, '').trim();

  //SHow the description first, then the content as the second paragraph.
  //If the content is missing or the same as the description, reuse the description.
  const firstParagraph = truncateToLastSentence(description || content || 'No description available.');
  const secondParagraph = content && content !== description ? content : firstParagraph;

  return (
    <article className="article-card">
      <h3 className="article-card__title">{article.title}</h3>

      <hr className="article-card__divider" />

      <div className="article-card__body">
        <p className="article-card__paragraph article-card__paragraph--first">{firstParagraph}</p>
        <p className="article-card__paragraph article-card__paragraph--second">{secondParagraph}</p>
      </div>

      <div className="article-card__footer">
        <div className="article-card__footer-actions">
          <a
            className="article-card__link"
            href={article.url}
            target="_blank"
            rel="noreferrer"
          >
            Read full story
          </a>

          <span className="article-card__bookmark">
            <img src={starIcon} alt="" className="article-card__star" />
            <span className="article-card__bookmark-label">Add to bookmarks</span>
          </span>
        </div>

        <span className="article-card__time">{timeAgo(article.publishedAt)}</span>
      </div>
    </article>
  );
}
