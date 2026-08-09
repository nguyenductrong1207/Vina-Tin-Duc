import styles from './LoadingPage.module.css';

export function LoadingPage() {
  return (
    <div className={styles.container} role="status" aria-label="Đang tải nội dung">
      <div className={styles.spinner} />
      <span className={styles.text}>Đang tải...</span>
      <span className="sr-only">Đang tải nội dung</span>
    </div>
  );
}
