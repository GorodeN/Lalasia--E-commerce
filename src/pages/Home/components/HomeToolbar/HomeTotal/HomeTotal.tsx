import React from 'react';
import Text from 'components/Text';
import styles from 'pages/Home/Home.module.scss';

interface Props {
  count: number;
}

const HomeTotal: React.FC<Props> = ({ count }) => (
  <div className={styles.home__total}>
    <Text view="p-32" weight="bold">
      Total products
    </Text>
    <Text className={styles['home__total-count']} view="p-20" weight="bold" color="accent">
      {count}
    </Text>
  </div>
);

export default React.memo(HomeTotal);
