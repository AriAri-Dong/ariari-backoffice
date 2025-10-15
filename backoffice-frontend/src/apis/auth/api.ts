import type { LoginForm } from '../../page/login/loginPage';
import { api } from '../../libs/api';
import type { ApiError } from '../../types/apiError';
import useAuthStore from '../../stores/authStore';

// 로그인
export const login = async (body: LoginForm) => {
  try {
    const res = await api.post('/auth/login', body);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      const apiError: ApiError = {
        status: error.response.status,
        message: error.response.data?.message,
      };
      return apiError
    } else {
      throw error
    }
  }
};


// 로그아웃
export const logout = async ({refreshToken}: {refreshToken: string}) => {
  try {
    const res = await api.post('/auth/logout', {refreshToken});
    return res;
  } catch (error: any) {
    if (error.response) {
      const apiError: ApiError = {
        status: error.response.status,
        message: error.response.data?.message,
      };
      return apiError;
    } else {
      throw error;
    }
  }
};



// 토큰 갱신
export const refreshAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<string | null> => {
  try {
    const response = await api.post('/reissue/token', { refreshToken });

    const newAccessToken = response.data.accessToken;
    useAuthStore.getState().setToken(newAccessToken);
    return newAccessToken;
  } catch (error) {
    useAuthStore.getState().clearAuth();
    return null;
  }
};
