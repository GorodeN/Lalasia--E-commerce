import React from 'react';
import AboutHead from './components/AboutHead';
import ReviewsSlider from './components/ReviewsSlider';
import { reviews } from './components/ReviewsSlider/mockReviews';
import MapSection from './components/MapSection';
import ContactInfo from './components/ContactInfo';
import styles from './About.module.scss';

const About: React.FC = () => (
  <div className={styles.about}>
    <div className={styles.about__head}>
      <AboutHead />
    </div>
    <ReviewsSlider reviews={reviews} />
    <MapSection />
    <ContactInfo />
  </div>
);

export default React.memo(About);
