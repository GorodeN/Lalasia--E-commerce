import React, { useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';
import { categoryStore } from 'store/CategoryStore';
import ErrorPlaceholder from 'components/ErrorPlaceholder';
import Pagination from 'components/Pagination';
import CategoriesHead from './components/CategoriesHead';
import CategoriesGrid from './components/CategoriesGrid';
import CategoriesGridSkeleton from './components/CategoriesGridSkeleton';
import styles from './Categories.module.scss';

const Categories: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;
    categoryStore.setCurrentPage(page);
    categoryStore.loadCategoriesWithImages({ page });
  }, [searchParams]);

  const handlePageChange = useCallback(
    (page: number) => {
      categoryStore.setCurrentPage(page);
      const params = new URLSearchParams();
      if (page !== 1) params.set('page', page.toString());
      setSearchParams(params);
    },
    [setSearchParams],
  );

  if (categoryStore.error) {
    return <ErrorPlaceholder message={categoryStore.error} />;
  }

  return (
    <div className={styles.categories}>
      <div className={styles.categories__head}>
        <CategoriesHead />
      </div>
      {categoryStore.loading ? <CategoriesGridSkeleton /> : <CategoriesGrid categories={categoryStore.categories} />}
      <Pagination
        currentPage={categoryStore.currentPage}
        totalPages={categoryStore.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
});

export default Categories;
