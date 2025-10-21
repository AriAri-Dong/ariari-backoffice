import { useMemo, useState } from 'react';
import Pagination from './pagination';
import Table from './table';
import type { Column } from '../types/table';

type PaginatedTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  rowKey?: keyof T | ((row: T) => string | number);
  className?: string;
  onRowClick?: (row: T) => void;
};

export default function PaginatedTable<T>({
  columns,
  data,
  pageSize = 10,
  rowKey,
  className = '',
  onRowClick,
}: PaginatedTableProps<T>) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(data.length / pageSize);

  const pagedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, currentPage, pageSize]);

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
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
