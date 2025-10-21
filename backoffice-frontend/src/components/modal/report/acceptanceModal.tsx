import { useEffect, useState } from 'react';
import closeIcon from '../../../assets/icons/close.svg';
import type { PassReviewDetail } from '../../../types/report';
import {
  getInterviewRatioLabel,
  getInterviewTypeLabel,
  getProcedureTypeLabel,
} from '../../../utils/getReviewLabel';
import { ACTIVITY_DATA } from '../../../data/report';
import ProgressBar from '../../bar/progressBar';
import ReviewField from '../../input/reviewFeild';

type ModalProps = {
  visible: boolean;
  onClose: () => void;
};

const AcceptanceModal = ({ visible, onClose }: ModalProps) => {
  if (!visible) return null;

  const [isInterview, setIsInterview] = useState<boolean>(false);
  const [data, setData] = useState<PassReviewDetail>();

  useEffect(() => {
    setData(ACTIVITY_DATA);
    setIsInterview(ACTIVITY_DATA?.procedureType === 'INTERVIEW');
  }, [ACTIVITY_DATA]);

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
            <span className='text-subtext2 text-body2_r ml-2'>{'합격후기'}</span>
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
          <div className='grid w-full grid-cols-3 justify-between md:w-[183px] md:grid-cols-1 md:justify-normal md:gap-[44px]'>
            {(isInterview ? ['합격전형', '면접방식', '면접인원'] : ['합격전형']).map(
              (label, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-2.5 md:gap-[14px] ${index === 1 && 'items-center'} ${index === 2 && 'items-end'} md:items-start`}
                >
                  <h3 className='text-mobile_body1_sb md:text-h4_sb text-text1'>{label}</h3>
                  <p className='text-subtext2 text-mobile_body1_r md:text-body2_m'>
                    {index === 0
                      ? getProcedureTypeLabel(data?.procedureType)
                      : index === 1
                        ? getInterviewTypeLabel(data?.interviewType)
                        : getInterviewRatioLabel(data?.interviewRatioType)}
                  </p>
                </div>
              ),
            )}

            {isInterview && (
              <div className='mb-6 hidden flex-col md:flex md:gap-[14px]'>
                <h3 className='text-mobile_body1_sb md:text-h4_sb text-text1'>면접분위기</h3>
                <ProgressBar
                  disabled={true}
                  currentStep={data?.interviewMood}
                />
              </div>
            )}
          </div>

          <div className='mt-8 flex w-full flex-col gap-7 md:mt-0 md:max-h-none md:gap-10'>
            <div>
              <h3 className='text-body1_m md:text-h4_sb text-text1 mb-6 hidden md:block'>
                서류 문항
              </h3>
              <div className='no-scrollbar flex flex-col gap-6 md:max-h-[380px] md:overflow-y-auto'>
                {data?.documentNotes.map((note, idx) => (
                  <div key={idx}>
                    <ReviewField
                      note={note}
                      title={'문항'}
                      idx={idx + 1}
                    />
                  </div>
                ))}
              </div>
            </div>
            {isInterview && (
              <div>
                <h3 className='text-body1_m md:text-h4_sb text-text1 mb-6 hidden md:block'>
                  면접 질문
                </h3>
                <div className='no-scrollbar flex flex-col md:max-h-[380px] md:overflow-y-auto'>
                  {data?.interviewNotes.map((note, idx) => (
                    <div key={idx}>
                      <ReviewField
                        note={note}
                        title={'질문'}
                        idx={idx + 1}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptanceModal;
