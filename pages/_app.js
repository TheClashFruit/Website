import '@/styles/globals.scss'
import { useEffect } from 'react';
import init from '@socialgouv/matomo-next';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    init({
      url: 'https://matomo.theclashfruit.me',
      siteId: 1
    });
  }, []);

  return <Component {...pageProps} />
}
