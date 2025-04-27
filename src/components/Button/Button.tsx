import React from 'react';
import classNames from 'classnames';
import Loader from 'components/Loader';
import Text from 'components/Text';
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  /** Цвет кнопки */
  color?: 'white' | 'transparent';
};

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  className,
  color,
  ...props
}) => {
  const defaultClassName = {
    [styles.button]: true,
    [styles.button_disabled]: props.disabled,
    [styles.button_loading]: loading,
    ...(color ? { [styles[`button-${color}`]]: true } : {}),
    ...(typeof className === 'string' ? { [className]: true } : className),
  };

  return (
    <button
      className={classNames(defaultClassName)}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading && <Loader view='button' size="s" />}
      <Text children={children} tag="span" view="button" />
    </button>
  );
};

export default Button;
