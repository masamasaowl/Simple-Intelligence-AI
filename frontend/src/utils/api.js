import axios from 'axios';

// create instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {

    // Check localStorage for saved auth data
    // from the persist of zustand
    const authData = localStorage.getItem('auth-storage');

    // parse it
    if (authData) {
      const { state } = JSON.parse(authData);

      // If token exists, then send it via request header
      if (state.token) {
        config.headers.Authorization = `Bearer ${state.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle auth errors
api.interceptors.response.use(
  // If success, just return response
  (response) => response,

  // If error status is 401 (Unauthorized)
  (error) => {
    if (error.response?.status === 401) {
      // Delete token
      localStorage.removeItem('auth-storage');
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;