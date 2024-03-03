import styles from '@/styles/Components.module.scss';

export default function Input({ className, type, label, ...props }) {
  if (type === 'textarea') {
    return (
      <textarea className={className ? `${styles.inputText} ${className}` : styles.inputText} placeholder={label} {...props} />
    );
  }

  if (type === 'select') {
    return (
      <select className={className ? `${styles.inputDropdown} ${className}` : styles.inputDropdown} {...props}>
        {props.children}
      </select>
    );
  }

  return (
    <input className={className ? `${styles.inputText} ${className}` : styles.inputText} type={type} placeholder={label} {...props} />
  );
}