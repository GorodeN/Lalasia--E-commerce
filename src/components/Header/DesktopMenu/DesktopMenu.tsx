import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from 'config/routes';
import Text from 'components/Text';
import styles from 'components/Header/Header.module.scss';

export const DesktopMenu: React.FC = () => (
  <nav className={styles.navDesktop}>
    <div className={styles.navContent}>
      <NavLink to={routes.main.create()}>
        {({ isActive }) => (
          <Text view="p-18" color={isActive ? 'accent' : 'primary'} weight={isActive ? 'bold' : 'normal'}>
            Products
          </Text>
        )}
      </NavLink>
      <NavLink to={routes.categories.create()}>
        {({ isActive }) => (
          <Text view="p-18" color={isActive ? 'accent' : 'primary'} weight={isActive ? 'bold' : 'normal'}>
            Categories
          </Text>
        )}
      </NavLink>
      <NavLink to={routes.about.create()}>
        {({ isActive }) => (
          <Text view="p-18" color={isActive ? 'accent' : 'primary'} weight={isActive ? 'bold' : 'normal'}>
            About us
          </Text>
        )}
      </NavLink>
    </div>
  </nav>
);