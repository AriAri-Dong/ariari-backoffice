import { useQuery } from '@tanstack/react-query';
import { getReportResolvedList } from '../../apis/report/api';
import { isApiError } from '../../utils/typeGuard';
import type { ReportResolvedListResponse } from '../../types/api/report';

interface UseReportResolvedParams {
  page: number;
  size: number;
  keyword?: string;
  filterType?: string;
  locationType?: string;
  startDate?: string;
  endDate?: string;
  initialData?: ReportResolvedListResponse;
}

export const useReportResolvedList = ({
  page,
  size,
  keyword,
  filterType,
  locationType,
  startDate,
  endDate,
  initialData,
}: UseReportResolvedParams) => {
  return useQuery({
    queryKey: [
      'reportResolvedList',
      {
        page,
        size,
        ...(keyword && { keyword }),
        ...(keyword && filterType && { filterType }),
        ...(locationType && { locationType }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      },
    ],
    queryFn: async () => {
      const params: any = {
        page,
        size,
      };

      if (keyword) params.keyword = keyword;
      if (filterType) params.filterType = filterType;
      if (locationType) params.locationType = locationType;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const res = await getReportResolvedList(params);
      if (isApiError(res)) {
        throw new Error(res.message);
      }
      return res;
    },
    enabled: !filterType || !!keyword,
    initialData:
      page === 0 &&
      !keyword &&
      !filterType &&
      !locationType &&
      !startDate &&
      !endDate &&
      initialData
        ? initialData
        : undefined,
  });

};
