import axios from 'axios';
import useAuthStore from '../stores/authStore';
import { refreshAccessToken } from '../apis/auth/api';

export const api = axios.create({
  withCredentials: true,
});


// 요청 인터셉터
api.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = accessToken;
  }
  return config;
});

let isRefreshing = false;

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken') || ''
        const newAccessToken = await refreshAccessToken({ refreshToken});

        if (newAccessToken) {
          originalRequest.headers.Authorization = newAccessToken;
          return api(originalRequest);
        }
      } catch (error) {
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
