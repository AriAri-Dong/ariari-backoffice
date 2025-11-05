/**
 * 공지사항 목록 조회 파라미터 (쿼리스트링)
 */
export interface GetNoticeListParams {
  search?: string; // 검색어
  filter?: 'title' | 'author'; // 검색 기준
  status?: 'POSTED' | 'UNPOSTED'; // 게시 상태
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  page?: number; // 페이지 번호 (기본 1)
  pageSize?: number; // 페이지 크기 (기본 10)
}

/**
 * 공지사항 목록의 각 아이템
 */
export interface NoticeListItem {
  id: string;
  date: string; // "2024-03-09"
  title: string;
  status: string; // 예: "POSTED" | "UNPOSTED" | "active"
  author: string;
  views: number;
}

/**
 * GET /api/v1/notices 응답 (실제 서버 구조 반영)
 */
export interface NoticeListResponse {
  status: 'success';
  total: number;
  page: number;
  pageSize: number;
  items: NoticeListItem[];
}

/**
 * 공지사항 상세
 */
export interface NoticeDetail {
  id: string;
  title: string;
  popupEnabled: boolean;
  popupStartDate?: string; // YYYY-MM-DD
  popupEndDate?: string; // YYYY-MM-DD
  body: string;
  images: string[];
  status: 'POSTED' | 'UNPOSTED';
  author: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * GET /api/v1/notices/{id} 응답
 */
export interface NoticeDetailResponse {
  status: 'success';
  data: NoticeDetail;
}

/**
 * 공지사항 생성 요청 (FormData 변환 전)
 */
export interface CreateNoticePayload {
  title: string;
  body: string;
  popupEnabled: boolean;
  popupStartDate?: string;
  popupEndDate?: string;
  status: 'POSTED' | 'UNPOSTED';
  files?: File[] | string[];
}

/**
 * POST /api/v1/notices 응답
 */
export interface CreateNoticeResponse {
  status: string;
  message: string;
  data: {
    id: string;
    title: string;
    images: string[];
    createdAt: string;
  };
}

/**
 * 공지사항 수정 요청 (FormData 변환 전)
 */
export interface UpdateNoticePayload {
  title: string;
  body: string;
  popupEnabled?: boolean;
  status: 'POSTED' | 'UNPOSTED';
  popupStartDate?: string;
  popupEndDate?: string;
  removeImages?: string[];
  files?: File[] | string[];
}

/**
 * PUT /api/v1/notices/{id} 응답
 */
export interface UpdateNoticeResponse {
  status: string;
  message: string;
  data: {
    id: string;
    title: string;
    images: string[];
    createdAt: string;
  };
}

/**
 * DELETE /api/v1/notices/{id} 응답
 */
export interface DeleteNoticeResponse {
  status: 'success';
  message: string;
}
