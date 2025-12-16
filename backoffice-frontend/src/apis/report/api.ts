import { api } from '../../libs/api';
import type {
  GetReportPendingListParams,
  GetReportSearchListParams,
  ReportDeletePayload,
  ReportPendingListResponse,
  ReportResolvedListResponse,
  ReportResolvePayload,
} from '../../types/api/report';
import { safeRequest, type ApiResult } from '../apiHelper';
import { REPORT_DELETE, REPORT_PENDING, REPORT_RESOLVE, REPORT_SEARCH } from '../apiUrls';

// 조치필요 신고 리스트 조회
export const getReportPendingList = async (
  params: GetReportPendingListParams,
): Promise<ApiResult<ReportPendingListResponse>> => {
  return safeRequest<ReportPendingListResponse>(() => api.get(REPORT_PENDING, { params }));
};

// 조치완료 신고 리스트 - 검색 조회
export const getReportResolvedList = async (
  params: GetReportSearchListParams,
): Promise<ApiResult<ReportResolvedListResponse>> => {
  return safeRequest<ReportResolvedListResponse>(() => api.get(REPORT_SEARCH, { params }));
};

// 신고 내역 조치 완료
export const resolveReport = async (payload: ReportResolvePayload): Promise<ApiResult<{}>> => {
  return safeRequest(() => api.post(REPORT_RESOLVE, payload));
};

// 신고 내역 삭제하기
export const deleteReport = async (payload: ReportDeletePayload): Promise<ApiResult<{}>> => {
  return safeRequest(() => api.post(REPORT_DELETE, payload));
};

// locationUrl 경로로 요청한 신고 대상 데이터 조회
export const getReportTarget = async (url: string) => {
  return safeRequest(() => api.get(url));
};