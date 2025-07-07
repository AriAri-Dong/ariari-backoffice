import logo from '../../assets/icons/logo.svg';
import home from '../../assets/icons/layout/home.svg';
import homeActive from '../../assets/icons/layout/home_active.svg';
import operate from '../../assets/icons/layout/operate.svg';
import operateActive from '../../assets/icons/layout/operate_active.svg';
import report from '../../assets/icons/layout/report.svg';
import data from '../../assets/icons/layout/data.svg';
import crud from '../../assets/icons/layout/crud.svg';
import logout from '../../assets/icons/logout.svg';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { path: '/', label: '홈', icon: home, activeIcon: homeActive },
  { path: '/operate', label: '운영', icon: operate, activeIcon: operateActive },
  { path: '/report', label: '신고', icon: report },
  { path: '/data', label: '데이터 조회/삭제', icon: data },
  { path: '/crud', label: 'CRUD', icon: crud },
];

const LeftMenu = () => {
  const location = useLocation();

  return (
    <aside className='flex h-screen w-60 flex-col justify-between border-r border-gray-200 bg-white'>
      <div>
        <img
          src={logo}
          alt='logo'
          className='h-[29px] w-[100px]'
        />
        <nav className='flex flex-col gap-2 px-4'>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-500' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <img
                  src={isActive && item.activeIcon ? item.activeIcon : item.icon}
                  alt={item.label}
                  className='h-5 w-5'
                />
                <span className='text-sm'>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className='flex items-center justify-between p-4 text-sm text-gray-500'>
        <div className='flex items-center gap-2'>
          <img
            src='https://avatars.githubusercontent.com/u/1?v=4'
            alt='관리자'
            className='h-8 w-8 rounded-full bg-gray-200'
          />
          <span>관리자 이름</span>
        </div>
        <img
          src={logout}
          alt='logout'
          className='h-4 w-4 cursor-pointer'
        />
      </div>
    </aside>
  );
};

export default LeftMenu;
