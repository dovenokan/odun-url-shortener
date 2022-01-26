import './App.css';
import Generate from './pages/Generate';
import Redirector from './pages/Redirector';
import MyPage from './pages/MyPage';
import {Routes, Route} from 'react-router-dom'

function App() {

  // useEffect(() => {
  //   async function fetcher(params) {
  //     const {data,error} = await supabase
  //       .from("odun")
  //       .select("custom")
  //     console.log(data)
  //     }
  //     fetcher()
  // }, []);

  return (
    <>
          <Routes>
              <Route exact path="/" element={<Generate />} />
              {/* <Route exact path="/mypage" element={<MyPage />} /> */}
              <Route exact path="/:custom" element={<Redirector />} />
          </ Routes>
    </>
  );
}

export default App;