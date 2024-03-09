import Meta from '@/components/Meta';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import styles from '@/styles/Projects.module.scss';
import Database from '@/lib/Database';
import Paginator from '@/components/Paginator';
import AdBanner from '@/components/AdBanner';
import Card from '@/components/Card';

export default function Projects({ projects, page, totalPages }) {
  return (
    <>
      <Meta pageData={{ title: 'Projects', type: 'page' }} />

      <Navbar page="projects" />
      <Header title="Projects" />

      <main>
        <div className={styles.container}>
          <p>
            I&apos;ll add the stuff soon don&apos;t worry!!
          </p>

          <Paginator page={Number.parseInt(page)} totalPages={Number.parseInt(totalPages)} />
        </div>
      </main>

      <Footer shareData={{ title: 'Projects', text: 'Check out TheClashFruit\'s projects!', url: 'https://theclashfruit.me/projects' }} />
    </>
  );
}

export async function getServerSideProps({ query }) {
  const db = new Database();

  const page = {
    offset: query.page !== undefined ? Math.floor((query.page - 1) * 10) : 0,
    limit: query.page !== undefined ? Math.floor((query.page - 1) * 10) + 10 : 10
  };

  const projects = await db.getProjects(page.offset, page.limit);
  const totalProjects = await db.getProjectCount();

  return {
    props: {
      projects,
      page: query.page !== undefined ? query.page : 1,
      totalPages: Math.ceil(totalProjects / 10)
    },
  };
}