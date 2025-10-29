// 1. 기존/신규 유저 비율 (/member/retention-ratio)
export interface MemberRetentionRatioResponse {
  newUserCount: number; // 신규 가입자 수
  existingUserCount: number; // 기존 사용자 수
  newUserRatio: number; // 신규 사용자 비율 (%)
  existingUserRatio: number; // 기존 사용자 비율 (%)
}

// 2. 방문자 수 추이 (/visit/trend)
export type VisitRange = 'today' | 'yesterday' | 'week' | 'month' | 'day';
// spec엔 today / yesterday / week / month 라고 되어 있는데
// example 주석에 range=day가 언급돼서 day도 포함

export interface GetVisitTrendParams {
  date: string; // YYYY-MM-DD
  range: VisitRange;
}

export interface VisitTrendResponse {
  labels: string[]; // X축 레이블 (시간 "0"~"23" 또는 "08.28" 형식의 날짜)
  values: number[]; // 방문자 수 값 배열
}

// 3. 동아리 TOP5 랭킹 (/club/ranking)
export interface ClubItem {
  name: string; // 동아리 이름
  rate: number; // 비율 (%)
}

export interface ClubRankingGroup {
  popular: ClubItem[];
  latest: ClubItem[];
}

export interface ClubRankingResponse {
  all: ClubRankingGroup;
  internal: ClubRankingGroup;
  external: ClubRankingGroup;
}

// 4. 생성/삭제 동아리 현황 (/club/statistics)
// 동아리 카테고리
export type ClubCategory =
  | 'All'
  | 'CULTURE'
  | 'VOLUNTEER'
  | 'STUDY'
  | 'STARTUP'
  | 'EMPLOYMENT'
  | 'SPORTS'
  | 'AMITY'
  | 'ETC';

// 지역 코드
export type ClubRegion =
  | 'All'
  | 'SEOUL_GYEONGGI'
  | 'CHUNGCHEONG'
  | 'GYEONGNAM'
  | 'GYEONGBUK'
  | 'JEONNAM'
  | 'JEONBUK'
  | 'GANGWON'
  | 'JEJU'
  | 'FOREIGN';

export interface GetClubStatisticsParams {
  date: string; // YYYY-MM-DD (기준 날짜)
  category: ClubCategory; // 분야 필터
  region: ClubRegion; // 지역 필터
}

export interface ClubStatisticsResponse {
  labels: string[]; // 예: ["분야", "지역"] 등 X축 라벨
  createdCount: number[]; // 생성된 동아리 수 배열
  deletedCount: number[]; // 삭제된 동아리 수 배열
  // 문서에는 date / groupBy 언급됐지만 응답 예시에 없어서 제외
}

// 5. 회원가입/삭제 추이 (/member/registration-trend)
export interface MemberRegistrationSummary {
  todaySignup: number; // 오늘 가입자 수
  monthSignup: number; // 이번 달 누적 가입자 수
  todayWithdrawal: number; // 오늘 탈퇴자 수
  monthWithdrawal: number; // 이번 달 누적 탈퇴자 수
}

export interface MemberRegistrationChart {
  labels: string[]; // ["1","2","3",...,"30"]
  signup: number[]; // 일자별 가입자 수 배열
  withdrawal: number[]; // 일자별 탈퇴자 수 배열
}

export interface MemberRegistrationTrendResponse {
  summary: MemberRegistrationSummary;
  chart: MemberRegistrationChart;
}

export interface GetMemberRegistrationTrendParams {
  date: string; // 기준 날짜 (YYYY-MM-DD)
}
