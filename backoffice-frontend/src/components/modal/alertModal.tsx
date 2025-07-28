import { useEffect, useState } from 'react';
import closeIcon from '../../assets/icons/close.svg';
import PlusIcon from '../../assets/icons/plus_round.svg';
import deleteIcon from '../../assets/icons/close_round.svg';

import SmallBtn from '../button/basicBtn/smallBtn';
import RadioBtn from '../button/radioBtn';
import CustomInput from '../input/customInput';
import CustomTextArea from '../textArea/customTextArea';
import Alert from '../alert/alert';

type AlertModalProps = {
  visible: boolean;
  onClose: () => void;
};

const AlertModal = ({ visible, onClose }: AlertModalProps) => {
  if (!visible) return null;

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [target, setTarget] = useState<'all' | 'admin' | null>('all');

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file.name));
    // if (validFiles.length + images.length > 10) {
    //   alert('최대 10장까지만 업로드 가능합니다.');
    //   return;
    // }
    setImages((prev) => [...prev, ...validFiles]);
  };

  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      setAlertMessage('제목을 입력해주세요.');
      return;
    }
    if (!target) {
      setAlertMessage('알림 대상을 선택해주세요.');
      return;
    }
    if (!description.trim()) {
      setAlertMessage('알림 내용을 입력해주세요.');
      return;
    }

    console.log({
      title,
      target,
      description,
      images,
    });

    onClose();
  };

  useEffect(() => {
    if (alertMessage) {
      const timeout = setTimeout(() => {
        setAlertMessage(null);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [alertMessage]);

  return (
    <div className='bg-black_50 fixed inset-0 z-40 flex items-center transition-opacity duration-500'>
      <div
        className='bg-background flex h-4/5 w-[760px] flex-col rounded-2xl p-5'
        style={{
          position: 'absolute',
          left: 'calc(50% + 140px)',
          transform: 'translateX(-50%)',
        }}
      >
        {/* 헤더 */}
        <div className='border-menuborder mb-5 flex items-center justify-between border-b pb-5'>
          <h1 className='text-text1 text-h1_contents_title'>알림 등록하기</h1>
          <img
            src={closeIcon}
            alt='닫기'
            className='h-6 w-6 cursor-pointer'
            onClick={onClose}
          />
        </div>

        {/* 본문 */}
        <div className='flex-grow overflow-y-auto pr-1'>
          <div className='flex flex-col gap-7'>
            {/* 제목 */}
            <div className='flex flex-col gap-[18px]'>
              <h3 className='text-text1 text-h3'>
                제목 <span className='text-h3 text-noti'>*</span>
              </h3>
              <div className='flex flex-col gap-2'>
                <CustomInput
                  value={title}
                  placeholder='알림 제목을 입력하세요.'
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            {/* 알림 대상 */}
            <div className='flex flex-col gap-[18px]'>
              <h3 className='text-text1 text-h3'>
                알림 대상 <span className='text-h3 text-noti'>*</span>
              </h3>
              <div className='flex gap-2.5'>
                <RadioBtn
                  label='모든 유저'
                  isChecked={target === 'all'}
                  onClick={() => setTarget('all')}
                />
                <RadioBtn
                  label='동아리 관리자'
                  isChecked={target === 'admin'}
                  onClick={() => setTarget('admin')}
                />
              </div>
            </div>

            {/* 이미지 첨부 */}
            <div className='flex flex-col gap-[18px]'>
              <div className='flex flex-col gap-2.5'>
                <h3 className='text-text1 text-h3'>이미지 첨부</h3>
                <div className='flex flex-wrap gap-3'>
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className='relative h-[120px] w-[120px] overflow-hidden rounded-lg'
                    >
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`첨부 이미지 ${idx + 1}`}
                        className='h-full w-full rounded-lg object-cover'
                      />
                      <img
                        src={deleteIcon}
                        alt='삭제'
                        className='absolute top-1 right-1 h-5 w-5 cursor-pointer'
                        onClick={() => handleImageRemove(idx)}
                      />
                    </div>
                  ))}
                  {images.length < 10 && (
                    <label className='flex h-[120px] w-[120px] cursor-pointer items-center justify-center'>
                      <input
                        type='file'
                        accept='.jpg,.jpeg,.png,.gif'
                        multiple
                        onChange={handleImageAdd}
                        className='hidden'
                      />
                      <img
                        src={PlusIcon}
                        alt='추가'
                        className='h-[60px] w-[60px]'
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* 내용 */}
            <div className='flex flex-col gap-[18px]'>
              <h3 className='text-text1 text-h3'>
                알림 내용 <span className='text-h3 text-noti'>*</span>
              </h3>
              <CustomTextArea
                value={description}
                placeholder='알림 내용을 입력하세요.'
                onChange={(e) => setDescription(e.target.value)}
                maxLength={3000}
              />
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className='flex justify-end pt-6 pb-1'>
          <div className='flex items-center gap-8'>
            <p className='text-unselected text-h4'>{description.length}/3000</p>
            <SmallBtn
              title='등록하기'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>

      {/* 알림 메시지 */}
      {alertMessage && <Alert text={alertMessage} />}
    </div>
  );
};

export default AlertModal;
