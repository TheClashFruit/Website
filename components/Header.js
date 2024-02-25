import styles from '@/styles/Components.module.scss';

export default function Header({ title, ...props }) {
  return (
    <header className={styles.header} {...props}>
      <div className={styles.container}>
        <h1>{title}</h1>
      </div>
    </header>
  );
}