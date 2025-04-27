import { api } from './api';

export const login = async (data: { identifier: string; password: string }) => {
  const response = await api.post(`/auth/local`, data);
  return response.data;
};

export const register = async (data: { username: string; email: string; password: string }) => {
  const response = await api.post(`/auth/local/register`, data);
  return response.data;
};
