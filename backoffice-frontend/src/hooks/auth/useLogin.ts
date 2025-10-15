import { useMutation } from '@tanstack/react-query';
import { login } from '../../apis/auth/api';
import { useNavigate } from 'react-router';
import useAuthStore from '../../stores/authStore';
import { useShallow } from 'zustand/shallow';

// 로그인
export const useLogin = () => {
  const navigate = useNavigate()
  const { setToken } = useAuthStore(
    useShallow((s) => ({ setToken: s.setToken, setUser: s.setUser })),
  );

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken);
      navigate('/'); 
    }
  });
};
