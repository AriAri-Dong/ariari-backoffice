import { api } from '../../libs/api';
import { safeRequest, type ApiResult } from '../apiHelper';
import { TERMS } from '../apiUrls';
import type {
  GetTermsListParams,
  TermsListResponse,
  TermDetailResponse,
  CreateTermPayload,
  CreateTermResponse,
  UpdateTermPayload,
  UpdateTermResponse,
  DeleteTermResponse,
} from '../../types/api/terms';

/**
 * 약관 목록 조회
 * GET /api/v1/terms
 */
export const getTermsList = async (
  params: GetTermsListParams,
): Promise<ApiResult<TermsListResponse>> => {
  return safeRequest<TermsListResponse>(() => api.get(TERMS, { params }));
};

/**
 * 약관 상세 조회
 * GET /api/v1/terms/{id}
 */
export const getTermDetail = async (
  id: number | string,
): Promise<ApiResult<TermDetailResponse>> => {
  return safeRequest<TermDetailResponse>(() => api.get(`${TERMS}/${id}`));
};

/**
 * 약관 등록
 * POST /api/v1/terms/create
 */
export const createTerm = async (
  payload: CreateTermPayload,
): Promise<ApiResult<CreateTermResponse>> => {
  return safeRequest<CreateTermResponse>(() => api.post(`${TERMS}/create`, payload));
};

/**
 * 약관 수정
 * PUT /api/v1/terms/{id}
 */
export const updateTerm = async (
  id: number | string,
  payload: UpdateTermPayload,
): Promise<ApiResult<UpdateTermResponse>> => {
  return safeRequest<UpdateTermResponse>(() => api.put(`${TERMS}/${id}`, payload));
};

/**
 * 약관 삭제
 * DELETE /api/v1/terms/{id}
 */
export const deleteTerm = async (id: number | string): Promise<ApiResult<DeleteTermResponse>> => {
  return safeRequest<DeleteTermResponse>(() => api.delete(`${TERMS}/${id}`));
};
