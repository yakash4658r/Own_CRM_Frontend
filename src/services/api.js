import axios from 'axios';

const api = axios.create({
  baseURL: 'https://own-crm.onrender.com/api',
});

api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser.token) {
          config.headers.Authorization = `Bearer ${parsedUser.token}`;
        }
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
