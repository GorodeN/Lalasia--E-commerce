import React from 'react';
import { observer } from 'mobx-react-lite';
import { authStore } from 'store/AuthStore';
import Text from 'components/Text';
import Button from 'components/Button';
import UserIcon from 'components/icons/UserIcon';
import styles from './Profile.module.scss';

const Profile: React.FC = observer(() => {
  const { user } = authStore;

  if (!user) return null;

  return (
    <div className={styles.profile}>
      <div className={styles.profile__card}>
        <Text view="title" tag="h1" className={styles.profile__title} weight='bold'>
          Welcome
        </Text>
        <div className={styles.profile__content}>
          <UserIcon width={120} height={120} className={styles.profile__icon} />
          <Text view="p-32" tag="h2" color="accent" weight="bold">
            {user.username}
          </Text>
          <Text view="p-20" color="secondary">
            <b>Email:</b> {user.email}
          </Text>
        </div>
        <Button onClick={() => authStore.logout()}>Logout</Button>
      </div>
    </div>
  );
});

export default Profile;
