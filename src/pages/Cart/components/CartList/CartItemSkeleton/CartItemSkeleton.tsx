import React from 'react';
import Skeleton from 'components/Skeleton';
import styles from 'pages/Cart/Cart.module.scss';

const CartItemSkeleton: React.FC = () => {
  return (
    <div className={styles.cart__item}>
      <Skeleton width="120px" height="120px" />
      <div className={styles.cart__info}>
        <Skeleton width="50%" height={20} />
        <Skeleton width="100%" height={10} />
        <Skeleton width="80%" height={10} />
        <Skeleton width="60%" height={10} />
        <Skeleton width="5%" height={30} />
      </div>
      <div className={styles.cart__actions}>
        <div className={styles.cart__quantity}>
          <Skeleton width="40px" height="40px" />
          <Skeleton width="20px" height="40px" />
          <Skeleton width="40px" height="40px" />
        </div>
        <Skeleton width="100%" height={50} />
      </div>
    </div>
  );
};

export default React.memo(CartItemSkeleton);
