import React from 'react';
import classNames from 'classnames';
import CheckIcon from 'components/icons/CheckIcon';
import styles from './CheckBox.module.scss';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  className,
  disabled = false,
  checked,
  onChange,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(event.target.checked);
    }
  };

  return (
    <label
      className={classNames(
        styles['check-box'],
        className,
        { [styles['check-box--disabled']]: disabled }
      )}
    >
      <input
        type="checkbox"
        className={styles['check-box__input']}
        disabled={disabled}
        checked={checked}
        onChange={handleChange}
        {...props}
      />
      <span className={styles['check-box__icon-wrapper']}>
        {checked && (
          <CheckIcon
            className={styles['check-box__icon']}
            color={disabled ? 'secondary' : 'accent'}
            width={40}
            height={40}
          />
        )}
      </span>
    </label>
  );
};

export default CheckBox;
