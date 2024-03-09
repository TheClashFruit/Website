import styles from '@/styles/Components.module.scss';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import {Info} from 'lucide-react';
import Card from '@/components/Card';

export default function AdBanner(props) {
  const googleAdRef = useRef(null);

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

  return (
    <Card className={styles.adBanner}>
      <div className={styles.adContent}>
        <h3>Place your ad here!</h3>

        <p style={{marginBottom: 0}}>
          Contact me at <Link href="mailto:admin@theclashfruit.me">admin@theclashfruit.me</Link>.
        </p>
      </div>

      <div className={styles.adGoogle}>
        <ins className="adsbygoogle" style={{
          display: 'inline-block',
          overflow: 'hidden',
          width: '728px',
          height: '90px'
        }} data-ad-client="ca-pub-1510964912637528" ref={googleAdRef} {...props}/>
      </div>

      <Button className={styles.adAboutButton} icon={Info} type="icon"/> </Card>
  );
}