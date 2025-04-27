import React from 'react';
import Text from 'components/Text';
import styles from 'pages/About/About.module.scss';

const MapSection: React.FC = () => (
  <div className={styles.about__map}>
    <Text view="title" tag="h2" className={styles.about__mapTitle}>Our Location</Text>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2243.942453947151!2d37.6974544771829!3d55.776871290136704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a9bc03dbb2b%3A0xa3812b799c1dad51!2sKTS%20Studio!5e0!3m2!1sen!2sby!4v1745023421949!5m2!1sen!2sby"
      width="100%"
      height="400"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
);

export default React.memo(MapSection);
