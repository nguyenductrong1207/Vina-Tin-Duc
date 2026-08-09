import { useRouteError, isRouteErrorResponse, Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import styles from './StatusPage.module.css';

export function ErrorPage() {
  const error = useRouteError();

  let title = 'Lỗi';
  let message = 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.';

  if (isRouteErrorResponse(error)) {
    title = `Lỗi ${error.status}`;
    message = error.statusText || message;
  }

  return (
    <div className={styles.container}>
      <Helmet>
        <title>{title} | VINA TIN DUC</title>
      </Helmet>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.message}>{message}</p>
        <Link to="/" className={styles.button}>
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
