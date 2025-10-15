interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disable?: boolean;
  maxLength?: number;
}

const CustomInput = ({
  value,
  placeholder,
  onChange,
  className = '',
  disable = false,
  maxLength,
  ...rest
}: InputProps) => (
  <input
    type='text'
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    maxLength={maxLength}
    className={`bg-searchbar placeholder-subtext2 text-body1_r w-full rounded-xl px-[22px] py-[14px] text-black focus:outline-none ${className} ${disable ? 'cursor-pointer' : 'cursor-default'}`}
    disabled={disable}
    {...rest}
  />
);

export default CustomInput;
