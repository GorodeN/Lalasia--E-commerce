import axios from 'axios';

const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_BASE_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const api = axios.create({
  baseURL: `${STRAPI_BASE_URL}/api`,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});
