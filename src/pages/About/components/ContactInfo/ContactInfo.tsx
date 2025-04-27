import React from 'react';
import { FaFacebookF, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import Text from 'components/Text';
import styles from 'pages/About/About.module.scss';

const ContactInfo: React.FC = () => (
  <div className={styles.about__contacts}>
    <Text view="title" tag="h2" className={`${styles['about__contacts-title']}`}>
      Get in Touch
    </Text>
    <div className={`${styles['about__contacts-list']}`}>
      <a href="mailto:info@example.com" className={styles.contact}>
        <FaEnvelope />
        <Text view="p-20">info@example.com</Text>
      </a>
      <a href="tel:+1234567890" className={styles.contact}>
        <FaPhone />
        <Text view="p-20">+1 (234) 567‑890</Text>
      </a>
      <a href="https://facebook.com/" target="_blank" rel="noreferrer" className={styles.contact}>
        <FaFacebookF />
        <Text view="p-20">Facebook</Text>
      </a>
      <a href="https://instagram.com/" target="_blank" rel="noreferrer" className={styles.contact}>
        <FaInstagram />
        <Text view="p-20">Instagram</Text>
      </a>
    </div>
  </div>
);

export default React.memo(ContactInfo);
