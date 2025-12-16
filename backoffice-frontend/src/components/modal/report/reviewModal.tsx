import closeIcon from '../../../assets/icons/close.svg';

import ReviewBadgeContainer from '../../badge/reviewBadgeComtainer';
import { useEffect, useState } from 'react';
import type { ClubReviewDetail } from '../../../types/report';
import { CLUB_REVIEW_DATA } from '../../../data/report';

type ModalProps = {
  visible: boolean;
  onClose: () => void;
};

const ClubReviewModal = ({ visible,  onClose }: ModalProps) => {
  if (!visible) return null;

  const [data, setData] = useState<ClubReviewDetail>();

  useEffect(() => {
    setData(CLUB_REVIEW_DATA);
  }, [CLUB_REVIEW_DATA]);


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
            <span className='text-subtext2 text-body2_r ml-2'>{'활동 후기'}</span>
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
              <h3 className='text-h3 md:text-h4_sb text-text1 mb-2.5 hidden md:block'>
                {data?.title}
              </h3>
              <div className='text-body1_r text-subtext1 h-50'>{data?.body}</div>
            </div>
            <ReviewBadgeContainer
              tags={data?.tagDataList || []}
              selectedTags={[]}
              onTagSelect={() => {}}
            />
            <div className='text-body2_m text-unselected'>{data?.nickname}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubReviewModal;
