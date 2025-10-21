'use client';

export interface BadgeProps {
  title: string;
  imageUrl: string;
  isSelected: boolean;
  onClick: () => void;
}

/**
 *
 * @param title badge 설명 (제목)
 * @param imageUrl 이미지 경로
 * @param isSelected 선택 여부
 * @param onClick 클릭 이벤트 핸들러
 * @returns
 */
const ReviewBadgeList = ({ title, imageUrl, isSelected, onClick }: BadgeProps) => {
  return (
    <div
      className={`flex cursor-pointer items-center gap-[6px] rounded px-2.5 py-[3px] md:py-1 ${
        isSelected
          ? `border-selectedoption_border bg-selectedoption_hover border`
          : `bg-selectedoption_default`
      }`}
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt={'badge'}
        width={16}
        height={16}
        className='md:h-5 md:w-5'
      />
      <p className='text-mobile_body3_m text-subtext2 md:text-body3_m'>{title}</p>
    </div>
  );
};

export default ReviewBadgeList;
