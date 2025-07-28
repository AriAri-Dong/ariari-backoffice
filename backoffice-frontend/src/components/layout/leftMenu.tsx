import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import AlertWithMessage from '../alert/alertWithMessage';

import logo from '../../assets/icons/logo.svg';
import home from '../../assets/icons/layout/home.svg';
import homeActive from '../../assets/icons/layout/home_active.svg';
import operate from '../../assets/icons/layout/operate.svg';
import operateActive from '../../assets/icons/layout/operate_active.svg';
import report from '../../assets/icons/layout/report.svg';
import data from '../../assets/icons/layout/data.svg';
import crud from '../../assets/icons/layout/crud.svg';
import logout from '../../assets/icons/logout.svg';
import admin from '../../assets/icons/profile_default.svg';

const menuItems = [
  { path: '/', label: '홈', icon: home, activeIcon: homeActive },
  { path: '/operate', label: '운영', icon: operate, activeIcon: operateActive },
  { path: '/report', label: '신고', icon: report },
  { path: '/data', label: '데이터 조회/삭제', icon: data },
  { path: '/crud', label: 'CRUD', icon: crud },
];

const LeftMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showLogoutAlert, setShowLogoutAlert] = useState<boolean>(false);

  const handleLogout = () => {
    console.log('로그아웃');
    setShowLogoutAlert(false);
    // 경로 임시 적용
    navigate('/login');
  };

  return (
    <aside className='border-menuborder z-50 flex h-screen w-[280px] flex-col justify-between border-r bg-white p-6'>
      <div>
        <Link to={'/'}>
          <img
            src={logo}
            alt='logo'
            className='mb-14 h-[29px] w-[100px] cursor-pointer'
          />
        </Link>
        <nav className='flex flex-col gap-6'>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`hover:bg-selectedoption_default flex items-center gap-4 rounded-lg px-1 py-2 transition-colors ${
                  isActive ? 'text-primary' : 'text-unselected'
                }`}
              >
                <img
                  src={isActive && item.activeIcon ? item.activeIcon : item.icon}
                  alt={item.label}
                  className='h-7 w-7'
                />
                <span className='text-h3'>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className='text-body1_sb text-subtext1 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <img
            src={admin}
            alt='관리자'
            className='h-12 w-12 rounded-full bg-gray-200'
          />
          <span>관리자 이름</span>
        </div>
        <img
          src={logout}
          alt='logout'
          className='h-6 w-6 cursor-pointer'
          onClick={() => setShowLogoutAlert(true)}
        />
      </div>
      {showLogoutAlert && (
        <AlertWithMessage
          text='로그아웃 하시겠습니까?'
          description='현재 작업 내용이 저장되지 않을 수 있습니다.'
          leftBtnText='취소'
          rightBtnText='로그아웃'
          onLeftBtnClick={() => setShowLogoutAlert(false)}
          onRightBtnClick={handleLogout}
        />
      )}
    </aside>
  );
};

export default LeftMenu;
