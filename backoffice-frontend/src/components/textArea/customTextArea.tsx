interface TextAreaProps {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
}

const CustomTextArea = ({
  value,
  placeholder,
  onChange,
  className = '',
  disabled = false,
  maxLength,
}: TextAreaProps) => (
  <textarea
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    className={`bg-searchbar text-body1_r w-full rounded-xl p-3 text-black focus:outline-none md:px-[22px] md:py-[14px] ${className} ${disabled ? 'cursor-not-allowed' : 'cursor-default'}`}
    disabled={disabled}
    maxLength={maxLength}
  />
);

export default CustomTextArea;
