type ClubItem = {
  name: string;
  rate: number;
};

type ClubTopListProps = {
  title: string;
  list: ClubItem[];
};

export default function ClubTopList({ title, list }: ClubTopListProps) {
  return (
    <div>
      <h2 className='text-h4_sb text-text1 border-menuborder border-b pb-1'>{title}</h2>
      <div className='mt-5 flex flex-col gap-2'>
        {list.map((club, i) => (
          <div
            key={i}
            className='flex items-center justify-between'
          >
            <div className='flex items-center gap-[9px]'>
              <span className='text-primary bg-selectedoption_hover text-body3_m flex h-6 w-6 items-center justify-center rounded-sm'>
                {i + 1}
              </span>
              <span className='text-subtext1 text-body3_r'>{club.name}</span>
            </div>
            <span className='text-body3_sb text-text1'>{club.rate}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
