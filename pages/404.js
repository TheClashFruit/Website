import Navbar from '@/components/Navbar';
import Meta from '@/components/Meta';
import Footer from '@/components/Footer';
import Card from '@/components/Card';

import styles from '@/styles/Error.module.scss';

import {
  useRouter
} from 'next/router';

import {
  useEffect,
  useState
} from 'react';

export default function Error404() {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Meta pageData={{ title: '404', type: 'page' }} />
      <Navbar page={'404'} />

      <header className={styles.container}>
        <h1>404</h1>

        <p>Looks like this page doesn&apos;t exist.</p>

        <Card>
          <pre>
            {isClient ? JSON.stringify(router, null, '\t') : ''}
          </pre>
        </Card>
      </header>

      <Footer shareData={{title: '404', text: 'Why\'d you visit a non existent page!?', url: `https://theclashfruit.me${router.asPath}` }} />
    </>
  );
}
