import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={`mb-4 max-w-5xl lg:mx-auto max-lg:px-4 lg:px-0`}>
      <p>Copyright &copy; { new Date().getFullYear() } <Link href="/" className={`underline`}>TheClashFruit</Link></p>
    </footer>
  )
}