import styles from '@/styles/Components.module.scss';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import {Info} from 'lucide-react';
import Card from '@/components/Card';
import Dialog from '@/components/Dialog';

export default function AdBanner(props) {
  const googleAdRef = useRef(null);

  const [ dialogOpen, setDialogOpen ] = useState(false);

  const [ adBlocked, setAdBlocked ] = useState(false);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }

    try {
      fetch(new Request('/api/v2/ads/check')).catch(_ => googleAdRef.current.setAttribute('data-blocked', 'yes'));
    } catch (e) {
      googleAdRef.current.setAttribute('data-blocked', 'yes');

      setAdBlocked(true);
    }

    document.addEventListener('load', () => {
      if (document.body.clientWidth < 768) {
        googleAdRef.current.style.height = '100px';
        googleAdRef.current.style.width = '400px';
      }
    });
  }, [ googleAdRef ]);

  return (
    <>
      <Card className={styles.adBanner}>
        <div className={styles.adContent}>
          <h3>Support Me</h3>

          <p style={{marginBottom: 0}}>If you like my work you can support me on <Link href="https://ko-fi.com/TheClashFruit" target="_blank">Ko-Fi</Link> or on <Link href="https://github.com/sponsors/TheClashFruit/" target="_blank">GitHub Sponsors</Link>.</p>
        </div>

        <div className={styles.adGoogle}>
          <ins className="adsbygoogle" style={{
            display: 'inline-block',
            overflow: 'hidden',
            width: '728px',
            height: '90px'
          }} data-ad-client="ca-pub-1510964912637528" ref={googleAdRef} {...props}/>
        </div>

        <Button className={styles.adAboutButton} icon={Info} type="icon" onClick={() => { setDialogOpen(true); }} />
      </Card>

      {dialogOpen &&
        <Dialog title="About Ads" closeAction={() => { setDialogOpen(false); }}>
          <h3 style={{marginBottom: '0.5rem'}}>Google AdSense</h3>

          <p style={{marginBottom: '0.5rem'}}>This is the main method ads are shown. For information about the ad shown click on the &quot;AdChoises&quot; button. Will be phased out once I get enough in-house ads.</p>

          <h3 style={{marginBottom: '0.5rem'}}>In-house Ads</h3>

          <p>Coming Soon!</p>
        </Dialog>
      }
    </>
  );
}