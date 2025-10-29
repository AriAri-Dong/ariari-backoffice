/**
 * FAQ 목록 조회 파라미터
 */
export interface GetFaqListParams {
  category?: string;
  page?: number;
  pageSize?: number;
}

/**
 * FAQ 목록 아이템
 */
export interface FaqListItem {
  id: string;
  category: string;
  title: string;
  tokenColor: string;
  description: string;
}

/**
 * GET /api/v1/faqs 응답
 */
export interface FaqListResponse {
  status: 'success';
  data: {
    total: number;
    page: number;
    pageSize: number;
    faqs: FaqListItem[];
  };
}

/**
 * FAQ 상세
 */
export interface FaqDetail {
  id: string;
  category: string;
  title: string;
  tokenColor: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * GET /api/v1/faqs/{id} 응답
 */
export interface FaqDetailResponse {
  status: 'success';
  data: FaqDetail;
}

/**
 * FAQ 생성/수정 요청 바디
 * (POST / PUT 동일 구조)
 */
export interface UpsertFaqPayload {
  title: string; // FAQ 제목
  category: string; // FAQ 분류 (최대 5자)
  tokenColor: string; // 태그 컬러 (RED ~ PINK 등)
  description: string; // FAQ 상세 (최대 3000자)
}

/**
 * POST /api/v1/faqs 응답
 */
export interface CreateFaqResponse {
  status: 'success';
  data: {
    id: string;
    title: string;
    createdAt: string;
  };
}

/**
 * PUT /api/v1/faqs/{id} 응답
 */
export interface UpdateFaqResponse {
  status: 'success';
  data: {
    id: string;
    title: string;
    updatedAt: string;
  };
}

/**
 * DELETE /api/v1/faqs/{id} 응답
 */
export interface DeleteFaqResponse {
  status: 'success';
  message: string;
}
