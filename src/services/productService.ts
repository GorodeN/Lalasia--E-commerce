import { api } from './api';

export const fetchProducts = async (params: Record<string, unknown>) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const fetchProductById = async (documentId: string, params?: Record<string, unknown>) => {
  const response = await api.get(`/products/${documentId}`, { params });
  return response.data;
};
