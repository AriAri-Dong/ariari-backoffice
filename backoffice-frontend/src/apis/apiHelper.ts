import type { AxiosResponse } from 'axios';
import type { ApiError } from '../types/apiError';

export type ApiResult<T> = T | ApiError;

export async function safeRequest<T>(
  callback: () => Promise<AxiosResponse<T>>,
): Promise<ApiResult<T>> {
  try {
    const res = await callback();
    return res.data;
  } catch (error: any) {
    if (error.response) {
      const apiError: ApiError = {
        status: error.response.status,
        message: error.response.data?.message ?? 'Unknown error',
      };
      return apiError;
    } else {
      throw error;
    }
  }
}
