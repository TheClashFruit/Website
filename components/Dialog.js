import styles from '@/styles/Components.module.scss';

import Button from '@/components/Button';

import { X } from 'lucide-react';

export default function Dialog({ className, title, closeAction, children, ...props }) {
  const onEscape = (e) => {
    if (e.key === 'Escape') {
      closeAction();

      removeListener();
    }
  };

  document.addEventListener('keydown', onEscape);

  const removeListener = () => {
    document.removeEventListener('keydown', onEscape);
  };

  return (
    <div className={styles.dialog} onClick={() => { closeAction(); removeListener(); }}>
      <div className={className ? `${styles.card} ${className}` : styles.card} tabindex="-1" onClick={(e) => { e.stopPropagation(); }} {...props}>
        <div className={styles.dialogHeader}>
          <label>{title}</label>

          <Button icon={X} type="icon" onClick={() => { closeAction(); removeListener(); }} />
        </div>
        <div className={styles.dialogContent}>
          {children}
        </div>
      </div>
    </div>
  );
}