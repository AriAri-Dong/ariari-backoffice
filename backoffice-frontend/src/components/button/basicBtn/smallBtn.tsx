import type { ButtonWithTextProps } from '../../../types/button';

/**
 *
 * @param title 버튼 이름
 * @param onClick 버튼 클릭 핸들러
 * @param round 버튼 모양 (true일 경우 rounded-full 적용)
 * @param className 추가 style class
 * @returns
 */
const SmallBtn = ({ title, onClick, round = false, className }: ButtonWithTextProps) => {
  return (
    <button
      className={`text-body1_sb active:bg-primary_hover bg-primary text-background md:hover:bg-primary_hover md:active:bg-primary_pressed cursor-pointer px-[22px] py-[13px] whitespace-nowrap ${round ? 'rounded-full' : 'rounded-lg'} ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default SmallBtn;
