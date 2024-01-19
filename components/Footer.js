import styles from '@/styles/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>Copyright &copy; {new Date().getFullYear()} TheClashFruit</p>
      </div>
    </footer>
  );
}