import React from 'react';
import { useNavigate } from 'react-router-dom';
import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import classNames from 'classnames';
import styles from './BackIcon.module.scss';

export type BackIconProps = {
  className?: string;
  onClick?: void;
};

const BackIcon: React.FC<BackIconProps> = ({ className, onClick, ...props }) => {
  const navigate = useNavigate();
  return (
    <div className={classNames(styles.backIcon, className)} onClick={onClick || (() => navigate(-1))} {...props}>
      <ArrowRightIcon
        style={{ transform: 'scaleX(-1)' }}
        width={32}
        height={32}
        color="primary"
        className={styles['backIcon-icon']}
      />
      <Text view="p-20" color="primary" weight="medium" className={styles['backIcon-text']}>
        Back
      </Text>
    </div>
  );
};

export default React.memo(BackIcon);
