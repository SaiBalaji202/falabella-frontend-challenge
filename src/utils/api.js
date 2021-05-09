import axios from 'axios';
import { dev, prod } from '../config.json';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const api = axios.create({
  baseURL: isDev ? dev.apiUrl : prod.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
