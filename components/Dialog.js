import styles from '@/styles/Components.module.scss';

import Button from '@/components/Button';

import { X } from 'lucide-react';

export default function Dialog({ className, title, closeAction, children, ...props }) {
  return (
    <div className={styles.dialog}>
      <div className={className ? `${styles.card} ${className}` : styles.card} {...props}>
        <div className={styles.dialogHeader}>
          <label>{title}</label>

          <Button icon={X} type="icon" onClick={closeAction} />
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}