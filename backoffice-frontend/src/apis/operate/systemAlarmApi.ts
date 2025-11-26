import { api } from '../../libs/api';
import { safeRequest, type ApiResult } from '../apiHelper';
import { SYSTEM_ALARM } from '../apiUrls';

import type {
  SystemAlarmListResponse,
  SystemAlarmDetailResponse,
  SystemAlarmDeleteResponse,
  SystemAlarmCreateResponse,
} from '../../types/api/systemAlarm';

// 서비스 알림 목록 조회
export const getSystemAlarmList = async (params: {
  search?: string;
  filter?: string;
  page?: number;
  pageSize?: number;
}): Promise<ApiResult<SystemAlarmListResponse>> => {
  return safeRequest<SystemAlarmListResponse>(() => api.get(SYSTEM_ALARM, { params }));
};

// 서비스 알림 상세 조회
export const getSystemAlarmDetail = async (
  id: string | number,
): Promise<ApiResult<SystemAlarmDetailResponse>> => {
  return safeRequest<SystemAlarmDetailResponse>(() => api.get(`${SYSTEM_ALARM}/${id}`));
};

// 서비스 알림 등록
export const createSystemAlarm = async (
  formData: FormData,
): Promise<ApiResult<SystemAlarmCreateResponse>> => {
  return safeRequest<SystemAlarmCreateResponse>(() =>
    api.post(SYSTEM_ALARM, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  );
};

// 서비스 알림 삭제
export const deleteSystemAlarm = async (
  id: string | number,
): Promise<ApiResult<SystemAlarmDeleteResponse>> => {
  return safeRequest<SystemAlarmDeleteResponse>(() => api.delete(`${SYSTEM_ALARM}/${id}`));
};
