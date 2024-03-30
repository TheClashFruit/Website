import '@/styles/globals.scss';

import ConsentBanner from '@/components/ConsentBanner';

import Script from 'next/script';

import { useReportWebVitals } from 'next/web-vitals';

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

  useReportWebVitals((metric) => {
    if (navigator.sendBeacon)
      navigator.sendBeacon('/api/v2/analytics/vitals', JSON.stringify(metric));
    else
      fetch('/api/v2/analytics/vitals', { body: JSON.stringify(metric), method: 'POST', keepalive: true });
  });

  return (
    <>
      { !isDismissed && <ConsentBanner /> }
      
      <Component {...pageProps} />

      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </>
  );
}
