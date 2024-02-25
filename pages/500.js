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
      <Meta pageData={{ title: '500', type: 'page' }} />
      <Navbar page={'500'} />

      <header className={styles.container}>
        <h1>500</h1>

        <p>There was a problem with the server.</p>
      </header>

      <Footer shareData={{ title: '500', text: 'Why\'d you view a 500 page?', url: `https://theclashfruit.me${router.asPath}` }}  />
    </>
  );
}
