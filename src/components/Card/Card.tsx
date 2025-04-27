import React from 'react';
import styles from './Card.module.scss';
import Button from 'components/Button';
import Text from 'components/Text';
import classNames from 'classnames';

export type CardProps = {
  className?: string;
  image: string | undefined;
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot = <Button>Add to Cart</Button>,
}) => {
  return (
    <div className={classNames(styles.card, className)} onClick={onClick}>
      <img src={image} alt={`${title}`} className={styles.card__image} />
      <div className={styles.card__info}>
        <div className={styles.card__body}>
          {captionSlot && <p className={styles.card__caption}>{captionSlot}</p>}
          <Text
            className={styles.card__title}
            view="p-20"
            tag="p"
            weight="medium"
            color="primary"
            maxLines={2}
          >
            {title}
          </Text>
          <Text
            className={styles.card__subtitle}
            view="p-16"
            tag="p"
            weight="normal"
            color="secondary"
            maxLines={3}
          >
            {subtitle}
          </Text>
        </div>
        <div className={styles.card__content}>
          <p className={styles.card__price}>{contentSlot}</p>
          {actionSlot && <div className={styles.card__action} onClick={(e) => e.stopPropagation()}>{actionSlot}</div>}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);
