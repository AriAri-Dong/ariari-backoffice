import './index.css';
import LeftMenu from './components/layout/leftMenu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className='flex h-screen'>
        <LeftMenu />
        <div className='flex-1 overflow-y-auto p-6'>
          <Routes>
            <Route
              path='/'
              element={<div>홈</div>}
            />
            <Route
              path='/operate'
              element={<div>운영</div>}
            />
            <Route
              path='/report'
              element={<div>신고</div>}
            />
            <Route
              path='/data'
              element={<div>데이터 조회/삭제</div>}
            />
            <Route
              path='/crud'
              element={<div>CRUD</div>}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
