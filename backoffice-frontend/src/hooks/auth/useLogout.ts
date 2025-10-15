import { useMutation } from '@tanstack/react-query';
import { logout } from '../../apis/auth/api';
import useAuthStore from '../../stores/authStore';
import { useShallow } from 'zustand/shallow';

// 로그아웃
export const useLogout = () => {
  const { clearAuth } = useAuthStore(useShallow((s) => ({ clearAuth: s.clearAuth })));

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth()
      localStorage.removeItem('refreshToken')
    },
  });
};
