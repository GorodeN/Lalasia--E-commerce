import React from 'react';
import { motion } from 'framer-motion';
import styles from './BurgerIcon.module.scss';

interface Props {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const BurgerIcon = React.forwardRef<HTMLDivElement, Props>(
  ({ isOpen, onClick, className }, ref) => {
    const handleClick = (e: React.MouseEvent) => {
      onClick();
      e.stopPropagation();
    };

    return (
      <div 
        ref={ref}
        className={`${styles.burger} ${className || ''}`} 
        onClick={handleClick}
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    );
  }
);

export default BurgerIcon;