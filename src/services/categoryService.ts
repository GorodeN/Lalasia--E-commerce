import { api } from './api';

export const fetchCategories = async (params?: Record<string, unknown>) => {
  const response = await api.get('/product-categories', {
    params: {
      fields: ['title'],
      ...params,
    },
  });
  return response.data;
};

