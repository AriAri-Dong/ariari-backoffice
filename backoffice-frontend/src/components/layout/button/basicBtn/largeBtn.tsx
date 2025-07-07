import type { ButtonWithTextProps } from '../../../types/button';

/**
 *
 * @param title 버튼 이름
 * @param onClick 버튼 클릭 핸들러
 * @param round 버튼 모양 (true일 경우 rounded-full 적용)
 * @param className 추가 style class
 * @returns
 */
const LargeBtn = ({ title, onClick, round = false, className }: ButtonWithTextProps) => {
  return (
    <button
      className={`text-mobile_body1_sb mb:text-h4_sb active:bg-primary_hover bg-primary text-background md:hover:bg-primary_hover md:active:bg-primary_pressed py-3.5 md:py-[18px] ${round ? 'rounded-full' : 'rounded-lg'} w-full ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default LargeBtn;
