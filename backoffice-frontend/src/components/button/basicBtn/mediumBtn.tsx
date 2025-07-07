import type { ButtonWithTextProps } from '../../../types/button';

/**
 *
 * @param title 버튼 이름
 * @param onClick 버튼 클릭 핸들러
 * @param round 버튼 모양 (true일 경우 rounded-full 적용)
 * @returns
 */
const MediumBtn = ({ title, onClick, round = false }: ButtonWithTextProps) => {
  return (
    <button
      className={`active:bg-primary_hover bg-primary text-background md:hover:bg-primary_hover md:active:bg-primary_pressed w-[266px] py-4 text-sm font-semibold md:w-[256px] md:py-[18px] md:text-base ${round ? 'rounded-full' : 'rounded-lg'}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default MediumBtn;
