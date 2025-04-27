import * as React from 'react';
import classNames from 'classnames';
import styles from './Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-32' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
  /** Стили */
  style?: React.CSSProperties;
  /** Клик на текст */
  onClick?: React.MouseEventHandler;
};

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag: Tag = 'p',
  weight,
  children,
  color,
  maxLines,
  style = {},
  onClick,
  ...props
}) => {
  const combinedStyle: React.CSSProperties = { ...style };

  if (weight) {
    const fontWeightMap = {
      normal: 400,
      medium: 500,
      bold: 700,
    };
    combinedStyle.fontWeight = fontWeightMap[weight];
  }

  if (maxLines) {
    combinedStyle.display = '-webkit-box';
    combinedStyle.WebkitBoxOrient = 'vertical';
    combinedStyle.WebkitLineClamp = maxLines;
    combinedStyle.overflow = 'hidden';
  }

  return (
    <Tag
      className={classNames(
        styles.text,
        view && styles[`text-view-${view}`],
        color && styles[`text-color-${color}`],
        className,
      )}
      style={Object.keys(combinedStyle).length ? combinedStyle : undefined}
      onClick={onClick}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Text;
