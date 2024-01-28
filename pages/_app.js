import '@/styles/globals.scss';

import ConsentBanner from '@/components/ConsentBanner';
import { init, push } from '@socialgouv/matomo-next';

import {useEffect, useState} from 'react';

export default function App({ Component, pageProps }) {
  const [ isDismissed, setIsDismissed ] = useState(true);

  useEffect(() => {
    setIsDismissed(localStorage.getItem('tcf_consent') !== null);

    window.addEventListener('consentChange', () => {
      setIsDismissed(localStorage.getItem('tcf_consent') !== null);
    });

    init({
      url: 'https://matomo.theclashfruit.me',
      siteId: 1
    });

    const isAccepted = localStorage.getItem('tcf_consent') === 'true';

    if(isAccepted)
      push(['setCookieConsentGiven']);
    else
      push(['requireCookieConsent']);
  }, [ setIsDismissed ]);

  return (
    <>
      { !isDismissed && <ConsentBanner /> }
      <Component {...pageProps} />
    </>
  );
}
