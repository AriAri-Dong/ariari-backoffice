import { api } from '../../libs/api';
import type { CrudDataListRes, CrudDataDetailRes, CrudDeleteRes } from '../../types/api/crud';
import { safeRequest, type ApiResult } from '../apiHelper';
import { DATAOPS, DATAOPS_DETAIL } from '../apiUrls';

// 데이터 리스트조회
export const getDataList = async (params: {
  table: string;
  filter?: string;
  keyword?: string;
  page: number;
  pageSize: number;
}): Promise<ApiResult<CrudDataListRes>> => {
  return safeRequest<CrudDataListRes>(() => api.get(DATAOPS, { params }));
};
// 데이터 상세 조회
export const getDataDetail = async (
  table: string,
  id: string,
): Promise<ApiResult<CrudDataDetailRes>> => {
  return safeRequest<CrudDataDetailRes>(() => api.get(`${DATAOPS_DETAIL}/${table}/${id}`));
};
// 데이터 삭제
export const deleteData = async (table: string, id: string): Promise<ApiResult<CrudDeleteRes>> => {
  return safeRequest<CrudDeleteRes>(() => api.delete(`${DATAOPS}/${table}/${id}`));
};
