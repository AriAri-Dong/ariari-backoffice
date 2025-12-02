import { BrowserRouter, Outlet, Route, Routes } from 'react-router';

// COMPONENTS
import LeftMenu from './components/layout/leftMenu';
import HomePage from './page/home/homePage';
import OperationPage from './page/operation/operationPage';
import ReportPage from './page/report/reportPage';
import CrudPage from './page/crud/crudPage';

// CSS
import 'react-datepicker/dist/react-datepicker.css';
import LoginPage from './page/login/loginPage';
import AuthGuard from './components/auth/authGuard';

function ProtectedLayout() {
  return (
    <div className='flex h-screen'>
      <LeftMenu />
      <div className='bg-sub_bg flex-1 overflow-y-auto pt-20 pb-[100px]'>
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={<LoginPage />}
        />
        <Route
          element={
            <AuthGuard>
              <ProtectedLayout />
            </AuthGuard>
          }
        >
          <Route
            path='/login'
            element={<LoginPage />}
          />
          <Route
            path='/'
            element={
              <div className='mx-auto max-w-[1440px]'>
                <HomePage />
              </div>
            }
          />
          <Route
            path='/operate'
            element={
              <div className='mx-auto max-w-[1200px]'>
                <OperationPage />
              </div>
            }
          />
          <Route
            path='/report'
            element={
              <div className='mx-auto max-w-[1200px]'>
                <ReportPage />
              </div>
            }
          />
          <Route
            path='/data'
            element={
              <div className='mx-auto max-w-[1200px]'>
                <CrudPage />
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
