import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { useProduct } from '@/features/products/hooks/useProduct';
import { LoadingPage } from '@/components/ui/LoadingPage';
import { ErrorState } from '@/components/ui/ErrorState';
import styles from './ContentPage.module.css';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, error } = useProduct(slug!);

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorState message="Không thể tải thông tin sản phẩm." />;
  if (!product) return <ErrorState message="Sản phẩm không tồn tại." />;

  return (
    <>
      <Helmet>
        <title>{product.seo?.metaTitle ?? `${product.name} | VINA TIN DUC`}</title>
        <meta
          name="description"
          content={product.seo?.metaDescription ?? product.shortDescription ?? ''}
        />
      </Helmet>

      <section className="section">
        <div className="container container--narrow">
          <h1 className={styles.pageTitle}>{product.name}</h1>
          {product.shortDescription && (
            <p className={styles.pageDescription}>{product.shortDescription}</p>
          )}
          {product.description && (
            <div
              className={styles.richContent}
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}
        </div>
      </section>
    </>
  );
}
