import { useEffect, useState } from 'react';
import closeIcon from '../../../assets/icons/close.svg';
import type { QnaDetail } from '../../../types/report';

import { QNA_DATA } from '../../../data/report';
import CustomInput from '../../input/customInput';

type ModalProps = {
  visible: boolean;
  onClose: () => void;
};

const QnaModal = ({ visible, onClose }: ModalProps) => {
  if (!visible) return null;

  const [data, setData] = useState<QnaDetail>();

  useEffect(() => {
    setData(QNA_DATA);
  }, [QNA_DATA]);

  return (
    <div className='bg-black_50 fixed inset-0 z-40 flex items-center transition-opacity duration-500'>
      <div
        className='flex w-[760px] flex-col gap-3'
        style={{
          position: 'absolute',
          left: 'calc(50% + 140px)',
          transform: 'translateX(-50%)',
        }}
      >
        {/* Title */}
        <div className='bg-background flex items-center justify-between rounded-full px-5 py-3'>
          <h1 className='text-primary text-h3'>
            {'동아리 이름'}
            <span className='text-subtext2 text-body2_r ml-2'>{'Q&A'}</span>
          </h1>
          <img
            src={closeIcon}
            alt='닫기'
            className='h-6 w-6 cursor-pointer'
            onClick={onClose}
          />
        </div>
        {/* Body */}

        <div className='flex w-full flex-col justify-between rounded-2xl bg-white p-5 md:flex-row md:gap-[56px]'>
          <div className='mt-8 flex w-full flex-col gap-5 md:mt-0 md:max-h-none'>
            <div>
              <h3 className='text-h3 md:text-h4_sb text-text1 mb-2.5 hidden md:block'>Q&A 제목</h3>
              <CustomInput
                value={data?.title || ''}
                placeholder='작성된 답변'
                disable={true}
                onChange={() => {}}
              />
            </div>
            <div>
              <h3 className='text-h3 md:text-h4_sb text-text1 mb-2.5 hidden md:block'>질문</h3>
              <CustomInput
                value={data?.question || ''}
                placeholder=''
                disable={true}
                onChange={() => {}}
              />
            </div>
            <div>
              <h3 className='text-h3 md:text-h4_sb text-text1 mb-2.5 hidden md:block'>답변</h3>
              <CustomInput
                value={data?.answer || ''}
                placeholder=''
                disable={true}
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QnaModal;
