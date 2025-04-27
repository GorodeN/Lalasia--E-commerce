import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from 'config/routes';
import Logo from 'components/icons/Logo';
import BurgerIcon from 'components/icons/BurgerIcon';
import { HeaderIcons } from './HeaderIcons';
import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';
import styles from './Header.module.scss';
import { useClickOutside } from 'hooks/useClickOutside';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  useClickOutside(menuRef, burgerRef, closeMenu, isMenuOpen);

  const icons = <HeaderIcons closeMenu={closeMenu} />;

  return (
    <header className={styles.header}>
      <Logo onClick={() => navigate(routes.main.create())} />

      <BurgerIcon ref={burgerRef} isOpen={isMenuOpen} onClick={toggleMenu} className={styles.burgerIcon} />

      <DesktopMenu />

      <MobileMenu isOpen={isMenuOpen} closeMenu={closeMenu} menuRef={menuRef} icons={icons} />

      <div className={styles.iconsDesktop}>{icons}</div>
    </header>
  );
};

export default React.memo(Header);
