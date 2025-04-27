import * as React from 'react';
import classNames from 'classnames';
import styles from './Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'white';
  width?: number | string;
  height?: number | string;
};

const Icon: React.FC<IconProps> = ({
  className,
  color,
  width = 24,
  height = 24,
  children,
  ...props
}) => {
  return (
    <svg
      className={classNames(
        styles.icon,
        className,
        color && styles[`icon-${color}`]
      )}
      width={width}
      height={height}
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
