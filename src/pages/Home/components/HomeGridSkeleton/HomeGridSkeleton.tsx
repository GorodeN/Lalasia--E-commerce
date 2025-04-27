import React from 'react';
import CardSkeleton from 'components/Card/CardSkeleton';
import styles from 'pages/Home/Home.module.scss';

const HomeGridSkeleton: React.FC = () => (
  <div className={styles.home__grid}>
    {Array.from({ length: 9 }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

export default React.memo(HomeGridSkeleton);
