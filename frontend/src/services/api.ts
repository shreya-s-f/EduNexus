import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('edunexus_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token on expired auth
      if (!window.location.pathname.includes('/login')) {
        localStorage.removeItem('edunexus_token');
        localStorage.removeItem('edunexus_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
