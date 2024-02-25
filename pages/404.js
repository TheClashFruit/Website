import Navbar from '@/components/Navbar';
import Meta from '@/components/Meta';
import Footer from '@/components/Footer';

import styles from '@/styles/Error.module.scss';

import {
  useRouter
} from 'next/router';

export default function Error404() {
  const router = useRouter();

  return (
    <>
      <Meta pageData={{ title: '404', type: 'page' }} />
      <Navbar page={'404'} />

      <header className={styles.container}>
        <h1>404</h1>

        <p>Looks like this page doesn&apos;t exist.</p>
      </header>

      <Footer shareData={{ title: '404', text: 'Why\'d you view a 404 page?', url: `https://theclashfruit.me${router.asPath}` }}  />
    </>
  );
}
