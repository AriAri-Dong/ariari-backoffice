export interface SystemAlarmListItem {
  id: number;
  title: string;
  views: number;
  target: string; // 'ALL / ADMIN'
  createdAt: string;
}

export interface SystemAlarmListResponse {
  status: 'success';
  total: number;
  page: number;
  pageSize: number;
  items: SystemAlarmListItem[];
}

export interface SystemAlarmDetail {
  id: number;
  title: string;
  description: string;
  views: number;
  target: string;
  createdAt: string;
  images: string[];
}

export interface BaseSystemAlarmApiResponse<T> {
  status: 'success';
  message: string;
  data: T;
}

export type SystemAlarmDetailResponse = BaseSystemAlarmApiResponse<SystemAlarmDetail>;
export type SystemAlarmDeleteResponse = BaseSystemAlarmApiResponse<null>;
export type SystemAlarmCreateResponse = BaseSystemAlarmApiResponse<SystemAlarmDetail>;
