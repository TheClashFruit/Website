import styles from '@/styles/Components.module.scss';

import { useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import {Info} from 'lucide-react';
import Card from '@/components/Card';

export default function AdBanner(props) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

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
        }} data-ad-client="ca-pub-1510964912637528"{...props}/>
      </div>

      <Button className={styles.adAboutButton} icon={Info} type="icon"/> </Card>
  );
}