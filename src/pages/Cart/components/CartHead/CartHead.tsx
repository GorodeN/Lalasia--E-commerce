import React from 'react';
import Text from 'components/Text';
import styles from 'pages/Cart/Cart.module.scss';

const CartHead: React.FC = () => (
  <div className={styles.cart__description}>
    <Text view="title" tag="h1" className={styles.cart__title}>
      Cart
    </Text>
    <Text view="p-20" color="secondary" className={styles.cart__subtitle}>
      Review the products you’ve added to your cart and proceed to checkout
    </Text>
  </div>
);

export default React.memo(CartHead);
