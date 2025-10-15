import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  user: string | null;
  accessToken: string | null;

  setToken: (token: string | null) => void;
  setUser: (user: string | null) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

      setToken: (token) => set({ accessToken: token }),
      setUser: (user) => set({ user }),
      clearAuth: () => set({ user: null, accessToken: null }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage), 
      partialize: (s) => ({ accessToken: s.accessToken }),
    },
  ),
);

export default useAuthStore;

export const useIsAuthenticated = () => useAuthStore((s) => !!s.accessToken);
