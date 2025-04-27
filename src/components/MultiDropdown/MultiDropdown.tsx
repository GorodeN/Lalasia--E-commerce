import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Input from 'components/Input';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import styles from './MultiDropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку, которая будет выводится в инпуте. Если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value = [],
  onChange,
  disabled = false,
  getTitle,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOptionClick = (option: Option) => {
    const newValue = value.some((v) => v.key === option.key)
      ? value.filter((v) => v.key !== option.key)
      : [...value, option];
    onChange(newValue);
  };

  const title = getTitle(value);
  const displayValue = isOpen ? searchQuery : value.length > 0 ? title : '';
  const placeholder = isOpen ? title : value.length === 0 ? title : '';

  return (
    <div className={classNames(styles['multi-dropdown'], className)} ref={dropdownRef}>
      <Input
        value={displayValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={setSearchQuery}
        onClick={() => !disabled && setIsOpen(true)}
        onFocus={() => !disabled && setIsOpen(true)}
        afterSlot={
          <ArrowDownIcon color="secondary" onClick={handleArrowClick} />
        }
      />

      {isOpen && !disabled && (
        <ul className={styles['multi-dropdown__options']}>
          {filteredOptions.map((option) => (
            <li
              key={option.key}
              className={classNames(
                styles['multi-dropdown__option'],
                { [styles['multi-dropdown__option--selected']]: value.some((v) => v.key === option.key) }
              )}
              onClick={() => handleOptionClick(option)}
              {...props}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default React.memo(MultiDropdown);
