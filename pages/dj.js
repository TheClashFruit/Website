import Meta from '@/components/Meta';
import Navbar from '@/components/Navbar';

export default function Dj() {
  return (
    <>
      <Meta pageData={{ title: 'DJ Construction Worker', type: 'video', video: { embed: 'https://theclashfruit.me/dj', url: 'https://cdn-new.theclashfruit.me/data/dj_construction_worker.mp4', thumbnail: [ 'https://cdn-new.theclashfruit.me/sharex/2024/03/firefox_zIgn1mWaOY.png' ], description: 'construction dubstep!!1!', date: new Date(4512672000000), duration: 'PT0M26S', size: { h: 720, w: 1280 } }, allowIndex: false }} />
      <Navbar page="dj" />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '1rem' }}>
        <video controls muted style={{ aspectRatio: '16:9', maxWidth: 'calc(100vw - 32px)' }} src="https://cdn-new.theclashfruit.me/data/dj_construction_worker.mp4"/>
      </div>
    </>
  );
}