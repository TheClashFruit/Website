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
  const [ adData, setAdData ] = useState();
  const [ ads, setAds ] = useState();

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }

    try {
      fetch(new Request('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js')).catch(_ => googleAdRef.current.setAttribute('data-blocked', 'yes'));
    } catch (e) {
      googleAdRef.current.setAttribute('data-blocked', 'yes');
    }

    document.addEventListener('load', () => {
      if (document.body.clientWidth < 768) {
        googleAdRef.current.style.height = '100px';
        googleAdRef.current.style.width = '400px';
      }
    });
  }, [ googleAdRef ]);

  useEffect(() => {
    fetch('/api/v2/ads/random')
      .then(res => res.json())
      .then(res => {
        setAdData(res);

        fetch('/api/v2/ads/impression', { method: 'POST', body: JSON.stringify({ id: res.id }) });
      });
  }, [ setAdData ]);

  return (
    <>
      <Card className={styles.adBanner}>
        {adData &&
          <div className={styles.adContent} dangerouslySetInnerHTML={{__html: adData.html}}/>
        }

        {!adData &&
          <div className={styles.adContent}>
            <h3>No Ad Loaded.</h3>
          </div>
        }

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

          <p style={{marginBottom: '0.5rem'}}>This is the main method ads are shown. For information about the ad shown click on the &quot;AdChoises&quot; button. Will be phased out once I get enough in-house ads</p>

          <h3 style={{marginBottom: '0.5rem'}}>In House Ads</h3>

          <p style={{marginBottom: '0.5rem'}}>&quot;Fallback&quot; method. These ads are randomly selected from the ad pool and the only tracking for them is when you click one and impressions.</p>

          <p style={{marginBottom: '0.5rem'}}>About the currently shown ad:</p>

          <div style={{marginBottom: '0'}}>
            <b>Advertiser:</b>
            <p style={{marginBottom: '0'}}>{adData.advertiser}</p>
          </div>
        </Dialog>
      }
    </>
  );
}