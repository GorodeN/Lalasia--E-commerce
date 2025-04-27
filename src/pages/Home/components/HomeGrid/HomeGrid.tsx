import React from 'react';
import { observer } from 'mobx-react-lite';
import { action } from 'mobx';
import Card from 'components/Card';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import { routes } from 'config/routes';
import type { Product } from 'types/Product';
import { useCart } from 'hooks/useCart';
import styles from 'pages/Home/Home.module.scss';

interface Props {
  products: Product[];
}

const HomeGrid: React.FC<Props> = observer(({ products }) => {
  const navigate = useNavigate();
  const cart = useCart();

  return (
    <div className={styles.home__grid}>
      {products.map((product) => {
        const documentId = product.documentId;
        const navigateHandler = documentId ? () => navigate(routes.product.create(documentId)) : undefined;

        return (
          <Card
            key={product.id}
            image={product.images?.[0]?.url || ''}
            captionSlot={product.productCategory?.title || ''}
            title={product.title}
            subtitle={product.description}
            contentSlot={
              product.isInStock ? (
                `$${product.price}`
              ) : (
                <>
                  <s>${product.price}</s> Out of stock
                </>
              )
            }
            actionSlot={
              cart.isInCart(product.id) ? (
                <Button color="white" onClick={() => navigate(routes.cart.create())}>
                  Go to Cart
                </Button>
              ) : (
                <Button onClick={action(() => cart.addToCart(product.id, product.title || 'Product'))} disabled={!product.isInStock}>
                  Add to Cart
                </Button>
              )
            }
            onClick={navigateHandler}
            className={product.isInStock ? '' : styles.outOfStock}
          />
        );
      })}
    </div>
  );
});

export default React.memo(HomeGrid);
