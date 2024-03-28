import styles from '@/styles/Components.module.scss';
import Image from 'next/image';

export default function Header({ title, postData, ...props }) {
  return (
    <header className={styles.header} {...props}>
      {postData ? (
        <div className={`${styles.container} ${styles.blogPostHero}`}>
          <Image src={postData.image_url} width={1100} height={300} alt={postData.author.display_name} />

          <div className={styles.headerOverlay}>
            <h1>{title}</h1>

            <p>{postData.author.display_name}</p>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <h1>{title}</h1>
        </div>
      )}
    </header>
  );
}