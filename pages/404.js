import Navbar from '@/components/Navbar';
import Meta from '@/components/Meta';

export default function Home() {
  return (
    <>
      <Meta pageData={{ title: '404', type: 'page' }} />
      <Navbar page={'404'} />
    </>
  );
}
