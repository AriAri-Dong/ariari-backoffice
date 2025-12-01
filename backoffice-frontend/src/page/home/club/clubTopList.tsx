type ClubItem = {
  name: string;
  rate: number;
};

type ClubTopListProps = {
  title: string;
  list: ClubItem[];
  loading: boolean;
  errorMsg: string | null;
};

export default function ClubTopList({ title, list, loading, errorMsg }: ClubTopListProps) {
  return (
    <div>
      <h2 className='text-h4_sb text-text1 border-menuborder border-b pb-1'>{title}</h2>

      <div className='mt-5 flex flex-col gap-2'>
        {loading ? (
          <div className='text-body2_r text-subtext2 flex h-[120px] items-center justify-center'>
            불러오는 중...
          </div>
        ) : errorMsg ? (
          <div className='text-body2_r flex h-[120px] items-center justify-center text-red-500'>
            {errorMsg}
          </div>
        ) : list.length === 0 ? (
          <div className='text-body2_r text-subtext2 flex h-[120px] items-center justify-center'>
            데이터가 없습니다.
          </div>
        ) : (
          list.map((club, i) => (
            <div
              key={`${club.name}-${i}`}
              className='flex items-center justify-between'
            >
              <div className='flex items-center gap-[9px]'>
                <span className='text-primary bg-selectedoption_hover text-body3_m flex h-6 w-6 items-center justify-center rounded-sm'>
                  {i + 1}
                </span>
                <span className='group relative'>
                  {/* 요약 표시 */}
                  <span className='text-subtext1 text-body3_r'>
                    {club.name.length > 5 ? `${club.name.slice(0, 4)}…` : club.name}
                  </span>

                  {/* hover 시 나타나는 전체 이름 */}
                  <span className='pointer-events-none absolute top-full left-1/2 z-10 mt-1 -translate-x-1/2 rounded-md bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100'>
                    {club.name}
                  </span>
                </span>
              </div>
              <span className='text-body3_sb text-text1'>
                {club.rate
                  ? Number(
                      Number(club.rate)
                        .toFixed(2) // 반올림
                        .replace(/\.?0+$/, ''), // .00, .0, 0 제거
                    )
                  : '0'}
                %
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
