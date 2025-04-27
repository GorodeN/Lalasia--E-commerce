import React from 'react';
import styles from '../Card.module.scss';
import Skeleton from 'components/Skeleton';

const CardSkeleton: React.FC = () => {
  return (
    <div className={`${styles.card} ${styles['card--skeleton']}`}>
      <Skeleton className={styles.card__image} height={260} />

      <div className={styles.card__info}>
        <div className={styles.card__body}>
          <Skeleton height={14} width="40%" />
          <Skeleton height={20} width="100%" />
          <Skeleton height={16} width="70%" />
        </div>

        <div className={styles.card__content}>
          <Skeleton className={styles.card__price} width={80} height={24} />
          <Skeleton className={styles.card__action} width={100} height={36} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(CardSkeleton);
