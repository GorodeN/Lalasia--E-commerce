import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon, { IconProps } from '../Icon';

interface SortIconProps extends IconProps {
  sortOrder?: 'asc' | 'desc' | null;
}

const pathVariants = {
  hidden: { opacity: 0, y: -4 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 4 },
};

const SortIcon: React.FC<SortIconProps> = ({ sortOrder, ...props }) => {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <AnimatePresence mode="wait">
        {sortOrder === 'asc' || sortOrder === 'desc' ? (
          <>
            <motion.path
              key="top"
              d="M3 7H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
            />
            <motion.path
              key="bottom"
              d="M10 17H14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
            />
            <motion.path
              key="center"
              d="M6 12H18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
            />
          </>
        ) : (
          <>
            <motion.path
              key="middle"
              d="M12 6V18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
            />
            <motion.path
              key="center"
              d="M6 12H18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
            />
          </>
        )}
      </AnimatePresence>
    </Icon>
  );
};

export default SortIcon;
