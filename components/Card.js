import styles from '@/styles/Components.module.scss';

export default function Card({ className, children, ...props }) {
  return (
    <div className={className ? `${styles.card} ${className}` : styles.card} {...props}>
      { children }
    </div>
  );
}