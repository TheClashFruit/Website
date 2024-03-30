import Meta from '@/components/Meta';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import showdown from 'showdown';
import showdownHighlight from 'showdown-highlight';
import footnotes from 'showdown-footnotes';

import 'showdown-youtube';
import '@/lib/MarkdownExtensions';

import Database from '@/lib/Database';

import styles from '@/styles/Home.module.scss';

export default function Project({ projectData }) {
  return (
    <>
      <Meta pageData={{ title: projectData.title, type: 'project', project: projectData }} />

      <Navbar page="project" />
      <Header title={projectData.title} projectData={projectData} />

      <main>
        <article className={styles.container} dangerouslySetInnerHTML={{ __html: projectData.readme }} />
      </main>

      <Footer shareData={{ title: projectData.title, text: projectData.short_readme, url: `https://theclashfruit.me/project/${projectData.permalink}` }} />
    </>
  );
}

export async function getServerSideProps(context) {
  const db = new Database();

  const projectData = await db.getProject(context.params.permalink);

  if(!projectData) {
    return {
      notFound: true
    };
  }

  const converter = new showdown.Converter({
    extensions: [
      showdownHighlight({
        pre: true,
        auto_detection: true
      }),
      'youtube',
      'header-anchors',
      'improved-tables',
      'custom-emoji',
      'timestamp',
      footnotes
    ]
  });

  converter.setFlavor('github');

  projectData.readme = converter.makeHtml(projectData.readme);

  return {
    props: {
      projectData,
    }
  };
}