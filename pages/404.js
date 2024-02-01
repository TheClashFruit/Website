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
  useRef
} from 'react';

export default function Error404() {
  const router = useRouter();

  const footRef   = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    headerRef.current.style.height = `calc(100vh - ${footRef.current.offsetHeight}px)`;

    console.log(`calc(100vh - ${footRef.current.offsetHeight}px)`);

    setTimeout(() => {
      headerRef.current.style.height = `calc(100vh - ${footRef.current.offsetHeight}px)`;

      console.log(`calc(100vh - ${footRef.current.offsetHeight}px)`);
    }, 50);

    addEventListener('resize', (e) => {
      headerRef.current.style.height = `calc(100vh - ${footRef.current.offsetHeight}px)`;

      console.log(`calc(100vh - ${footRef.current.offsetHeight}px)`);
    });
  }, []);

  return (
    <>
      <Meta pageData={{ title: '404', type: 'page' }} />
      <Navbar page={'404'} />

      <header className={styles.container} ref={headerRef}>
        <h1>404</h1>

        <p>Looks like this page doesn&apos;t exist.</p>
      </header>

      <Footer shareData={{ title: '404', text: 'Why\'d you view a 404 page?', url: `https://theclashfruit.me${router.asPath}` }} ref={footRef} />
    </>
  );
}
