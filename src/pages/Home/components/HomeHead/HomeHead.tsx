import React from 'react';
import Text from 'components/Text';
import styles from 'pages/Home/Home.module.scss';

const HomeHead: React.FC = () => (
  <div className={styles.home__description}>
    <Text view="title" tag="h1" className={styles.home__title}>
      Products
    </Text>
    <Text view="p-20" color="secondary" className={styles.home__subtitle}>
      We display products based on the latest products we have, if you want to see our old products please enter the
      name of the item
    </Text>
  </div>
);

export default React.memo(HomeHead);
