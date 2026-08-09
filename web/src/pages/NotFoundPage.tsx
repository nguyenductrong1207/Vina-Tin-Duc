import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import styles from './StatusPage.module.css';

export function NotFoundPage() {
  return (
    <div className={styles.container}>
      <Helmet>
        <title>404 - Không tìm thấy trang | VINA TIN DUC</title>
      </Helmet>
      <div className={styles.content}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Không tìm thấy trang</h1>
        <p className={styles.message}>
          Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
        <Link to="/" className={styles.button}>
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
