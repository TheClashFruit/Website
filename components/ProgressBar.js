import styles from '@/styles/Components.module.scss';

export default function ProgressBar({ className, progress, ...props }) {
  return (
    <div className={className ? `${styles.progressBar} ${className}` : styles.progressBar} {...props}>
      <div className={styles.progressBarProgress} style={{ width: `${progress}%` }}></div>
    </div>
  );
}