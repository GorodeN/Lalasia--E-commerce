import React, { RefObject } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { routes } from 'config/routes';
import Text from 'components/Text';
import styles from 'components/Header/Header.module.scss';

interface MobileMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
  menuRef: RefObject<HTMLDivElement | null>;
  icons: React.ReactNode;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, closeMenu, menuRef, icons }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.nav
        className={styles.navMobile}
        ref={menuRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        <div className={styles.navContent}>
          <NavLink to={routes.main.create()} onClick={closeMenu}>
            {({ isActive }) => (
              <Text view="p-18" color={isActive ? 'accent' : 'primary'} weight={isActive ? 'bold' : 'normal'}>
                Products
              </Text>
            )}
          </NavLink>
          <NavLink to={routes.categories.create()} onClick={closeMenu}>
            {({ isActive }) => (
              <Text view="p-18" color={isActive ? 'accent' : 'primary'} weight={isActive ? 'bold' : 'normal'}>
                Categories
              </Text>
            )}
          </NavLink>
          <NavLink to={routes.about.create()} onClick={closeMenu}>
            {({ isActive }) => (
              <Text view="p-18" color={isActive ? 'accent' : 'primary'} weight={isActive ? 'bold' : 'normal'}>
                About us
              </Text>
            )}
          </NavLink>
        </div>

        <div className={styles.iconsMobile}>{icons}</div>
      </motion.nav>
    )}
  </AnimatePresence>
);
