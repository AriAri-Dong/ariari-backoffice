import { useEffect, useState } from 'react';
import closeIcon from '../../assets/icons/close.svg';

import SmallBtn from '../button/basicBtn/smallBtn';
import CustomInput from '../input/customInput';
import CustomTextArea from '../textArea/customTextArea';
import Alert from '../alert/alert';
import Dropdown from '../dropdown/dropdown';
import type { FaqCategory, FaqListItem, TokenColor } from '../../types/api/faq';
import { createFaq, updateFaq } from '../../apis/operate/faqApi';

// Define the available categories
const categoryOptions = [
  { label: 'ACCOUNT', value: 'ACCOUNT' },
  { label: 'CLUB', value: 'CLUB' },
  { label: 'DATA', value: 'DATA' },
  { label: 'GENERAL', value: 'GENERAL' },
  { label: 'LOGIN', value: 'LOGIN' },
  { label: 'MAINTENANCE', value: 'MAINTENANCE' },
  { label: 'POLICY', value: 'POLICY' },
  { label: 'SECURITY', value: 'SECURITY' },
  { label: 'SERVICE', value: 'SERVICE' },
  { label: 'TECHNICAL', value: 'TECHNICAL' },
  { label: 'UPDATE', value: 'UPDATE' },
];

type FaqModalProps = {
  visible: boolean;
  onClose: () => void;
  mode?: 'create' | 'edit';
  initialData?: FaqListItem;
};

const FaqModal = ({ visible, onClose, mode = 'create', initialData }: FaqModalProps) => {
  if (!visible) return null;

  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<FaqCategory | null>(null); // Change to FaqCategory | null
  const [tokenColor, setTokenColor] = useState<TokenColor>('RED');
  const [description, setDescription] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Initialize the form with existing data if the mode is 'edit'
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setTitle(initialData.title);
      setCategory(initialData.category); // Set category
      setTokenColor(initialData.tokenColor);
      setDescription(initialData.description);
    }
  }, [mode, initialData]);

  const handleColorChange = (color: TokenColor) => {
    setTokenColor(color);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      setAlertMessage('제목을 입력해주세요.');
      return;
    }
    if (!category) {
      setAlertMessage('분류를 선택해주세요.');
      return;
    }
    if (!description.trim()) {
      setAlertMessage('FAQ 내용을 입력해주세요.');
      return;
    }

    const payload = {
      title,
      category,
      tokenColor,
      description,
    };

    try {
      if (mode === 'edit' && initialData?.id) {
        // Call the update FAQ API
        const response = await updateFaq(initialData.id, payload);
        if (response.status === 'success') {
          setAlertMessage('FAQ가 성공적으로 수정되었습니다.');
        } else {
          setAlertMessage('수정 실패! 다시 시도해주세요.');
        }
      } else {
        // Call the create FAQ API
        const response = await createFaq(payload);
        if (response.status === 'success') {
          setAlertMessage('FAQ가 성공적으로 등록되었습니다.');
        } else {
          setAlertMessage('등록 실패! 다시 시도해주세요.');
        }
      }
      onClose(); // Close the modal after successful API call
    } catch (error) {
      console.error(error);
      setAlertMessage('에러가 발생했습니다. 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    if (alertMessage) {
      const timeout = setTimeout(() => {
        setAlertMessage(null);
      }, 2000);
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
        {/* Header */}
        <div className='border-menuborder mb-5 flex items-center justify-between border-b pb-5'>
          <h1 className='text-text1 text-h1_contents_title'>
            {mode === 'edit' ? 'FAQ 수정하기' : 'FAQ 작성하기'}
          </h1>
          <img
            src={closeIcon}
            alt='닫기'
            className='h-6 w-6 cursor-pointer'
            onClick={onClose}
          />
        </div>

        {/* Body */}
        <div className='flex-grow overflow-y-auto pr-1'>
          <div className='flex flex-col gap-7'>
            {/* Title */}
            <div className='flex flex-col gap-[18px]'>
              <h3 className='text-text1 text-h3'>
                FAQ 제목 <span className='text-h3 text-noti'>*</span>
              </h3>
              <CustomInput
                value={title}
                placeholder='FAQ 제목을 입력하세요.'
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Category */}

            <div className='flex flex-col gap-[18px]'>
              <h3 className='text-text1 text-h3'>
                FAQ 분류 <span className='text-h3 text-noti'>*</span>
              </h3>
              <div className='flex gap-5'>
                <Dropdown
                  options={categoryOptions}
                  value={category ? category : ''} // Set dropdown value to category, empty string if null
                  onChange={(option) => setCategory(option.value as FaqCategory)} // Update category state with FaqCategory
                />
                <div className='border-menuborder flex gap-2.5 rounded-full border px-5 py-3'>
                  <p className='text-subtext1 text-body2_m whitespace-nowrap'>컬러</p>
                  <div className='flex gap-2'>
                    {(
                      [
                        { key: 'RED', color: 'var(--color-token_1)' },
                        { key: 'YELLOW', color: 'var(--color-token_2)' },
                        { key: 'GREEN', color: 'var(--color-token_3)' },
                        { key: 'SKYBLUE', color: 'var(--color-token_4)' },
                        { key: 'BLUE', color: 'var(--color-primary)' },
                        { key: 'PRUPLE', color: 'var(--color-token_6)' },
                        { key: 'PINK', color: 'var(--color-token_7)' },
                      ] as const
                    ).map((color) => (
                      <p
                        key={color.key}
                        onClick={() => handleColorChange(color.key)}
                        className={`h-5 w-5 cursor-pointer rounded-full ${
                          tokenColor === color.key ? 'bg-background border-6' : ''
                        }`}
                        style={{
                          backgroundColor:
                            tokenColor === color.key ? 'var(--color-background)' : color.color,
                          borderColor: tokenColor === color.key ? color.color : 'transparent',
                          borderStyle: 'solid',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className='flex flex-col gap-[18px]'>
              <h3 className='text-text1 text-h3'>
                FAQ 상세 <span className='text-h3 text-noti'>*</span>
              </h3>
              <CustomTextArea
                value={description}
                placeholder='자주 묻는 질문, 혹은 질문이 예상되는 내용을 작성해 주세요'
                onChange={(e) => setDescription(e.target.value)}
                maxLength={3000}
                className='min-h-52'
              />
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className='flex justify-end pt-6 pb-1'>
          <div className='flex items-center gap-8'>
            <p className='text-unselected text-h4'>{description.length}/3000</p>
            <SmallBtn
              title={mode === 'edit' ? '수정하기' : '등록하기'}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>

      {/* Alert Message */}
      {alertMessage && <Alert text={alertMessage} />}
    </div>
  );
};

export default FaqModal;
