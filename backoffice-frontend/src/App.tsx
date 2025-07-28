import { BrowserRouter, Route, Routes } from 'react-router';

// COMPONENTS
import LeftMenu from './components/layout/leftMenu';
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
          <div className='mx-auto max-w-[1200px]'>
            <Routes>
              <Route
                path='/'
                element={<div>홈</div>}
              />
              <Route
                path='/operate'
                element={<OperationPage />}
              />
              <Route
                path='/report'
                element={<ReportPage />}
              />
              <Route
                path='/data'
                element={<div>데이터 조회/삭제</div>}
              />
              <Route
                path='/crud'
                element={<CrudPage />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
