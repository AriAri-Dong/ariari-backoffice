import ArrowIcon from '../assets/icons/vector_btn.svg';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

/**
 * pagination 컴포넌트
 * @param currentPage // 현재 페이지 (1부터 시작)
 * @param totalPages // 전체 페이지 수
 * @param onPageChange
 * @returns
 */
export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <div className='mt-5 flex items-center justify-center gap-4'>
      <button
        className={`bg-background border-menuborder flex h-[60px] w-[60px] items-center justify-center rounded-full border disabled:opacity-50`}
        disabled={isFirst}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <img
          src={ArrowIcon}
          alt='이전 페이지'
          className='h-9 w-9 cursor-pointer'
        />
      </button>

      <span className='text-subtext2 text-body3_r bg-background rounded-xl px-2.5 py-1'>
        {currentPage} / {totalPages}
      </span>

      <button
        className={`bg-background border-menuborder flex h-[60px] w-[60px] items-center justify-center rounded-full border disabled:opacity-50`}
        disabled={isLast}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <img
          src={ArrowIcon}
          alt='다음 페이지'
          className='h-9 w-9 rotate-180 cursor-pointer'
        />
      </button>
    </div>
  );
}
