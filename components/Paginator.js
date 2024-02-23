import styles from '@/styles/Components.module.scss';
import Button from '@/components/Button';

import {
  ArrowLeft, ArrowRight
} from 'lucide-react';

export default function Paginator({ page, totalPages }) {
  const totalPagesArray = Array.from({ length: totalPages }, (_, i) => {
    return (
      <Button key={i} href={`/blog?page=${i + 1}`} type={page === i + 1 ? 'primary' : 'text'} title={`Page ${i + 1}`}>{i + 1}</Button>
    );
  });

  const partialPagesArray = Array.from({ length: 8 }, (_, i) => {
    return (
      <Button key={i} href={`/blog?page=${i + 1}`} type={page === i + 1 ? 'primary' : 'text'} title={`Page ${i + 1}`}>{i + 1}</Button>
    );
  });

  const pagesList = () => {
    return (
      <>
        { partialPagesArray }
        <Button type="text" disabled>...</Button>
        <Button href={`/blog?page=${totalPages}`} type={page === totalPages ? 'primary' : 'text'} title={`Page ${totalPages}`}>{totalPages}</Button>
      </>
    );
  };

  return (
    <div className={styles.paginator}>
      <Button href={page <= 1 ? null : `?page=${page - 1}`} icon={ArrowLeft} type="icon" title="Previous" disabled={page <= 1} />

      <div className={styles.pageNumbers}>
        {
          totalPages < 8 ? (
            totalPagesArray
          ) : (
            pagesList()
          )
        }
      </div>

      <Button href={page >= totalPages ? null : `?page=${page + 1}`} icon={ArrowRight} type="icon" title="Next" disabled={page >= totalPages} />
    </div>
  );
}