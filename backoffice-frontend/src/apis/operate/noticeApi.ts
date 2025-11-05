import { api } from '../../libs/api';
import type {
  CreateNoticePayload,
  UpdateNoticePayload,
  GetNoticeListParams,
  NoticeListResponse,
  NoticeDetailResponse,
  CreateNoticeResponse,
  UpdateNoticeResponse,
  DeleteNoticeResponse,
} from '../../types/api/notice';
import { safeRequest, type ApiResult } from '../apiHelper';
import { NOTICE } from '../apiUrls';

function buildNoticeFormData(
  payload: CreateNoticePayload | UpdateNoticePayload,
  mode: 'create' | 'update',
): FormData {
  const formData = new FormData();

  const baseReq =
    mode === 'create'
      ? {
          title: payload.title,
          body: payload.body,
          popupEnabled: payload.popupEnabled,
          popupStartDate: payload.popupStartDate,
          popupEndDate: payload.popupEndDate,
          status: payload.status,
        }
      : {
          title: payload.title,
          body: payload.body,
          popupEnabled: payload.popupEnabled,
          popupStartDate: payload.popupStartDate,
          popupEndDate: payload.popupEndDate,
          status: payload.status,
          removeImages: (payload as UpdateNoticePayload).removeImages ?? [],
        };

  // JSON을 Blob으로 변환 → saveReq / modifyReq 로 append
  const blob = new Blob([JSON.stringify(baseReq)], { type: 'application/json' });
  formData.append(mode === 'create' ? 'saveReq' : 'modifyReq', blob);

  // 파일은 files[] 형태로 따로 append
  const files =
    'files' in payload ? payload.files : 'images' in payload ? (payload as any).images : undefined;

  if (files && files.length > 0) {
    files.forEach((file: File) => {
      formData.append('files', file); // FormData에 여러 개 append → multipart의 "files[]" 구조로 전송됨
    });
  }

  return formData;
}

/**
 * 목록 조회
 */
export const getNoticeList = async (
  params: GetNoticeListParams,
): Promise<ApiResult<NoticeListResponse>> => {
  return safeRequest<NoticeListResponse>(() => api.get(NOTICE, { params }));
};

/**
 * 상세 조회
 */
export const getNoticeDetail = async (id: string): Promise<ApiResult<NoticeDetailResponse>> => {
  return safeRequest<NoticeDetailResponse>(() => api.get(`${NOTICE}/${id}`));
};

/**
 * 생성
 */
export const createNotice = async (
  payload: CreateNoticePayload,
): Promise<ApiResult<CreateNoticeResponse>> => {
  const formData = buildNoticeFormData(payload, 'create');

  // 확인용: 전송 전 FormData 내용을 콘솔에 출력
  for (const [key, value] of formData.entries()) {
    console.log('📦 FormData:', key, value);
  }

  return safeRequest<CreateNoticeResponse>(() =>
    api.post(NOTICE, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  );
};

/**
 * 수정
 */
export const updateNotice = async (
  id: string,
  payload: UpdateNoticePayload,
): Promise<ApiResult<UpdateNoticeResponse>> => {
  const formData = buildNoticeFormData(payload, 'update');

  for (const [key, value] of formData.entries()) {
    console.log('📦 FormData:', key, value);
  }

  return safeRequest<UpdateNoticeResponse>(() =>
    api.put(`${NOTICE}/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  );
};

/**
 * 삭제
 */
export const deleteNotice = async (id: string): Promise<ApiResult<DeleteNoticeResponse>> => {
  return safeRequest<DeleteNoticeResponse>(() => api.delete(`${NOTICE}/${id}`));
};
