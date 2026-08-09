import { Helmet } from 'react-helmet-async';
import { useManufacturingProcesses } from '@/features/process/hooks/useManufacturingProcesses';
import { LoadingPage } from '@/components/ui/LoadingPage';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';
import { Reveal } from '@/components/motion';
import styles from './ManufacturingProcessPage.module.css';

export default function ManufacturingProcessPage() {
  const { data: processes, isLoading, error } = useManufacturingProcesses();

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorState message="Không thể tải quy trình sản xuất." />;

  return (
    <>
      <Helmet>
        <title>Quy trình sản xuất | VINA TIN DUC</title>
        <meta name="description" content="Quy trình sản xuất nhựa và bao bì tại VINA TIN DUC" />
      </Helmet>

      <section className={styles.pageHeader}>
        <div className="container">
          <Reveal>
            <span className={styles.badge}>Quy trình</span>
            <h1 className={styles.pageTitle}>Quy trình sản xuất</h1>
            <p className={styles.pageDescription}>
              Quy trình sản xuất chuyên nghiệp, kiểm soát chất lượng từng bước, đảm bảo sản phẩm đạt tiêu chuẩn cao nhất.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.timeline}>
        <div className="container">
          {!processes?.length ? (
            <EmptyState message="Chưa có nội dung quy trình. Đang cập nhật." />
          ) : (
            <div className={styles.timelineGrid}>
              <div className={styles.timelineLine} />
              {processes.map((step, index) => (
                <Reveal
                  key={step.id}
                  direction={index % 2 === 0 ? 'left' : 'right'}
                  delay={index * 0.08}
                  className={styles.timelineItem}
                >
                  <div className={styles.stepMarker}>
                    <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    {step.description && (
                      <p className={styles.stepDescription}>{step.description}</p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
