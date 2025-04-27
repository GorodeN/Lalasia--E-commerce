import React from 'react';
import Text from 'components/Text';
import styles from 'pages/About/About.module.scss';

const AboutHead: React.FC = () => (
  <div className={styles.about__description}>
    <Text view="title" tag="h1" className={`${styles['about__description-title']}`}>
      About us
    </Text>
    <Text view="p-20" color="secondary">
      At our company, we believe in delivering the finest e‑commerce solutions.
    </Text>
    <Text view="p-20" color="secondary">
      Our mission is to connect people with the products they love—quickly, safely, and affordably.
    </Text>
    <Text view="p-20" color="secondary">
      Founded in 2025, today we serve thousands of satisfied customers worldwide.
    </Text>
  </div>
);

export default React.memo(AboutHead);
