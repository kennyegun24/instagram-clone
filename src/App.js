import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Register } from './auth/register';
import Login from './auth/Login';
import { useContext } from 'react';
import { AuthContext } from './context/context';
import Homepage from './auth/homepage';

function App() {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route
              index
              element={currentUser ? <Homepage /> : <Login />}
            />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
