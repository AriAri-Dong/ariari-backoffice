import React from 'react';
import type { Column } from '../types/table';
import { getTextAlignClass } from '../utils/getClass';

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  rowKey?: keyof T | ((row: T) => string | number);
  className?: string;
  onRowClick?: (row: T) => void;
};

export default function Table<T>({
  columns,
  data,
  rowKey,
  className = '',
  onRowClick,
}: TableProps<T>) {
  const getRowKey = (row: T, index: number): React.Key => {
    if (typeof rowKey === 'function') return rowKey(row);
    if (typeof rowKey === 'string') return row[rowKey as keyof T] as React.Key;
    return index;
  };
  const onRowClickHandler = (row: T) => {
    if (onRowClick) {
      onRowClick(row);
      console.log(row);
    }
  };

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className='min-w-full table-auto'>
        <thead className='text-subtext2 bg-white70'>
          <tr>
            {columns.map((col, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === columns.length - 1;

              return (
                <th
                  key={idx}
                  style={col.width ? { width: col.width } : undefined}
                  className={`text-body1_m px-6 py-[9px] ${getTextAlignClass(col.align)} ${isFirst ? 'rounded-tl-sm rounded-bl-sm' : ''} ${isLast ? 'rounded-tr-sm rounded-br-sm' : ''}`}
                >
                  {col.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className='bg-background'>
          <tr
            className='h-2'
            aria-hidden
          />
          {data.map((row, index) => {
            const isFirst = index === 0;
            const isLast = index === data.length - 1;

            return (
              <tr
                key={getRowKey(row, index)}
                onClick={() => onRowClickHandler(row)}
                // className='hover:bg-sub_bg'
              >
                {columns.map((col, colIndex) => {
                  const value = (row as any)[col.key];
                  const isFirstCol = colIndex === 0;
                  const isLastCol = colIndex === columns.length - 1;

                  const rounded =
                    (isFirst && isFirstCol ? 'rounded-tl-md' : '') +
                    ' ' +
                    (isFirst && isLastCol ? 'rounded-tr-md' : '') +
                    ' ' +
                    (isLast && isFirstCol ? 'rounded-bl-md' : '') +
                    ' ' +
                    (isLast && isLastCol ? 'rounded-br-md' : '');

                  return (
                    <td
                      key={colIndex}
                      style={col.width ? { width: col.width } : undefined}
                      className={`text-body3_r h-[64px] px-6 ${getTextAlignClass(col.align)} ${col.className || 'text-subtext2'} ${rounded}`}
                    >
                      {col.render ? col.render(value, row, index) : value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
