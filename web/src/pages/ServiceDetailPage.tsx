import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { useService } from '@/features/services/hooks/useService';
import { LoadingPage } from '@/components/ui/LoadingPage';
import { ErrorState } from '@/components/ui/ErrorState';
import styles from './ContentPage.module.css';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: service, isLoading, error } = useService(slug!);

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorState message="Không thể tải thông tin dịch vụ." />;
  if (!service) return <ErrorState message="Dịch vụ không tồn tại." />;

  return (
    <>
      <Helmet>
        <title>{service.seo?.metaTitle ?? `${service.title} | VINA TIN DUC`}</title>
        <meta
          name="description"
          content={service.seo?.metaDescription ?? service.description ?? ''}
        />
      </Helmet>

      <section className="section">
        <div className="container container--narrow">
          <h1 className={styles.pageTitle}>{service.title}</h1>
          {service.description && (
            <p className={styles.pageDescription}>{service.description}</p>
          )}
          {service.content && (
            <div
              className={styles.richContent}
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          )}
        </div>
      </section>
    </>
  );
}
