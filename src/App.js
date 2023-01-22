import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Register } from './auth/register';
import Login from './auth/Login';
import { useContext } from 'react';
import { AuthContext } from './context/context';
import Homepage from './auth/homepage';
import Leftside from './pages/Leftside';
import Messages from './pages/Messages';
import UserProfile from './pages/userProfile';
import Search from './components/left/Search';
import { UserContext } from './context/searchUser';
import SecUserProfile from './components/center/secUserProfile';
import { StatusContext } from './context/status'

function App() {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(UserContext)

  const { progress } = useContext(StatusContext)

  return (
    <div className="App">
      <BrowserRouter>
        {currentUser ?
          <div className='center'>
            <div className='flex h100' >
              <div className='side' style={{ filter: progress.status && 'blur(5px)' }}>
                {currentUser ? <Leftside /> : ''}
              </div>
              <Routes>
                <Route path='/'>
                  <Route
                    index
                    element={<Homepage />}
                  />
                  <Route path='messages' element={<Messages />} />
                  <Route path='search' element={<Search />} />
                  <Route path={currentUser ? `${currentUser.uid}` : '/'} element={<UserProfile />} />
                  <Route path={data ? `${data.user.uid}` : '/'} element={<SecUserProfile />} />
                </Route>
              </Routes>
            </div>
          </div>
          :
          <Routes>
            <Route index element={<Login />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='messages' element={<Login />} />
            <Route path='search' element={<Login />} />
          </Routes>}
      </BrowserRouter>
    </div>
  );
}

export default App;
