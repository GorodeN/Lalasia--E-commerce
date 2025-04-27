import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { action } from 'mobx';
import { useNavigate, useLocation } from 'react-router-dom';
import { routes } from 'config/routes';
import Text from 'components/Text';
import Button from 'components/Button';
import type { Product } from 'types/Product';
import { useCart } from 'hooks/useCart';
import { authStore } from 'store/AuthStore';
import { notifyError, notifySuccess } from 'utils/notify';
import { useSwipeable } from 'react-swipeable';
import styles from 'pages/Product/Product.module.scss';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';

interface Props {
  product: Product;
}

const ProductDetails: React.FC<Props> = observer(({ product }) => {
  const navigate = useNavigate();
  const cart = useCart();
  const location = useLocation();

  const images = (product.images || []).slice();
  const [currentIndex, setCurrentIndex] = useState(0);

  const isAuthenticated = authStore.isAuthenticated;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate(routes.auth.create.login(), { state: { from: location.pathname } });
      return;
    }

    const isSuccess = window.confirm('Simulate successful payment? Click "Cancel" to simulate failure.');

    if (isSuccess) {
      notifySuccess('Payment successful! Thank you for your purchase.');
      navigate(routes.main.create());
    } else {
      notifyError('Payment failed. Please try again later.');
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className={styles.product__container}>
      <div className={styles.product__imageWrapper} {...swipeHandlers}>
        {images.length > 0 && (
          <>
            <img
              className={styles.product__image}
              src={images[currentIndex]?.url}
              alt={`Product image ${currentIndex + 1}`}
            />

            {images.length > 1 && (
              <>
                <div className={styles.slider}>
                  <div className={styles.slider__leftButton} onClick={handlePrev}>
                    <ArrowRightIcon style={{ transform: 'scaleX(-1)' }} width={32} height={32} color='white' />
                  </div>
                  <div className={styles.slider__rightButton} onClick={handleNext}>
                    <ArrowRightIcon width={32} height={32} color='white' />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>

      <div className={styles.product__details}>
        <Text view="title" tag="h1" className={styles.product__title}>
          {product.title}
        </Text>
        <Text view="p-20" color="secondary" className={styles.product__description}>
          {product.description}
        </Text>
        <Text view="title" weight="bold" color="primary" className={styles.product__price}>
          {product.isInStock ? (
            `$${product.price}`
          ) : (
            <>
              <s>${product.price}</s> Out of stock
            </>
          )}
        </Text>
        <div className={styles.product__actions}>
          <Button onClick={handleCheckout} disabled={!product.isInStock}>
            Buy Now
          </Button>

          {cart.isInCart(product.id) ? (
            <Button color="white" onClick={() => navigate(routes.cart.create())}>
              Go to Cart
            </Button>
          ) : (
            <Button color="white" onClick={action(() => cart.addToCart(product.id, product.title || 'Product'))} disabled={!product.isInStock}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
});

export default React.memo(ProductDetails);
