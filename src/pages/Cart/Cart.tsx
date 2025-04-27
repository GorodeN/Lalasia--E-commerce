import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useCart } from 'hooks/useCart';
import BackIcon from 'components/icons/BackIcon';
import CartHead from './components/CartHead';
import CartList from './components/CartList';
import CartItemSkeleton from './components/CartList/CartItemSkeleton';
import CartSummary from './components/CartSummary';
import Text from 'components/Text';
import styles from './Cart.module.scss';
import ErrorPlaceholder from 'components/ErrorPlaceholder';

const Cart: React.FC = observer(() => {
  const cart = useCart();

  useEffect(() => {
    cart.loadCartProducts();
  }, [cart]);

  if (cart.error) {
    return <ErrorPlaceholder code={500} message={cart.error} onRetry={cart.loadCartProducts} />;
  }

  const showContent = !cart.loading && cart.items.length > 0;

  return (
    <div className={styles.cart}>
      <div className={styles.cart__head}>
        <BackIcon className={styles.cart__back} />
        <CartHead />
      </div>

      {cart.loading ? (
        <CartItemSkeleton />
      ) : showContent ? (
        <CartList />
      ) : (
        <Text view="title" tag="h2" color="secondary">
          Cart is empty
        </Text>
      )}

      {showContent && <CartSummary />}
    </div>
  );
});

export default Cart;
