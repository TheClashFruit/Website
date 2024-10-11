import Link from 'next/link';

import Button from '@/components/Button';
import Dialog from '@/components/Dialog';
import Input from '@/components/Input';

import { Turnstile } from '@marsidev/react-turnstile';

import Logo from '@/public/icons/logo.svg';

import styles from '@/styles/Navbar.module.scss';

import {
  Forward,
  Mails,
  Menu,
  Search,
  X
} from 'lucide-react';

import {
  useEffect,
  useRef,
  useState
} from 'react';

import {useRouter} from 'next/router';

export default function Navbar({ page }) {
  const router = useRouter();

  const navRef         = useRef();
  const navCollapseRef = useRef();

  const [ open, setOpen ] = useState(false);
  const [ dialogOpen, setDialogOpen ] = useState(false);
  const [ searchOpen, setSearchOpen ] = useState(false);

  const [ navCounter, setNavCounter ] = useState(0);
  const [ isEgged, setIsEgged ]       = useState(false);

  const [ turnstileStatus, setTurnstileStatus ] = useState('required'); // 'success' | 'error' | 'expired' | 'required'
  const [ error, setError ] = useState(null);

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

    if (localStorage.getItem('isEgged') === 'true')
      setIsEgged(true);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    if (turnstileStatus !== 'success') {
      setError('Please verify you are not a robot.');

      return;
    }

    const f = await fetch('/api/v2/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: data.get('name'),
        email: data.get('email'),
        message: data.get('msg'),
        turnstile: data.get('cf-turnstile-response')
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const r = await f.json();

    if(r.error) {
      setError(r.message);
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

  const easterEgg = (e) => {
    if(navCounter === 3) {
      if (isEgged) {
        setIsEgged(false);

        localStorage.setItem('isEgged', 'false');
      } else {
        setIsEgged(true);

        localStorage.setItem('isEgged', 'true');
      }

      setNavCounter(0);
    } else {
      setNavCounter(navCounter + 1);
    }
  };

  return (
    <>
      {isEgged &&
        <style global jsx>{`
          @import url('https://cdn.jsdelivr.net/npm/comic-mono@0.0.1/index.css');
          @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');
        
          * {
            font-family: 'Comic Sans MS', 'Comic Sans', 'Comic Neue', cursive !important;
          }
          
          pre, code {
            font-family: 'Comic Mono', monospace !important;
          }
        `}</style>
      }

      <nav className={styles.navBar} ref={navRef}>
        <div className={styles.container}>
          <div className={styles.navLogoContainer}>
            <Logo className={styles.navLogo} width={32} height={32} viewBox="0 0 24 24" onClick={easterEgg} />

            <div>
              <Button icon={Search} type="icon" onClick={() => {
                setSearchOpen(true);
              }} />

              <Button className={styles.navToggle} icon={open ? X : Menu} type="icon" onClick={toggleNav} />
            </div>
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

            <ul className={styles.navButtons}>
              <li>
                <Button icon={Search} type="icon" onClick={() => {
                  setSearchOpen(true);
                }} />
              </li>

              <li>
                <Button icon={Mails} type="primary" onClick={() => {
                  setDialogOpen(true);
                }}>Contact</Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {dialogOpen &&
        <Dialog title="Contact" closeAction={() => { setDialogOpen(false); setError(null); }}>
          <form onSubmit={onSubmit}>
            { error !== null && (
              <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
            )}

            <Input required name="name"  type="text"     label="Name" />
            <Input required name="email" type="email"    label="E-Mail" />
            <Input required name="msg"   type="textarea" label="Message (Markdown Supported!)" />

            <Turnstile 
              siteKey="0x4AAAAAAAxPnbJD3b1-BfkP"
              onError={() => setTurnstileStatus('error')}
              onExpire={() => setTurnstileStatus('expired')}
              onSuccess={() => {
                setTurnstileStatus('success');

                setError(null);
              }} />

            <Button icon={Forward} type="primary">Send</Button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1rem' }}>Or send an email to <Link href="mailto:admin@theclashfruit.me">admin@theclashfruit.me</Link></p>
        </Dialog>
      }

      {searchOpen &&
        <Dialog title="Search" closeAction={() => { setSearchOpen(false); }}>
          <form action="/search" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
            <Input required name="q" type="text" label={router.query.q !== undefined ? router.query.q : 'Search...'} style={{ margin: 0 }} />

            <Input required name="type" type="select" style={{ margin: 0 }}>
              <option value="post">Posts</option>
              <option value="project">Projects</option>
              <option value="all">Both</option>
            </Input>

            <Button icon={Search} type="icon" />
          </form>
        </Dialog>
      }
    </>
  );
}