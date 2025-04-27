import React from 'react';
import Skeleton from 'components/Skeleton';
import styles from 'pages/Product/Product.module.scss';

const ProductDetailsSkeleton: React.FC = () => {
  return (
    <div className={styles.product__container}>
      <div className={styles.product__imageWrapper}>
        <Skeleton width="100%" height="400px" />
      </div>
      <div className={styles.product__details}>
        <Skeleton width="70%" height={40} />
        <Skeleton width="100%" height={80} />
        <Skeleton width="30%" height={30} />
        <div className={styles.product__actions}>
          <Skeleton width="100%" height={44} />
          <Skeleton width="100%" height={44} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductDetailsSkeleton);
