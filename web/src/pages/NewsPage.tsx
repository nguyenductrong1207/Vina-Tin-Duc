import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';
import { useArticles } from '@/features/news/hooks/useArticles';
import { LoadingPage } from '@/components/ui/LoadingPage';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import styles from './NewsPage.module.css';

export default function NewsPage() {
  const { data: articles, isLoading, error } = useArticles();

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorState message="Không thể tải tin tức." />;

  return (
    <>
      <Helmet>
        <title>Tin tức | VINA TIN DUC</title>
        <meta name="description" content="Tin tức và bài viết mới nhất từ VINA TIN DUC" />
      </Helmet>

      <section className={styles.pageHeader}>
        <div className="container">
          <Reveal>
            <span className={styles.badge}>Tin tức</span>
            <h1 className={styles.pageTitle}>Tin tức & Bài viết</h1>
            <p className={styles.pageDescription}>
              Cập nhật mới nhất về công ty và xu hướng ngành nhựa.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {!articles?.length ? (
            <EmptyState message="Chưa có bài viết nào. Nội dung đang được cập nhật." />
          ) : (
            <Stagger className={styles.grid}>
              {articles.map((article) => (
                <StaggerItem key={article.id} className={styles.card}>
                  <Link to={`/news/${article.slug}`} className={styles.cardLink}>
                    {article.coverImage && (
                      <div className={styles.cardImageWrapper}>
                        <img
                          src={article.coverImage.url}
                          alt={article.coverImage.alternativeText ?? article.title}
                          className={styles.cardImage}
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className={styles.cardBody}>
                      {article.featured && (
                        <span className={styles.featuredBadge}>Nổi bật</span>
                      )}
                      <h3 className={styles.cardTitle}>{article.title}</h3>
                      {article.excerpt && (
                        <p className={styles.cardExcerpt}>{article.excerpt}</p>
                      )}
                      <span className={styles.cardMeta}>
                        {article.author && <span>{article.author}</span>}
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>
    </>
  );
}
