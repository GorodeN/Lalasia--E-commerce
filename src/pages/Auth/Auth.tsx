import React from 'react';
import { observer } from 'mobx-react-lite';
import { authStore } from 'store/AuthStore';
import { routes } from 'config/routes';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Text from 'components/Text';
import styles from './Auth.module.scss';
import bannerImg from 'assets/login-banner.jpg';

const Auth: React.FC = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === routes.auth.create.login();

  const handleToggle = () => {
    const newPath = isLogin ? routes.auth.create.register() : routes.auth.create.login();
    navigate(newPath);
  };

  if (authStore.isAuthenticated) {
    const redirectPath = location.state?.from || routes.profile.create();
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return (
    <div className={styles.auth}>
      <div className={styles.auth__wrapper}>
        <div className={styles.auth__banner}>
          <img src={bannerImg} alt="auth-banner" className={styles.auth__bannerImg} />
        </div>
        <div className={styles.auth__content}>
          <Text view="title" tag="h1" className={styles.auth__title}>
            {isLogin ? 'Login' : 'Register'}
          </Text>

          <div className={styles.auth__form}>{isLogin ? <LoginForm /> : <RegisterForm />}</div>

          <Text className={styles.auth__switch} color="secondary">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <Text onClick={handleToggle} className={styles.auth__switchLink} color="accent" tag="span">
                  Register
                </Text>{' '}
                now!
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Text onClick={handleToggle} className={styles.auth__switchLink} color="accent" tag="span">
                  Login
                </Text>{' '}
                now!
              </>
            )}
          </Text>
        </div>
      </div>
    </div>
  );
});

export default Auth;
