import Navbar from '@/components/Navbar';
import Meta from '@/components/Meta';
import FooterReffed from '@/components/FooterReffed';

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
    const changeEvent = (e) => {
      headerRef.current.style.height = `calc(100vh - ${footRef.current.offsetHeight}px)`;

      console.log(`calc(100vh - ${footRef.current.offsetHeight}px)`);
    };

    changeEvent();

    setTimeout(() => {
      changeEvent();
    }, 50);

    window.addEventListener('resize', changeEvent);

    router.events.on('routeChangeStart', () => {
      window.removeEventListener('resize', changeEvent);
    });
  }, [ router ]);

  return (
    <>
      <Meta pageData={{ title: '404', type: 'page' }} />
      <Navbar page={'404'} />

      <header className={styles.container} ref={headerRef}>
        <h1>404</h1>

        <p>Looks like this page doesn&apos;t exist.</p>
      </header>

      <FooterReffed shareData={{ title: '404', text: 'Why\'d you view a 404 page?', url: `https://theclashfruit.me${router.asPath}` }} ref={footRef} />
    </>
  );
}
