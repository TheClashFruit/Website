import styles from '@/styles/Components.module.scss';

import Link from 'next/link';

export default function Button({ className, icon: Icon, type, href, children, ...props }) {
  if (href) {
    return (
      <Link href={href} className={className ? `${styles.button} ${className}` : styles.button} data-type={type} {...props}>
        { Icon && <Icon /> }
        { type !== 'icon' && children }
      </Link>
    );
  }

  return (
    <button className={className ? `${styles.button} ${className}` : styles.button} data-type={type} {...props}>
      { Icon && <Icon /> }
      { type !== 'icon' && children }
    </button>
  );
}