import type { ButtonHTMLAttributes } from 'react';

export type SmallBtnProps = {
  title: string;
  onClick?: () => void | Promise<void>; // async도 허용 + 선택적으로
  round?: boolean;
  className?: string;
  disabled?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'className' | 'title'>;

/**
 *
 * @param title 버튼 이름
 * @param onClick 버튼 클릭 핸들러
 * @param round 버튼 모양 (true일 경우 rounded-full 적용)
 * @param className 추가 style class
 * @param disabled 비활성화 여부
 */
const SmallBtn = ({
  title,
  onClick,
  round = false,
  className = '',
  disabled = false,
  ...rest
}: SmallBtnProps) => {
  return (
    <button
      type='button'
      {...rest}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={[
        'text-body1_sb cursor-pointer px-[22px] py-[13px] whitespace-nowrap',
        round ? 'rounded-full' : 'rounded-lg',
        disabled
          ? 'text-background cursor-not-allowed bg-gray-400'
          : 'bg-primary text-background active:bg-primary_hover md:hover:bg-primary_hover md:active:bg-primary_pressed',
        className,
      ].join(' ')}
    >
      {title}
    </button>
  );
};

export default SmallBtn;
