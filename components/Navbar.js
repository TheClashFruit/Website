import Link from 'next/link';

import Button from '@/components/Button';
import Dialog from '@/components/Dialog';
import Input from '@/components/Input';

import Logo from '@/public/icons/logo.svg';

import styles from '@/styles/Navbar.module.scss';

import {
  Forward,
  Mails,
  Menu,
  X
} from 'lucide-react';

import {
  useEffect,
  useRef,
  useState
} from 'react';

export default function Navbar({ page }) {
  const navRef         = useRef();
  const navCollapseRef = useRef();

  const [ open, setOpen ] = useState(false);
  const [ dialogOpen, setDialogOpen ] = useState(false);

  useEffect(() => {
    if(window.scrollY <= 30 && navRef.current !== null)
      navRef.current.classList.remove(styles.navBarScrolled);
    else if(navRef.current !== null)
      navRef.current.classList.add(styles.navBarScrolled);

    document.addEventListener('scroll', e => {
      if(window.scrollY <= 1 && navRef.current !== null)
        navRef.current.classList.remove(styles.navBarScrolled);
      else if(navRef.current !== null)
        navRef.current.classList.add(styles.navBarScrolled);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const f = await fetch('/api/v2/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: data.get('name'),
        email: data.get('email'),
        message: data.get('msg')
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const r = await f.json();

    if(r.error) {
      alert(r.message);
    }

    setDialogOpen(false);
  };

  const toggleNav = (e) => {
    navRef.current.classList.toggle(styles.open);

    if(navCollapseRef.current.classList.contains(styles.open)) {
      navCollapseRef.current.classList.remove(styles.open);

      setOpen(false);
    } else {
      navCollapseRef.current.classList.add(styles.open);

      setOpen(true);
    }
  };

  return (
    <>
      <nav className={styles.navBar} ref={navRef}>
        <div className={styles.container}>
          <div className={styles.navLogoContainer}>
            <Logo className={styles.navLogo} width={32} height={32} viewBox="0 0 24 24" />

            <Button className={styles.navToggle} icon={open ? X : Menu} type="icon" onClick={toggleNav} />
          </div>

          <div className={styles.navCollapse} ref={navCollapseRef}>
            <ul className={styles.navLinks}>
              <li>
                <Link href={page === 'home' ? '#' : '/'} className={page === 'home' ? `${styles.active}` : ''}>Home</Link>
              </li>
              <li>
                <Link href={page === 'projects' ? '#' : '/projects'} className={page === 'projects' ? styles.active : ''}>Projects</Link>
              </li>
              <li>
                <Link href={page === 'gallery' ? '#' : '/gallery'} className={page === 'gallery' ? styles.active : ''}>Gallery</Link>
              </li>
              <li>
                <Link href={page === 'blog' ? '#' : '/blog'} className={page === 'blog' ? styles.active : ''}>Blog</Link>
              </li>
            </ul>

            <ul>
              <li>
                <Button icon={Mails} type="primary" onClick={() => { setDialogOpen(true); }}>Contact</Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      { dialogOpen &&
        <Dialog title="Contact" closeAction={() => { setDialogOpen(false); }}>
          <form onSubmit={onSubmit}>
            <Input required name="name"  type="text"     label="Name" />
            <Input required name="email" type="email"    label="E-Mail" />
            <Input required name="msg"   type="textarea" label="Message (Markdown Supported!)" />

            <Button icon={Forward} type="primary">Send</Button>
          </form>
        </Dialog>
      }
    </>
  );
}