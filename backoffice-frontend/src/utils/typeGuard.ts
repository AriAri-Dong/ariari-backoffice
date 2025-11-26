import type { ApiError } from '../types/apiError';

export function isApiError(value: unknown): value is ApiError {
  return (
    !!value &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    'status' in value &&
    'message' in value
  );
}
