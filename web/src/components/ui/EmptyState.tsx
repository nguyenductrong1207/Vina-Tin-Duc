import styles from './StateMessage.module.css';

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = 'Không có nội dung.' }: EmptyStateProps) {
  return (
    <div className={styles.container}>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
