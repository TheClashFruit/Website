import Meta from '@/components/Meta';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Database from '@/lib/Database';
import Card from '@/components/Card';
import AdBanner from '@/components/AdBanner';

import styles from '@/styles/Gallery.module.scss';

import {
  useState
} from 'react';
import Dialog from '@/components/Dialog';
import Input from '@/components/Input';
import Button from '@/components/Button';
import {Download, Info} from 'lucide-react';

import Link from 'next/link';
import Image from 'next/image';
import Paginator from '@/components/Paginator';

export default function Gallery({ gallery, page, totalPages }) {
  const [ dialogOpen, setDialogOpen ] = useState(false);
  const [ dialogData, setDialogData ] = useState({ title: 'Default' });

  const download = (url, fileName) => {
    fetch(url)
      .then(res => res.blob())
      .then(res => {
        const href = URL.createObjectURL(res);

        const a = document.createElement('a');

        a.setAttribute('download', fileName);

        a.href = href;

        a.click();

        URL.revokeObjectURL(href);
      });
  };

  return (
    <>
      <Meta pageData={{ title: 'Gallery', type: 'page' }} />

      <Navbar page="gallery" />
      <Header title="Gallery" />

      <main>
        <div className={styles.container}>
          <AdBanner
            data-ad-client="ca-pub-1510964912637528"
            data-ad-slot="3830865920"
          />

          <div className={styles.galleryGrid}>
            {
              gallery.map((image, i) => {
                return (
                  <Card key={i} tabindex={(i + 1)} className={styles.galleryCard} onClick={() => { setDialogData({ title: image.title, data: image }); setDialogOpen(true); }}>
                    <Image src={image.preview} alt={image.title} width={(356 * 3)} height={(538 * 3)} priority={true} />

                    <div className={styles.overlay}>
                      <h3>{image.title}</h3>
                    </div>
                  </Card>
                );
              })
            }
          </div>

          <Paginator page={Number.parseInt(page)} totalPages={Number.parseInt(totalPages)} />
        </div>
      </main>

      <Footer shareData={{
        title: 'Gallery',
        text: 'Check out TheClashFruit\'s projects!',
        url: 'https://theclashfruit.me/gallery'
      }}/>

      { dialogOpen &&
        <Dialog title={dialogData.title} className={styles.galleryDialog} closeAction={() => { setDialogOpen(false); }}>
          <div className={styles.galleryDialogContent}>
            <Image src={dialogData.data.preview} alt={dialogData.title} width={(500)} height={(1000)} unoptimized={true} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3>License</h3>

                <Link href={dialogData.data.license.url} target="_blank">{dialogData.data.license.short_name}</Link>
              </div>

              <div>
                <h3>Downloads</h3>

                <div className={styles.downloads}>
                  {
                    dialogData.data.pictures.map((p, i) => {
                      return (
                        <div key={i}>
                          <p>{p.name}</p>

                          <Button icon={Download} type="primary" onClick={() => {
                            download(p.url, p.name);
                          }}>Download</Button>
                        </div>
                      );
                    })
                  }
                </div>
              </div>

              <div>
                <h3 style={{ marginBottom: '0.5rem' }}>Printed Versions</h3>

                <p>Coming Soon... or never...</p>
              </div>
            </div>
          </div>
        </Dialog>
      }
    </>
  );
}

export async function getServerSideProps({query}) {
  const db = new Database();

  const page = {
    offset: query.page !== undefined ? Math.floor((query.page - 1) * 10) : 0,
    limit: query.page !== undefined ? Math.floor((query.page - 1) * 10) + 10 : 10
  };

  const gallery = await db.getGallery(page.offset, page.limit);
  const totalGallery = await db.getGalleryCount();

  return {
    props: {
      gallery,
      page: query.page !== undefined ? query.page : 1,
      totalPages: Math.ceil(totalGallery / 10)
    },
  };
}