import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';
import { useProducts } from '@/features/products/hooks/useProducts';
import { LoadingPage } from '@/components/ui/LoadingPage';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import styles from './ProductsPage.module.css';

export default function ProductsPage() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorState message="Không thể tải danh sách sản phẩm." />;

  return (
    <>
      <Helmet>
        <title>Sản phẩm | VINA TIN DUC</title>
        <meta name="description" content="Danh sách sản phẩm nhựa và bao bì của VINA TIN DUC" />
      </Helmet>

      <section className={styles.pageHeader}>
        <div className="container">
          <Reveal>
            <span className={styles.badge}>Sản phẩm</span>
            <h1 className={styles.pageTitle}>Sản phẩm</h1>
            <p className={styles.pageDescription}>
              Các sản phẩm nhựa, bao bì và vật liệu chất lượng cao từ VINA TIN DUC.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {!products?.length ? (
            <EmptyState message="Chưa có sản phẩm nào. Nội dung đang được cập nhật." />
          ) : (
            <Stagger className={styles.grid}>
              {products.map((product) => (
                <StaggerItem key={product.id} className={styles.card}>
                  <Link to={`/products/${product.slug}`} className={styles.cardLink}>
                    {product.images[0] && (
                      <div className={styles.cardImageWrapper}>
                        <img
                          src={product.images[0].url}
                          alt={product.images[0].alternativeText ?? product.name}
                          className={styles.cardImage}
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className={styles.cardBody}>
                      {product.featured && (
                        <span className={styles.featuredBadge}>Nổi bật</span>
                      )}
                      <h3 className={styles.cardTitle}>{product.name}</h3>
                      {product.shortDescription && (
                        <p className={styles.cardDescription}>{product.shortDescription}</p>
                      )}
                      {product.materials && (
                        <span className={styles.materialTag}>{product.materials}</span>
                      )}
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
