import styles from '@/styles/Footer.module.scss';

import Link from 'next/link';

import {
  RssIcon,
  MailIcon,
  Share2Icon
} from 'lucide-react';

import Button from '@/components/Button';

import {
  forwardRef
} from 'react';

// eslint-disable-next-line react/display-name
const Footer = forwardRef(({ shareData }, ref) => {
  return (
    <footer className={styles.footer} ref={ref}>
      <div className={styles.container}>
        <div>
          <p>Copyright &copy; {new Date().getFullYear()} TheClashFruit.</p>
          <p>This website is <Link href={'https://git.theclashfruit.me/TheClashFruit/Website'}>open-source</Link>.</p>
        </div>

        <div>
          <ul className={styles.socialIcons}>
            <li>
              <Button onClick={() => { navigator.share(shareData); }} target="_blank" rel="noopener noreferrer me" icon={Share2Icon} type="icon" title="Share"/>
            </li>
            <li>
              <Button href="mailto:admin@theclashfruit.me" target="_blank" rel="noopener noreferrer me" icon={MailIcon} type="icon" title="E-Mail"/>
            </li>
            <li>
              <Button href="/rss.xml" target="_blank" rel="alternate" icon={RssIcon} type="icon" title="RSS"/>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
});

export default Footer;