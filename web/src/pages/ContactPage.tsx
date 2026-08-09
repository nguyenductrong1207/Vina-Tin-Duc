import { Helmet } from 'react-helmet-async';
import { useContact } from '@/features/contact/hooks/useContact';
import { LoadingPage } from '@/components/ui/LoadingPage';
import { ErrorState } from '@/components/ui/ErrorState';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  const { data: contact, isLoading, error } = useContact();

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorState message="Không thể tải thông tin liên hệ." />;

  return (
    <>
      <Helmet>
        <title>{contact?.seo?.metaTitle ?? 'Liên hệ | VINA TIN DUC'}</title>
        <meta
          name="description"
          content={contact?.seo?.metaDescription ?? 'Liên hệ với VINA TIN DUC COMPANY LIMITED'}
        />
      </Helmet>

      <section className={styles.pageHeader}>
        <div className="container">
          <Reveal>
            <span className={styles.badge}>Liên hệ</span>
            <h1 className={styles.pageTitle}>{contact?.title ?? 'Liên hệ'}</h1>
            {contact?.description && (
              <p className={styles.pageDescription}>{contact.description}</p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {contact?.contactInfo && (
            <Stagger className={styles.grid}>
              {contact.contactInfo.address && (
                <StaggerItem className={styles.card}>
                  <div className={styles.cardIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  </div>
                  <h3 className={styles.cardTitle}>Địa chỉ</h3>
                  <p className={styles.cardContent}>{contact.contactInfo.address}</p>
                </StaggerItem>
              )}
              {contact.contactInfo.phone && (
                <StaggerItem className={styles.card}>
                  <div className={styles.cardIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <h3 className={styles.cardTitle}>Điện thoại</h3>
                  <p className={styles.cardContent}>
                    <a href={`tel:${contact.contactInfo.phone}`} className={styles.contactLink}>
                      {contact.contactInfo.phone}
                    </a>
                  </p>
                </StaggerItem>
              )}
              {contact.contactInfo.email && (
                <StaggerItem className={styles.card}>
                  <div className={styles.cardIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <h3 className={styles.cardTitle}>Email</h3>
                  <p className={styles.cardContent}>
                    <a href={`mailto:${contact.contactInfo.email}`} className={styles.contactLink}>
                      {contact.contactInfo.email}
                    </a>
                  </p>
                </StaggerItem>
              )}
              {contact.contactInfo.workingHours && (
                <StaggerItem className={styles.card}>
                  <div className={styles.cardIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12,6 12,12 16,14" />
                    </svg>
                  </div>
                  <h3 className={styles.cardTitle}>Giờ làm việc</h3>
                  <p className={styles.cardContent}>{contact.contactInfo.workingHours}</p>
                </StaggerItem>
              )}
            </Stagger>
          )}
        </div>
      </section>
    </>
  );
}
