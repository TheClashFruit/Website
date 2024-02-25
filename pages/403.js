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
      <Meta pageData={{ title: '403', type: 'page' }} />
      <Navbar page={'403'} />

      <header className={styles.container}>
        <h1>403</h1>

        <p>You don&apos;t have access to this resource.</p>
      </header>

      <Footer shareData={{ title: '403', text: 'Why\'d you view a 403 page?', url: `https://theclashfruit.me${router.asPath}` }}  />
    </>
  );
}
