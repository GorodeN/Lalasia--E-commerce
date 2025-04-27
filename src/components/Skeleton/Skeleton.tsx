import React from 'react';
import classNames from 'classnames';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height, circle = false, className }) => {
  const style = {
    width,
    height,
    borderRadius: circle ? '50%' : undefined,
  };

  return <div className={classNames(styles.skeleton, className)} style={style} />;
};

export default React.memo(Skeleton);
