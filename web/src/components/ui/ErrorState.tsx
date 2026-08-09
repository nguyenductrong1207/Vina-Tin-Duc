import styles from './StateMessage.module.css';

interface ErrorStateProps {
  message?: string;
}

export function ErrorState({ message = 'Đã xảy ra lỗi. Vui lòng thử lại sau.' }: ErrorStateProps) {
  return (
    <div className={styles.container} role="alert">
      <p className={styles.message}>{message}</p>
    </div>
  );
}
