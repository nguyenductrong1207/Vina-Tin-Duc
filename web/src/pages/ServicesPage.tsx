import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';
import { useServices } from '@/features/services/hooks/useServices';
import { LoadingPage } from '@/components/ui/LoadingPage';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import styles from './ServicesPage.module.css';

export default function ServicesPage() {
  const { data: services, isLoading, error } = useServices();

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorState message="Không thể tải danh sách dịch vụ." />;

  return (
    <>
      <Helmet>
        <title>Dịch vụ | VINA TIN DUC</title>
        <meta name="description" content="Dịch vụ sản xuất, gia công và tái chế của VINA TIN DUC" />
      </Helmet>

      <section className={styles.pageHeader}>
        <div className="container">
          <Reveal>
            <span className={styles.badge}>Dịch vụ</span>
            <h1 className={styles.pageTitle}>Dịch vụ & Năng lực</h1>
            <p className={styles.pageDescription}>
              Giải pháp toàn diện từ sản xuất nhựa, bao bì, gia công khuôn mẫu đến tái chế phế liệu.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {!services?.length ? (
            <EmptyState message="Chưa có dịch vụ nào. Nội dung đang được cập nhật." />
          ) : (
            <Stagger className={styles.grid}>
              {services.map((service, index) => (
                <StaggerItem key={service.id} className={styles.card}>
                  <Link to={`/services/${service.slug}`} className={styles.cardLink}>
                    <div className={styles.cardHeader}>
                      <span className={styles.cardNumber}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {service.featured && (
                        <span className={styles.featuredBadge}>Nổi bật</span>
                      )}
                    </div>
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                    {service.description && (
                      <p className={styles.cardDescription}>{service.description}</p>
                    )}
                    <span className={styles.cardArrow}>
                      Xem chi tiết
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" />
                      </svg>
                    </span>
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
