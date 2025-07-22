import SearchIcon from '../assets/icons/search.svg';

type SearchbarProps = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

const Searchbar = ({ value, placeholder = '검색어를 입력하세요', onChange }: SearchbarProps) => {
  return (
    <div className='relative inline-block'>
      <div className='bg-background border-menuborder flex items-center gap-3 rounded-full border py-2.5 pr-[14px] pl-5'>
        <img
          src={SearchIcon}
          alt='돋보기'
          className='h-6 w-6'
        />
        <input
          type='text'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className='text-body1_m placeholder:text-subtext2 w-full bg-transparent text-black outline-none'
        />
      </div>
    </div>
  );
};

export default Searchbar;
