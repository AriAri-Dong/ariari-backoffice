import { api } from '../../libs/api';
import type {
  MemberRetentionRatioResponse,
  GetVisitTrendParams,
  VisitTrendResponse,
  ClubRankingResponse,
  GetClubStatisticsParams,
  ClubStatisticsResponse,
  GetMemberRegistrationTrendParams,
  MemberRegistrationTrendResponse,
} from '../../types/api/dashboard';
import { safeRequest, type ApiResult } from '../apiHelper';
import {
  DASHBOARD_MEMBER_RATIO,
  DASHBOARD_VISIT,
  DASHBOARD_RANKING,
  DASHBOARD_CLUB,
  DASHBOARD_MEMBER_TREND,
} from '../apiUrls';

// 1. 기존/신규 유저 비율 (/member/retention-ratio)
export const getMemberRetentionRatio = async (): Promise<
  ApiResult<MemberRetentionRatioResponse>
> => {
  return safeRequest<MemberRetentionRatioResponse>(() => api.get(DASHBOARD_MEMBER_RATIO));
};

// 2. 방문자 수 추이 (/visit/trend)
export const getVisitTrend = async (
  params: GetVisitTrendParams,
): Promise<ApiResult<VisitTrendResponse>> => {
  return safeRequest<VisitTrendResponse>(() => api.get(DASHBOARD_VISIT, { params }));
};

// 3. 동아리 TOP5 랭킹 (/club/ranking)
export const getClubRanking = async (): Promise<ApiResult<ClubRankingResponse>> => {
  return safeRequest<ClubRankingResponse>(() => api.get(DASHBOARD_RANKING));
};

// 4. 생성/삭제 동아리 현황 (/club/statistics)
export const getClubStatistics = async (
  params: GetClubStatisticsParams,
): Promise<ApiResult<ClubStatisticsResponse>> => {
  return safeRequest<ClubStatisticsResponse>(() => api.get(DASHBOARD_CLUB, { params }));
};

// 5. 회원가입/삭제 추이 (/member/registration-trend)
export const getMemberRegistrationTrend = async (
  params: GetMemberRegistrationTrendParams,
): Promise<ApiResult<MemberRegistrationTrendResponse>> => {
  return safeRequest<MemberRegistrationTrendResponse>(() =>
    api.get(DASHBOARD_MEMBER_TREND, { params }),
  );
};
