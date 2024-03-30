import Meta from '@/components/Meta';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import styles from '@/styles/Projects.module.scss';
import Database from '@/lib/Database';
import Paginator from '@/components/Paginator';
import AdBanner from '@/components/AdBanner';
import Card from '@/components/Card';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button';
import {Share2} from 'lucide-react';

export default function Projects({ projects, page, totalPages }) {
  return (
    <>
      <Meta pageData={{ title: 'Projects', type: 'page' }} />

      <Navbar page="projects" />
      <Header title="Projects" />

      <main>
        <div className={styles.container}>
          <AdBanner
            data-ad-client="ca-pub-1510964912637528"
            data-ad-slot="3830865920"
          />

          <div className={styles.projectsGrid}>
            {
              projects.map((project, i) => {
                return (
                  <Link key={i} href={`/project/${project.permalink}`} className={styles.projectCardWrapperLink}>
                    <Card className={styles.projectCard}>
                      <div className={styles.header}>
                        <Image src={project.icon} alt={`Icon of "${project.title}".`} width={356} height={216} />

                        <div className={styles.headerOverlay}>
                          <Button onClick={() => { navigator.share({ title: project.title, text: project.short_readme, url: `https://theclashfruit.me/project/${project.permalink}` }); }} icon={Share2} type="icon" />
                        </div>
                      </div>
                      <div className={styles.content}>
                        <div className={styles.title}>
                          <h3>{project.title}</h3>
                        </div>

                        <p>{project.short_readme}</p>
                      </div>
                    </Card>
                  </Link>
                );
              })
            }
          </div>

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