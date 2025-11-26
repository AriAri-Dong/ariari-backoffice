export type TermType = 'PRIVACY_POLICY' | 'CLUB_RULES' | 'PLATFORM_RULES';

export interface GetTermsListParams {
  page?: number;
  pageSize?: number;
}

export interface TermsListItem {
  id: number;
  title: string;
  author: string;
  createdAt: string;
}

export interface TermsListResponse {
  status: 'success';
  total: number;
  page: number;
  pageSize: number;
  items: TermsListItem[];
}

export interface TermDetail {
  id: number;
  title: string;
  body: string;
  author?: string;
  createdAt?: string;
}

export interface BaseTermsApiResponse<T = unknown> {
  status: 'success';
  message: string;
  data: T;
}

export type TermDetailResponse = BaseTermsApiResponse<TermDetail>;
export type CreateTermResponse = BaseTermsApiResponse<TermDetail>;
export type UpdateTermResponse = BaseTermsApiResponse<TermDetail>;
export type DeleteTermResponse = BaseTermsApiResponse<null>;

export interface CreateTermPayload {
  termType: TermType;
  body: string;
}

export interface UpdateTermPayload {
  title: string;
  body: string;
}
