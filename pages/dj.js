import Meta from '@/components/Meta';
import Navbar from '@/components/Navbar';

export default function Dj() {
  return (
    <>
      <Meta pageData={{ title: 'DJ Construction Worker', type: 'video', url: 'https://cdn-new.theclashfruit.me/data/dj_construction_worker.mp4', allowIndex: false }} />
      <Navbar page="dj" />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '1rem' }}>
        <video controls muted style={{ aspectRatio: '16:9', maxWidth: 'calc(100vw - 32px)' }} src="https://cdn-new.theclashfruit.me/data/dj_construction_worker.mp4"/>
      </div>
    </>
  );
}