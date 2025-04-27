import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { routes } from 'config/routes';
import { observer } from 'mobx-react-lite';
import Button from 'components/Button';
import Text from 'components/Text';
import { useCart } from 'hooks/useCart';
import { authStore } from 'store/AuthStore';
import { notifyError, notifySuccess } from 'utils/notify';
import styles from 'pages/Cart/Cart.module.scss';

const CartSummary: React.FC = observer(() => {
  const navigate = useNavigate();
  const cart = useCart();
  const location = useLocation();

  const items = cart.getMergedCartItems();
  const total = items.reduce((acc, item) => acc + (item.product.price || 0) * item.quantity, 0);

  const isAuthenticated = authStore.isAuthenticated;


  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate(routes.auth.create.login(), { state: { from: location.pathname } });
      return;
    }

    if (items.length === 0) return;

    const isSuccess = window.confirm('Simulate successful payment? Click "Cancel" to simulate failure.');

    if (isSuccess) {
      notifySuccess('Payment successful! Thank you for your purchase.');
      cart.clearCart();
      navigate(routes.main.create());
    } else {
      notifyError('Payment failed. Please try again later.');
    }
  };

  return (
    <div className={styles.cart__summary}>
      <Text view="p-20" weight="bold">
        Total: ${total.toFixed(2)}
      </Text>
      <div className={styles['cart__summary-buttons']}>
        <Button onClick={handleCheckout} disabled={total <= 0}>
          Proceed to Checkout
        </Button>
        <Button color="white" onClick={() => cart.clearCart()} disabled={total <= 0}>
          Remove All
        </Button>
      </div>
    </div>
  );
});

export default React.memo(CartSummary);
