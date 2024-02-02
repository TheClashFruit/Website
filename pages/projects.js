import Meta from '@/components/Meta';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import styles from '@/styles/Projects.module.scss';

export default function Projects() {
  return (
    <>
      <Meta pageData={{ title: 'Projects', type: 'page' }} />

      <Navbar page="projects" />
      <Header title="Projects" />

      <main>
        <div className={styles.container}>
          a
        </div>
      </main>

      <Footer shareData={{ title: 'Projects', text: 'Check out TheClashFruit\'s projects!', url: 'https://theclashfruit.me/projects' }} />
    </>
  );
}