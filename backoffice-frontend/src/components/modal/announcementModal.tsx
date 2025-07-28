import { useEffect, useState } from 'react';
import closeIcon from '../../assets/icons/close.svg';
import PlusIcon from '../../assets/icons/plus_round.svg';
import deleteIcon from '../../assets/icons/close_round.svg';

import SmallBtn from '../button/basicBtn/smallBtn';
import RadioBtn from '../button/radioBtn';
import Calendar from '../calendar';
import CustomInput from '../input/customInput';
import CustomTextArea from '../textArea/customTextArea';
import Alert from '../alert/alert';

type AnnouncementModalData = {
  title: string;
  popupEnabled: boolean;
  popupOption: boolean;
  dateRange: [Date | null, Date | null];
  description: string;
  images: File[];
  postStatus: 'posted' | 'unposted';
};

type AnnouncementModalProps = {
  visible: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  initialData?: AnnouncementModalData;
};

const AnnouncementModal = ({ visible, onClose, mode, initialData }: AnnouncementModalProps) => {
  if (!visible) return null;

  const isEditMode = mode === 'edit';

  const [title, setTitle] = useState<string>(initialData?.title || '');
  const [popupEnabled, setPopupEnabled] = useState<boolean>(initialData?.popupEnabled || false);
  const [popupOption, setPopupOption] = useState<boolean>(initialData?.popupOption || false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(
    initialData?.dateRange || [null, null],
  );
  const [description, setDescription] = useState<string>(initialData?.description || '');
  const [images, setImages] = useState<File[]>(initialData?.images || []);
  const [postStatus, setPostStatus] = useState<'posted' | 'unposted'>(
    initialData?.postStatus || 'posted',
  );
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file.name));
    if (validFiles.length + images.length > 10) {
      alert('최대 10장까지만 업로드 가능합니다.');
      return;
    }
    setImages((prev) => [...prev, ...validFiles]);
  };

  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      setAlertMessage('공지사항 제목을 입력해주세요.');
      return;
    }
    if (popupEnabled && (!dateRange[0] || !dateRange[1])) {
      setAlertMessage('팝업 기간을 설정해주세요.');
      return;
    }
    if (!description.trim()) {
      setAlertMessage('공지사항 상세를 입력해주세요.');
      return;
    }

    console.log({
      title,
      popupEnabled,
      popupOption,
      dateRange,
      description,
      images,
      postStatus,
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
          <h1 className='text-text1 text-h1_contents_title'>
            {isEditMode ? '공지사항 수정하기' : '공지사항 작성하기'}
          </h1>
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
                공지사항 제목 <span className='text-h3 text-noti'>*</span>
              </h3>
              <div className='flex flex-col gap-2'>
                <CustomInput
                  value={title}
                  placeholder='공지사항 제목을 입력하세요.'
                  onChange={(e) => setTitle(e.target.value)}
                />
                <RadioBtn
                  label='해당 공지사항을 팝업으로 등록하기'
                  isChecked={popupEnabled}
                  onClick={() => setPopupEnabled((prev) => !prev)}
                />
              </div>
            </div>

            {/* 팝업 설정 */}
            {popupEnabled && (
              <div className='flex flex-col gap-[18px]'>
                <h3 className='text-text1 text-h3'>
                  팝업 설정 <span className='text-h3 text-noti'>*</span>
                </h3>
                <div className='flex items-center gap-4'>
                  <RadioBtn
                    label='하루 동안 보지 않기 표시'
                    isChecked={popupOption}
                    onClick={() => setPopupOption((prev) => !prev)}
                  />
                  <Calendar
                    startDate={dateRange[0]}
                    endDate={dateRange[1]}
                    onChange={(range) => setDateRange(range)}
                  />
                </div>
              </div>
            )}

            {/* 이미지 첨부 */}
            <div className='flex flex-col gap-[18px]'>
              <div className='flex flex-col gap-2.5'>
                <h3 className='text-text1 text-h3'>이미지 첨부</h3>
                <p className='text-subtext2 text-body_r'>
                  이미지는 최대 10장까지 첨부할 수 있어요. (JPEG / PNG / GIF)
                </p>
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

            {/* 상세 */}
            <div className='flex flex-col gap-[18px]'>
              <h3 className='text-text1 text-h3'>
                공지사항 상세 <span className='text-h3 text-noti'>*</span>
              </h3>
              <CustomTextArea
                value={description}
                placeholder='공지사항 상세를 입력하세요.'
                onChange={(e) => setDescription(e.target.value)}
                maxLength={300}
              />
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className='flex justify-between pt-6 pb-1'>
          <div className='flex gap-5'>
            <RadioBtn
              label='게시'
              isChecked={postStatus === 'posted'}
              onClick={() => setPostStatus('posted')}
            />
            <RadioBtn
              label='미게시'
              isChecked={postStatus === 'unposted'}
              onClick={() => setPostStatus('unposted')}
            />
          </div>
          <div className='flex items-center gap-8'>
            <p className='text-unselected text-h4'>{description.length}/300</p>
            <SmallBtn
              title={isEditMode ? '수정하기' : '등록하기'}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      {alertMessage && <Alert text={alertMessage} />}
    </div>
  );
};

export default AnnouncementModal;
