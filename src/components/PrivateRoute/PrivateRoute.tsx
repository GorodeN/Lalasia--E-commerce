import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { authStore } from 'store/AuthStore';
import { routes } from 'config/routes';

export type PrivateRouteProps = {
  children: React.ReactNode;
  inverted?: boolean;
};

const PrivateRoute: React.FC<PrivateRouteProps> = observer(({ children, inverted = false }) => {
  const location = useLocation();

  if (inverted) {
    return authStore.isAuthenticated ? (
      <Navigate to={routes.profile.create()} state={{ from: location }} replace />
    ) : (
      <>{children}</>
    );
  }

  return authStore.isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={routes.auth.create.login()} state={{ from: location }} replace />
  );
});

export default PrivateRoute;
