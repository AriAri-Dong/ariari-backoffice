import { useEffect, useState } from 'react';
import closeIcon from '../../../assets/icons/close.svg';
import type { RecruitmentData } from '../../../types/report';

import { RECRUITMENTDATA } from '../../../data/report';

import defaultImgBg from '../../../assets/icons/defaultAriariBg.svg';
import formatDateToDot from '../../../utils/formatDate';

type ModalProps = {
  visible: boolean;
  onClose: () => void;
};

const RecruitmentModal = ({ visible, onClose }: ModalProps) => {
  if (!visible) return null;

  const [recruitmentData, setData] = useState<RecruitmentData>();

  useEffect(() => {
    setData(RECRUITMENTDATA);
  }, [RECRUITMENTDATA]);

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
            <span className='text-subtext2 text-body2_r ml-2'>모집공고</span>
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
          <div className='flex w-full items-center justify-center'>
            <div className='sm_md:flex-row sm_md:gap-[27px] lg:max-w-screen-lx mt-2 flex w-full max-w-screen-sm flex-col px-4 sm:max-w-screen-md md:max-w-screen-lg md:flex-row md:gap-14 md:px-5 md:pt-8 md:pb-10'>
              <div className='w-full max-w-[792px]'>
                <img
                  src={recruitmentData?.posterUri || defaultImgBg}
                  alt={'main_image'}
                  width={792}
                  height={792}
                  className='rounded-48 aspect-[1/1] object-cover'
                />
              </div>
              <div>
                <div className='border-menuborder sm_md:w-[350px] mt-6 mb-6 border-t md:hidden' />
                <div className='flex flex-col md:pt-[6px]'>
                  {/* PC 화면 */}
                  <div className='hidden md:block'>
                    <h1 className='text-h1_contents_title md:mt-8 md:mb-12'>
                      {recruitmentData?.title}
                    </h1>
                    <div className='border-menuborder mt-8 mb-7 border-t' />
                    <div className='felx text-subtext1 space-y-[14px]'>
                      <div className='flex flex-row gap-[65px]'>
                        <p className='text-mobile_body2_sb md:text-body1_m w-[56px]'>모집 인원</p>
                        <p className='text-mobile_body2_r md:text-body1_m'>
                          {recruitmentData?.limits}명
                        </p>
                      </div>
                      <div className='flex flex-row gap-[65px]'>
                        <p className='text-mobile_body2_sb md:text-body1_m w-[56px]'>모집 절차</p>
                        <p className='text-mobile_body2_r md:text-body1_m'>
                          {recruitmentData?.procedureType == 'DOCUMENT' ? '서류' : '서류/면접'}
                        </p>
                      </div>
                      <div className='flex flex-row gap-[65px]'>
                        <p className='text-mobile_body2_sb md:text-body1_m w-[56px]'>모집 기간</p>
                        <p className='text-mobile_body2_r md:text-body1_m'>
                          {formatDateToDot(recruitmentData?.startDateTime)} ~
                          {formatDateToDot(recruitmentData?.endDateTime)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentModal;
