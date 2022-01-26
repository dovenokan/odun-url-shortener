import './App.css';
import Generate from './pages/Generate';
import MyPage from './pages/MyPage';
import Redirector from './pages/Redirector';
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
          <Routes>
              <Route exact path="/" element={<Generate />} />
              <Route exact path="/mypage" element={<MyPage />} />
              <Route exact path="/:custom" element={<Redirector />} />
          </ Routes>
    </>
  );
}

export default App;