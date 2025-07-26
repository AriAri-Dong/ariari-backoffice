import CalendarIcon from '../assets/icons/calendar.svg';

const Calendar = () => {
  return (
    <div className='bg-background border-menuborder flex cursor-pointer items-center gap-3 rounded-full border py-2.5 pr-[14px] pl-5'>
      <p className='text-body1_m text-subtext1'>조회 기간</p>
      <img
        src={CalendarIcon}
        alt='달력'
        className='h-6 w-6'
      />
    </div>
  );
};

export default Calendar;
