import { Helmet } from 'react-helmet-async';
import { useAbout } from '@/features/about/hooks/useAbout';
import { LoadingPage } from '@/components/ui/LoadingPage';
import { ErrorState } from '@/components/ui/ErrorState';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  const { data: about, isLoading, error } = useAbout();

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorState message="Không thể tải thông tin công ty." />;

  return (
    <>
      <Helmet>
        <title>{about?.seo?.metaTitle ?? 'Giới thiệu | VINA TIN DUC'}</title>
        <meta
          name="description"
          content={about?.seo?.metaDescription ?? 'Tìm hiểu về VINA TIN DUC COMPANY LIMITED'}
        />
      </Helmet>

      <section className={styles.pageHeader}>
        <div className="container">
          <Reveal>
            <span className={styles.badge}>Giới thiệu</span>
            <h1 className={styles.pageTitle}>{about?.title ?? 'Giới thiệu công ty'}</h1>
            {about?.description && (
              <p className={styles.pageDescription}>{about.description}</p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {about?.content && (
            <Reveal>
              <div
                className={styles.richContent}
                dangerouslySetInnerHTML={{ __html: about.content }}
              />
            </Reveal>
          )}

          {/* Mission / Vision */}
          {(about?.mission || about?.vision) && (
            <Stagger className={styles.valuesGrid}>
              {about.mission && (
                <StaggerItem className={styles.valueCard}>
                  <h3 className={styles.valueLabel}>Sứ mệnh</h3>
                  <p className={styles.valueText}>{about.mission}</p>
                </StaggerItem>
              )}
              {about.vision && (
                <StaggerItem className={styles.valueCard}>
                  <h3 className={styles.valueLabel}>Tầm nhìn</h3>
                  <p className={styles.valueText}>{about.vision}</p>
                </StaggerItem>
              )}
            </Stagger>
          )}

          {/* Values */}
          {about?.values && (
            <Reveal delay={0.2}>
              <div className={styles.milestonesSection}>
                <h2 className={styles.milestonesTitle}>Giá trị cốt lõi</h2>
                <div
                  className={styles.richContent}
                  dangerouslySetInnerHTML={{ __html: about.values }}
                />
              </div>
            </Reveal>
          )}

          {/* Milestones */}
          {about?.milestones && about.milestones.length > 0 && (
            <div className={styles.milestonesSection}>
              <Reveal>
                <h2 className={styles.milestonesTitle}>Cột mốc phát triển</h2>
              </Reveal>
              <Stagger className={styles.milestonesList}>
                {about.milestones.map((milestone, i) => (
                  <StaggerItem key={i} className={styles.milestone}>
                    <span className={styles.milestoneYear}>{milestone.year}</span>
                    <div className={styles.milestoneContent}>
                      <h4 className={styles.milestoneTitle}>{milestone.title}</h4>
                      {milestone.description && (
                        <p className={styles.milestoneDescription}>{milestone.description}</p>
                      )}
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
