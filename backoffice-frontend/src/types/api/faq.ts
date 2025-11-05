export type FaqCategory =
  | 'ACCOUNT'
  | 'CLUB'
  | 'DATA'
  | 'GENERAL'
  | 'LOGIN'
  | 'MAINTENANCE'
  | 'POLICY'
  | 'SECURITY'
  | 'SERVICE'
  | 'TECHNICAL'
  | 'UPDATE';

export type TokenColor = 'RED' | 'YELLOW' | 'GREEN' | 'SKYBLUE' | 'BLUE' | 'PRUPLE' | 'PINK';
/**
 * FAQ 목록 조회 파라미터
 */
export interface GetFaqListParams {
  category: FaqCategory | '';
  page: number;
  pageSize: number;
}

/**
 * FAQ 목록 아이템
 */
export interface FaqListItem {
  id: string;
  category: FaqCategory;
  title: string;
  tokenColor: TokenColor;
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
  category: FaqCategory;
  title: string;
  tokenColor: TokenColor;
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
  category: FaqCategory; // FAQ 분류 (최대 5자)
  tokenColor: TokenColor; // 태그 컬러 (RED ~ PINK 등)
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
