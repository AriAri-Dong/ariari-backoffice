import { useMemo } from 'react';
import Pagination from './pagination';
import Table from './table';
import type { Column } from '../types/table';

type PaginatedTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  /** 현재 페이지 (외부 제어) */
  page?: number;
  /** 한 페이지당 개수 */
  pageSize?: number;
  /** 전체 개수 (서버페이징용) */
  total?: number;
  /** row key 지정 */
  rowKey?: keyof T | ((row: T) => string | number);
  className?: string;
  /** row 클릭 핸들러 */
  onRowClick?: (row: T) => void;
  /** 페이지 변경 시 콜백 (서버페이징용) */
  onPageChange?: (page: number) => void;
  /** 페이지 크기 변경 시 콜백 */
  onPageSizeChange?: (pageSize: number) => void;
};

export default function PaginatedTable<T>({
  columns,
  data,
  page = 1,
  pageSize = 10,
  total,
  rowKey,
  className = '',
  onRowClick,
  onPageChange,
}: PaginatedTableProps<T>) {
  // total이 주어지면 서버페이징으로, 없으면 로컬 data.length 기준
  const totalCount = total ?? data.length;
  const totalPages = Math.ceil(totalCount / pageSize);

  // total이 있으면 서버페이징으로 data 그대로 사용, 없으면 slice
  const pagedData = useMemo(() => {
    if (total) return data; // 서버페이징
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize, total]);

  return (
    <div className={`w-full ${className}`}>
      <div className='h-[685px]'>
        <Table
          columns={columns}
          data={pagedData}
          rowKey={rowKey}
          onRowClick={onRowClick}
        />
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage: number) => onPageChange?.(newPage)}
        />
      )}
    </div>
  );
}
