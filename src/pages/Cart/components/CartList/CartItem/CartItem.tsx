import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import Button from 'components/Button';
import Text from 'components/Text';
import { useCart } from 'hooks/useCart';
import type { CartItem } from 'store/CartStore'; 
import type { Product } from 'types/Product';
import styles from 'pages/Cart/Cart.module.scss';

type CartItemProps = {
  item: CartItem & { product: Product };
};

const CartItem: React.FC<CartItemProps> = observer(({ item }) => {
  const cart = useCart();

  const handleDecrease = useCallback(() => {
    cart.updateQuantity(item.productId, item.quantity - 1);
  }, [cart, item.productId, item.quantity]);

  const handleIncrease = useCallback(() => {
    cart.updateQuantity(item.productId, item.quantity + 1);
  }, [cart, item.productId, item.quantity]);

  const handleRemove = useCallback(() => {
    cart.removeFromCart(item.productId);
  }, [cart, item.productId]);

  return (
    <div className={styles.cart__item}>
      <img className={styles.cart__image} src={item.product.images?.[0]?.url} alt={item.product.title} />
      <div className={styles.cart__info}>
        <Text view="p-20" weight="medium">
          {item.product.title}
        </Text>
        <Text view="p-16" color="secondary">
          {item.product.description}
        </Text>
        <Text view="p-20" weight="bold">
          ${item.product.price}
        </Text>
      </div>
      <div className={styles.cart__actions}>
        <div className={styles.cart__quantity}>
          <Button onClick={handleDecrease} className={styles['cart__quantity-decrease']}>
            -
          </Button>
          <span>{item.quantity}</span>
          <Button onClick={handleIncrease} className={styles['cart__quantity-increase']}>
            +
          </Button>
        </div>
        <Button color="white" onClick={handleRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
});

export default React.memo(CartItem);
