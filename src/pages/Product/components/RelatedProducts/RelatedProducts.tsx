import React from 'react';
import Text from 'components/Text';
import Card from 'components/Card';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { routes } from 'config/routes';
import type { Product } from 'types/Product';
import { useCart } from 'hooks/useCart';
import { observer } from 'mobx-react-lite';
import { action } from 'mobx';
import styles from 'pages/Product/Product.module.scss';

interface Props {
  products: Product[];
}

const RelatedProducts: React.FC<Props> = observer(({ products }) => {
  const navigate = useNavigate();

  const cart = useCart();

  if (products.length === 0) return null;

  return (
    <div className={styles.product__related}>
      <Text view="title" weight="bold" className={styles.product__relatedTitle}>
        Related Products
      </Text>
      <div className={styles.product__relatedGrid}>
        {products.map((item) => {
          const documentId = item.documentId;
          const navigateHandler = documentId ? () => navigate(routes.product.create(documentId)) : undefined;

          return (
            <Card
              key={item.id}
              image={item.images?.[0]?.url || ''}
              captionSlot={item.productCategory?.title || ''}
              title={item.title}
              subtitle={item.description}
              contentSlot={`$${item.price}`}
              actionSlot={
                cart.isInCart(item.id) ? (
                  <Button color="white" onClick={() => navigate(routes.cart.create())}>
                    Go to Cart
                  </Button>
                ) : (
                  <Button onClick={action(() => cart.addToCart(item.id, item.title || 'Product'))} disabled={!item.isInStock}>
                    Add to Cart
                  </Button>
                )
              }
              onClick={navigateHandler}
            />
          );
        })}
      </div>
    </div>
  );
});

export default React.memo(RelatedProducts);
