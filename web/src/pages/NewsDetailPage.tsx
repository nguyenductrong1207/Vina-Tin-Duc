import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { useArticle } from '@/features/news/hooks/useArticle';
import { LoadingPage } from '@/components/ui/LoadingPage';
import { ErrorState } from '@/components/ui/ErrorState';
import styles from './ContentPage.module.css';

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, error } = useArticle(slug!);

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorState message="Không thể tải bài viết." />;
  if (!article) return <ErrorState message="Bài viết không tồn tại." />;

  return (
    <>
      <Helmet>
        <title>{article.seo?.metaTitle ?? `${article.title} | VINA TIN DUC`}</title>
        <meta
          name="description"
          content={article.seo?.metaDescription ?? article.excerpt ?? ''}
        />
      </Helmet>

      <article className="section">
        <div className="container container--narrow">
          <h1 className={styles.pageTitle}>{article.title}</h1>
          {article.author && (
            <p className={styles.meta}>Tác giả: {article.author}</p>
          )}
          {article.content && (
            <div
              className={styles.richContent}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}
        </div>
      </article>
    </>
  );
}
