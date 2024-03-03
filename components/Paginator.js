import styles from '@/styles/Components.module.scss';
import Button from '@/components/Button';

import {
  ArrowLeft, ArrowRight
} from 'lucide-react';

import {useRouter} from 'next/router';

export default function Paginator({ page, totalPages }) {
  const router = useRouter();

  const query = router.query;

  const totalPagesArray = Array.from({ length: totalPages }, (_, i) => {
    let tmpQuery = JSON.parse(JSON.stringify(query));

    tmpQuery.page = i + 1;

    console.log(tmpQuery, query, page, totalPages);

    return (
      <Button key={i} href={{ query: tmpQuery }} type={page === i + 1 ? 'primary' : 'text'} title={`Page ${i + 1}`}>{i + 1}</Button>
    );
  });

  const partialPagesArray = Array.from({ length: 8 }, (_, i) => {
    let tmpQuery = JSON.parse(JSON.stringify(query));

    tmpQuery.page = i + 1;

    return (
      <Button key={i} href={{ query: tmpQuery }} type={page === i + 1 ? 'primary' : 'text'} title={`Page ${i + 1}`}>{i + 1}</Button>
    );
  });

  const pagesList = () => {
    let pagesListTmpQuery = JSON.parse(JSON.stringify(query));

    pagesListTmpQuery.page = totalPages;

    return (
      <>
        { partialPagesArray }
        <Button type="text" disabled>...</Button>
        <Button href={{ query: pagesListTmpQuery }} type={page === totalPages ? 'primary' : 'text'} title={`Page ${totalPages}`}>{totalPages}</Button>
      </>
    );
  };

  let tmpQueryBack    = JSON.parse(JSON.stringify(query));
  let tmpQueryForward = JSON.parse(JSON.stringify(query));

  tmpQueryBack.page    = (page - 1).toString();
  tmpQueryForward.page = (page + 1).toString();

  return (
    <div className={styles.paginator}>
      <Button href={page <= 1 ? null : { query: tmpQueryBack }} icon={ArrowLeft} type="icon" title="Previous" disabled={page <= 1} />

      <div className={styles.pageNumbers}>
        {
          totalPages < 8 ? (
            totalPagesArray
          ) : (
            pagesList()
          )
        }
      </div>

      <Button href={page >= totalPages ? null : { query: tmpQueryForward }} icon={ArrowRight} type="icon" title="Next" disabled={page >= totalPages} />
    </div>
  );
}