import api from '../utils/api';

// We are creating our own Authentication routes
// so they start with -> /auth
export const authService = {

  // the login call -> axios attaches token to it   
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

//   me: async () => {
//     const response = await api.get('/auth/me');
//     return response.data;
//   }
};