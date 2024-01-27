import Meta from '@/components/Meta';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import styles from '@/styles/Projects.module.scss';

export default function Projects() {
  return (
    <>
      <Meta pageData={{ title: 'Projects', type: 'page' }} />
      <Navbar page="projects" />

      <header>
        <div className={styles.container}>
          <h1>Projects</h1>
        </div>
      </header>

      <main>
        <div className={styles.container}>
          a
        </div>
      </main>

      <Footer shareData={{ title: 'Projects', text: 'Check out TheClashFruit\'s projects!', url: 'https://theclashfruit.me/projects' }} />
    </>
  );
}