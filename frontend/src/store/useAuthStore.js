import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// handle all state variables here
const useAuthStore = create(
  persist(
    (set) => ({

      // user info  
      user: null,
      // JWT
      token: null,
      // quick check
      isAuthenticated: false,

      // save user data + token
      login: (userData, token) => {
        set({ 
          user: userData, 
          token, 
          isAuthenticated: true 
        });
      },

      // forget user
      logout: () => {
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        });
      },

      // update his details
      updateUser: (userData) => {
        set({ user: userData });
      },
    }),

    // persist config to save key
    {
        // it saves: localStorage.getItem('auth-storage')
        name: 'auth-storage', 
    }
  )
);

export default useAuthStore;