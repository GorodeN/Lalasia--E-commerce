export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  product: {
    mask: '/product/:id',
    create: (id: string) => `/product/${id}`,
  },
  categories: {
    mask: '/categories',
    create: () => `/categories`,
  },
  about: {
    mask: '/about',
    create: () => `/about`,
  },
  cart: {
    mask: '/cart',
    create: () => `/cart`,
  },
  auth: {
    mask: '/auth/*',
    login: '/auth/login',
    register: '/auth/register',
    create: {
      login: () => '/auth/login',
      register: () => '/auth/register',
    }
  },
  profile: {
    mask: '/profile',
    create: () => '/profile',
  },
};
