import { BrowserRouter, Route, Routes } from 'react-router';

// COMPONENTS
import LeftMenu from './components/layout/leftMenu';
import HomePage from './page/home/homePage';
import OperationPage from './page/operation/operationPage';
import ReportPage from './page/report/reportPage';
import CrudPage from './page/crud/crudPage';

// CSS
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  return (
    <BrowserRouter>
      <div className='flex h-screen'>
        <LeftMenu />
        <div className='bg-sub_bg flex-1 overflow-y-auto pt-20 pb-[100px]'>
          <Routes>
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
              element={<div className='mx-auto max-w-[1200px]'>데이터 조회/삭제</div>}
            />
            <Route
              path='/crud'
              element={
                <div className='mx-auto max-w-[1200px]'>
                  <CrudPage />
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
