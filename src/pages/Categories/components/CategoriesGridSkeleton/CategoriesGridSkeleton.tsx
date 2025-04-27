import React from 'react';
import CardSkeleton from 'components/Card/CardSkeleton';
import styles from 'pages/Categories/Categories.module.scss';

const CategoriesGridSkeleton: React.FC = () => (
  <div className={styles.categories__grid}>
    {Array.from({ length: 4 }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

export default React.memo(CategoriesGridSkeleton);
