import { api } from '../../libs/api';
import type {
  GetReportPendingListParams,
  GetReportResolvedListParams,
  GetReportSearchListParams,
  ReportPendingListResponse,
  ReportResolvedListResponse,
} from '../../types/api/report';
import { safeRequest, type ApiResult } from '../apiHelper';
import { REPORT_PENDING, REPORT_RESOLVED, REPORT_SEARCH } from '../apiUrls';

// 조치필요 신고 리스트 조회
export const getReportPendingList = async (
  params: GetReportPendingListParams,
): Promise<ApiResult<ReportPendingListResponse>> => {
  return safeRequest<ReportPendingListResponse>(() => api.get(REPORT_PENDING, { params }));
};

// 조치완료 신고 리스트 조회
export const getReportResolvedList = async (
  params: GetReportResolvedListParams,
): Promise<ApiResult<ReportResolvedListResponse>> => {
  return safeRequest<ReportResolvedListResponse>(() => api.get(REPORT_RESOLVED, { params }));
};

// 조치완료 신고 리스트 - 검색 조회
export const getReportSearchList = async (
  params: GetReportSearchListParams,
): Promise<ApiResult<ReportResolvedListResponse>> => {
  return safeRequest<ReportResolvedListResponse>(() => api.get(REPORT_SEARCH, { params }));
};