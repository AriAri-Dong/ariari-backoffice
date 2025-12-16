// 조치필요 신고 리스트 조회
export interface GetReportPendingListParams {
  page?: number; 
  size?: number; 
}

// 조치완료 신고 리스트 조회
export interface GetReportResolvedListParams {
  page?: number; 
  size?: number; 
}

// 조치완료 신고 리스트 - 검색 조회
export interface GetReportSearchListParams {
  filterType?: string;
  keyword?: string;
  locationType?: string;
  startDate?: string;
  endDate?: string;
  page: number;
  size: number;
}

export interface BaseReportListItem {
  id: string;
  number: number;
  reportDate: string;
  title: string;
  body: string;
  location: string;
  locationUrl: string;
  reporter: string;
}

export interface BaseReportPageInfo {
  contentSize: number;
  totalSize: number;
  totalPages: number;
  isLast: boolean;
}

export interface ReportPendingListItem extends BaseReportListItem {}
export interface ReportResolvedListItem extends BaseReportListItem {
  resolveBody: string;
  resolvedDate: string;
}

// 조치필요 신고 리스트 조회 응답
export interface ReportPendingListResponse {
  reportDataList: ReportPendingListItem[];
  reportPageInfo: BaseReportPageInfo;
}

// 조치완료 신고 리스트 조회 응답
export interface ReportResolvedListResponse {
  resolvedReportData: ReportResolvedListItem[];
  reportPageInfo: BaseReportPageInfo;
}

// 조치 완료 처리 요청 payload
export interface ReportResolvePayload {
  reportId: string;
  resolveBody: string;
}

// 신고 내역 삭제 요청 payload
export interface ReportDeletePayload {
  reportId: string;
  deleteBody: string;
}