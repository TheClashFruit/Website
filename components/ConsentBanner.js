import Button from '@/components/Button';

import { Check, X } from 'lucide-react';
import { push } from '@socialgouv/matomo-next';

import styles from '@/styles/Components.module.scss';

export default function ConsentBanner() {
  const setCookieConsentGiven = (isAccepted) => {
    if (typeof window === 'undefined')
      return;

    localStorage.setItem('tcf_consent', isAccepted ? 'true' : 'false');

    if(isAccepted)
      push(['setCookieConsentGiven']);
    else
      push(['forgetCookieConsentGiven']);

    window.dispatchEvent(new Event('consentChange'));
  };

  return (
    <div className={styles.consentBanner}>
      <div>
        <p>
          This site uses Matomo to analyze traffic and help us to improve your user experience.
        </p>
        <p>
          We process your email address and IP address and cookies are stored on your browser for 13 months. This data is only processed by us.
        </p>
      </div>
      <div className={styles.separatedButtonGroup}>
        <Button icon={X} type="text" onClick={() => { setCookieConsentGiven(false); }}>
          Decline
        </Button>

        <Button icon={Check} type="primary" onClick={() => { setCookieConsentGiven(true); }}>
          Accept
        </Button>
      </div>
    </div>
  );
}