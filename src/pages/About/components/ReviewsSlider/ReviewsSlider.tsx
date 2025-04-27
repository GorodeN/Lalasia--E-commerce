import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay } from 'swiper/modules';
import Text from 'components/Text';
import styles from 'pages/About/About.module.scss';
import type { Review } from './mockReviews';

interface Props {
  reviews: Review[];
}

const ReviewsSlider: React.FC<Props> = ({ reviews }) => (
  <div className={styles.about__reviews}>
    <Text view="title" tag="h2" className={`${styles['about__reviews-title']}`}>
      What our Clients say
    </Text>
    <Swiper
      spaceBetween={20}
      slidesPerView={2}
      loop
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      {reviews.map((r, i) => (
        <SwiperSlide key={i}>
          <div className={styles.review}>
            {r.avatarUrl && <img src={r.avatarUrl} alt={r.author} className={styles.review__avatar} />}
            <Text view="p-18" className={styles.review__text}>
              “{r.text}”
            </Text>
            <Text view="p-16" weight="bold" className={styles.review__author}>
              — {r.author}
            </Text>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default React.memo(ReviewsSlider);
