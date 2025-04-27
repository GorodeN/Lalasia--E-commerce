import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ProductDetailStore } from 'store/ProductDetailStore';
import { useLocalStore } from 'hooks/useLocalStore';
import ErrorPlaceholder from 'components/ErrorPlaceholder';
import styles from './Product.module.scss';

import BackIcon from 'components/icons/BackIcon';
import ProductDetails from './components/ProductDetails';
import RelatedProducts from './components/RelatedProducts';
import Text from 'components/Text';

import ProductDetailsSkeleton from './components/ProductDetailsSkeleton';
import CardSkeleton from 'components/Card/CardSkeleton';

const Product: React.FC = observer(() => {
  const productDetailStore = useLocalStore(() => new ProductDetailStore());
  const { id } = useParams<{ id: string }>();

  const { product, loading, loaded, error, statusCode, relatedProducts } = productDetailStore;

  useEffect(() => {
    if (id) {
      productDetailStore.loadProductById(id);
    }
    return () => productDetailStore.destroy();
  }, [id, productDetailStore]);

  if (loading || !loaded) {
    return (
      <div className={styles.product}>
        <BackIcon className={styles.product__back} />
        <ProductDetailsSkeleton />
        <div className={styles.product__related}>
          <Text view="title" weight="bold" className={styles.product__relatedTitle}>
            Related Products
          </Text>
          <div className={styles.product__relatedGrid}>
            {Array.from({ length: 3 }).map((_, index) => (
              <CardSkeleton key={`related-skeleton-${index}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorPlaceholder
        code={statusCode || 500}
        message={error}
        onRetry={() => id && productDetailStore.loadProductById(id)}
      />
    );
  }

  if (!product) {
    return <ErrorPlaceholder code={404} message="Product not found" />;
  }

  return (
    <div className={styles.product}>
      <BackIcon className={styles.product__back} />
      <ProductDetails product={product} />
      <RelatedProducts products={relatedProducts} />
    </div>
  );
});

export default Product;
