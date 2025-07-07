import type { ButtonWithTextProps } from '../../../types/button';

/**
 *
 * @param title 버튼 이름
 * @param onClick 버튼 클릭 핸들러
 * @param round 버튼 모양 (true일 경우 rounded-full 적용)
 * @returns
 */
const TransparentLargeBtn = ({ title, onClick, round = false }: ButtonWithTextProps) => {
  return (
    <button
      className={`text-primary border-primary active:bg-selectedoption_hover bg-selectedoption_default md:hover:bg-selectedoption_hover md:active:bg-selectedoption_pressed border py-4 text-sm font-semibold md:py-[18px] md:text-base ${round ? 'rounded-full' : 'rounded-lg'} w-full`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default TransparentLargeBtn;
