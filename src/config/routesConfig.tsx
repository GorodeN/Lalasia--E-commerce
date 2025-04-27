import { Navigate, RouteObject } from 'react-router';
import App from '../App';
import Home from 'pages/Home';
import Product from 'pages/Product';
import Categories from 'pages/Categories';
import About from 'pages/About';
import Cart from 'pages/Cart';
import Profile from 'pages/Profile';
import Auth from 'pages/Auth';
import LoginForm from 'pages/Auth/components/LoginForm';
import RegisterForm from 'pages/Auth/components/RegisterForm';
import PrivateRoute from 'components/PrivateRoute';
import { routes } from './routes';
import ErrorPlaceholder from 'components/ErrorPlaceholder';

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    errorElement: <ErrorPlaceholder />,
    children: [
      {
        path: routes.main.mask,
        element: <Home />,
      },
      {
        path: routes.product.mask,
        element: <Product />,
      },
      {
        path: routes.categories.mask,
        element: <Categories />,
      },
      {
        path: routes.about.mask,
        element: <About />,
      },
      {
        path: routes.cart.mask,
        element: <Cart />,
      },
      {
        path: routes.profile.mask,
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: routes.auth.mask,
        element: (
          <PrivateRoute inverted>
            <Auth />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={routes.auth.login} replace />,
          },
          {
            path: 'login',
            element: <LoginForm />,
          },
          {
            path: 'register',
            element: <RegisterForm />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routes.main.mask} replace />,
  },
];
