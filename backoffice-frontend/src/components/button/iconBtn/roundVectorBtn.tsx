'use client';

import vector from '../../../assets/icons/arrow_right.svg';
import type { ButtonProps } from '../../../types/button';

interface RoundVectorBtnProp extends ButtonProps {
  btnSize?: 'small' | 'large';
}

const RoundVectorBtn = ({
  imageSize = 36,
  className,
  onClick,
  btnSize = 'large',
}: RoundVectorBtnProp) => {
  return (
    <button
      className={`${className} flex items-center justify-center ${
        btnSize === 'large' ? 'p-3' : 'p-0'
      } border-menuborder bg-background hover:bg-hover active:bg-pressed cursor-pointer rounded-full border`}
      onClick={onClick}
    >
      <img
        src={vector}
        alt={'vector'}
        width={imageSize}
        height={imageSize}
      />
    </button>
  );
};

export default RoundVectorBtn;
