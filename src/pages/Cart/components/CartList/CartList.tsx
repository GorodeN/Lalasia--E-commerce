import React from 'react';
import { observer } from 'mobx-react-lite';
import { useCart } from 'hooks/useCart';
import CartItem from './CartItem';
import styles from 'pages/Cart/Cart.module.scss';

const CartList: React.FC = observer(() => {
  const cart = useCart();
  const items = cart.getMergedCartItems();

  return (
    <div className={styles.cart__list}>
      {
      items.map((item) => (
        <CartItem key={item.productId} item={item} />
      ))}
    </div>
  );
});

export default React.memo(CartList);
