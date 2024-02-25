import styles from '@/styles/Components.module.scss';

export default function Input({ className, type, label, ...props }) {
  if (type === 'textarea') {
    return (
      <textarea className={className ? `${styles.inputText} ${className}` : styles.inputText} placeholder={label} {...props} />
    );
  }

  return (
    <input className={className ? `${styles.inputText} ${className}` : styles.inputText} type={type} placeholder={label} {...props} />
  );
}