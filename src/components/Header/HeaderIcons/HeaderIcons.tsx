import { observer } from 'mobx-react-lite';
import { routes } from 'config/routes';
import { useNavigate } from 'react-router-dom';
import BagIcon from 'components/icons/BagIcon';
import UserIcon from 'components/icons/UserIcon';
import { cartStore } from 'store/CartStore';
import { authStore } from 'store/AuthStore';
import styles from 'components/Header/Header.module.scss';

interface HeaderIconsProps {
  closeMenu?: () => void;
}

export const HeaderIcons = observer(({ closeMenu }: HeaderIconsProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = authStore;

  const handleIconClick = (path: string) => {
    navigate(path);
    closeMenu?.();
  };

  return (
    <>
      <div className={styles.cartIcon} onClick={() => handleIconClick(routes.cart.create())}>
        <BagIcon width={30} height={30} />
        {cartStore.totalItems > 0 && <div className={styles.cartBadge}>{cartStore.totalItems}</div>}
      </div>
      <div
        className={styles.profileIcon}
        onClick={() => handleIconClick(isAuthenticated ? routes.profile.create() : routes.auth.create.login())}
      >
        <UserIcon width={30} height={30} />
        {isAuthenticated && <div className={styles.profileBadge} />}
      </div>
    </>
  );
});
