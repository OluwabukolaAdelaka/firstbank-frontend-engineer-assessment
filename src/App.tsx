import { useEffect, useState } from 'react';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';
import ArticleCardSkeleton from './components/ArticleCardSkeleton';
import Pagination from './components/Pagination';
import { fetchArticles } from './api/newsApi';
import type { Article } from './types/article';
import './App.css';

const PAGE_SIZE = 6;

//in case some articles don't have a description or content to show, skip them.
function hasReadableText(article: Article): boolean {
  const description = (article.description ?? '').trim();
  const content = (article.content ?? '').replace(/\s*\[\+\d+ chars\]$/, '').trim();
  return description.length > 0 || content.length > 0;
}

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadArticles() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchArticles({ country: 'us', page, pageSize: PAGE_SIZE });
        if (cancelled) return;
        setArticles(data.articles.filter(hasReadableText));
        setTotalResults(data.totalResults);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to load articles.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadArticles();

    return () => {
      cancelled = true;
    };
  }, [page]);

  const MAX_PAGES = 6;
  const totalPages = Math.min(MAX_PAGES, Math.max(1, Math.ceil(Math.min(totalResults, 100) / PAGE_SIZE)));

  function handlePageChange(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages) return;
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="page">
      <Header />

      <main className="page__content">
        <h1 className="page__heading">Latest news</h1>
        <hr className="page__divider" />

        {error && <p className="page__error">Couldn't load the news feed: {error}</p>}

        {loading ? (
          <>
            <p className="visually-hidden" role="status">
              Loading articles...
            </p>
            <div className="article-grid">
              {Array.from({ length: PAGE_SIZE }, (_, index) => (
                <ArticleCardSkeleton key={index} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="article-grid">
              {articles.map((article) => (
                <ArticleCard key={article.url} article={article} />
              ))}
            </div>

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
