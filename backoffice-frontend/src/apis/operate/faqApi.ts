import { api } from '../../libs/api';
import type {
  GetFaqListParams,
  FaqListResponse,
  FaqDetailResponse,
  UpsertFaqPayload,
  CreateFaqResponse,
  UpdateFaqResponse,
  DeleteFaqResponse,
} from '../../types/api/faq';
import { safeRequest, type ApiResult } from '../apiHelper';
import { FAQ } from '../apiUrls';

/**
 * FAQ 목록 조회
 * GET /api/v1/faqs
 */
export const getFaqList = async (params: GetFaqListParams): Promise<ApiResult<FaqListResponse>> => {
  return safeRequest<FaqListResponse>(() => api.get(FAQ, { params }));
};

/**
 * FAQ 상세 조회
 * GET /api/v1/faqs/{id}
 */
export const getFaqDetail = async (id: string): Promise<ApiResult<FaqDetailResponse>> => {
  return safeRequest<FaqDetailResponse>(() => api.get(`${FAQ}/${id}`));
};

/**
 * FAQ 작성
 * POST /api/v1/faqs
 * body: JSON
 */
export const createFaq = async (
  payload: UpsertFaqPayload,
): Promise<ApiResult<CreateFaqResponse>> => {
  return safeRequest<CreateFaqResponse>(() => api.post(FAQ, payload));
};

/**
 * FAQ 수정
 * PUT /api/v1/faqs/{id}
 * body: JSON
 */
export const updateFaq = async (
  id: string,
  payload: UpsertFaqPayload,
): Promise<ApiResult<UpdateFaqResponse>> => {
  return safeRequest<UpdateFaqResponse>(() => api.put(`${FAQ}/${id}`, payload));
};

/**
 * FAQ 삭제
 * DELETE /api/v1/faqs/{id}
 */
export const deleteFaq = async (id: string): Promise<ApiResult<DeleteFaqResponse>> => {
  return safeRequest<DeleteFaqResponse>(() => api.delete(`${FAQ}/${id}`));
};
