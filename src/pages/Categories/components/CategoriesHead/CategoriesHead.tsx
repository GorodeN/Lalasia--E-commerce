import React from 'react';
import Text from 'components/Text';
import styles from 'pages/Categories/Categories.module.scss';

const CategoriesHead: React.FC = () => (
  <div className={styles.categories__description}>
    <Text view="title" tag="h1" className={styles.categories__title}>
      Categories
    </Text>
    <Text view="p-20" color="secondary" className={styles.categories__subtitle}>
      Select the category you are interested in and click to view related products
    </Text>
  </div>
);

export default React.memo(CategoriesHead);
