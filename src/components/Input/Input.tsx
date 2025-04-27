import React from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value?: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
  /** Для ошибок */
  error?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, onChange, afterSlot, disabled, placeholder, error, type, ...props }, ref) => {
    const getAutoComplete = () => {
      if (props.autoComplete) return props.autoComplete;
      if (type === 'password') return 'new-password';
      if (props.name?.includes('email')) return 'email';
      if (props.name?.includes('username')) return 'username';
      return 'off';
    };

    return (
      <div className={classNames(styles.input, { [styles['input__disabled']]: disabled }, className)}>
        <input
          {...props}
          ref={ref}
          type={type || 'text'}
          disabled={disabled}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={getAutoComplete()}
          className={classNames(styles.input__field, { [styles['input__field--has-after']]: afterSlot })}
        />
        {afterSlot && <div className={styles.input__after}>{afterSlot}</div>}
        {error && <div className={styles.input__error}>{error}</div>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
