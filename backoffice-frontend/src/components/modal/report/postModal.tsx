import { useEffect, useState } from 'react';
import closeIcon from '../../../assets/icons/close.svg';
import type { ClubActivityDetail } from '../../../types/report';

import { ACTIVITY_REVIEW_DATA } from '../../../data/report';
import defaultImg from '../../../assets/icons/defaultAriari.svg';
import { useSwipeable } from 'react-swipeable';

import formatDateToDot from '../../../utils/formatDate';
import RoundVectorBtn from '../../button/iconBtn/roundVectorBtn';

type ModalProps = {
  visible: boolean;
  onClose: () => void;
};

const PostModal = ({ visible, onClose }: ModalProps) => {
  if (!visible) return null;

  const [data, setData] = useState<ClubActivityDetail>();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const [isFirstSlide, setFirstSlide] = useState<boolean>(false);
  const [isLastSlide, setLastSlide] = useState<boolean>(false);

  useEffect(() => {
    setData(ACTIVITY_REVIEW_DATA);
    setFirstSlide(currentImageIndex === 0);
    setLastSlide(currentImageIndex === ACTIVITY_REVIEW_DATA?.images.length - 1);
  }, [ACTIVITY_REVIEW_DATA]);

  // 이미지 슬라이드 관련
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentImageIndex((prev) => Math.min(prev + 1, (data?.images?.length ?? 1) - 1)),
    onSwipedRight: () => setCurrentImageIndex((prev) => Math.max(prev - 1, 0)),
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
  });

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

        <div className='w-full flex-col justify-between rounded-2xl bg-white p-5 md:gap-[56px]'>
          <div className='flex justify-between'>
            <div className='flex items-center gap-[14px]'>
              <img
                src={defaultImg}
                alt={'프로필이미지'}
                width={44}
                height={44}
                className='cursor-pointer rounded-full object-cover md:h-[44px] md:w-[44px]'
              />
              <div>
                <p className='text-mobile_body1_m text-subtext2 md:text-h4'>
                  {data?.clubMember.name}
                </p>
                <div className='flex items-center gap-1'>
                  <p className='text-mobile_body4_r text-subtext2 md:text-body4_r'>
                    {formatDateToDot(data?.createdDateTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* 이미지 슬라이드 */}
          {data?.images && data?.images.length > 0 && (
            <div
              {...handlers}
              className='relative mt-3 w-full md:mt-7'
            >
              <div
                className='relative w-full'
                style={{ paddingTop: '56.25%' }}
              >
                <img
                  src={data?.images[currentImageIndex]}
                  alt={`image-${currentImageIndex + 1}`}
                  //   layout='fill'
                  //   objectFit='contain'
                  className='absolute top-0 left-0 h-full w-full rounded-lg'
                />
              </div>

              {/* 좌우 버튼 */}

              <>
                {!isFirstSlide && (
                  <RoundVectorBtn
                    className='absolute top-1/2 left-4 -translate-y-1/2 rotate-180'
                    imageSize={30}
                    onClick={() => setCurrentImageIndex((prev) => prev - 1)}
                  />
                )}
                {!isLastSlide && (
                  <RoundVectorBtn
                    className='absolute top-1/2 right-4 -translate-y-1/2'
                    imageSize={30}
                    onClick={() => setCurrentImageIndex((prev) => prev + 1)}
                  />
                )}
              </>

              <div className='bg-white70 rounded-12 absolute bottom-2 left-1/2 -translate-x-1/2 transform px-2 py-1 backdrop-blur-sm'>
                <p className='text-mobile_body3_r text-subtext2 text-center'>
                  {currentImageIndex + 1} / {data.images.length}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostModal;
