import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header';
import Home from './components/Home';
import Account from './components/Account';
import Login from './components/Login';
import Inscription from './components/Inscription';
import ProtectedRoute from './components/ProtectedRoute';
import ChangePassword from './components/ChangePassword';
import axios from './axios'

import "./fonts/Parisienne-Regular.ttf";

const App = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/user').then((response) => {
      setUser(response.data);
    }).catch((error) => {
      setUser({})
    }).finally(() => {
      setLoading(false);
    })
  }, [navigate])

  const handleLogout = () => {
    axios.post('/logout');
    setUser({});
    navigate('/login');
  }

  return (
    <div className="App">
      { !loading ? ( 
        <>
      <ToastContainer position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
        pauseOnHover={false}
      />
        <Header user={user} logout={handleLogout} />
        <div className='mx-5 py-5'>
        <Routes>
          <Route path="/" element={<Home user={user} />}/>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/account" element={<Account user={user} setUser={setUser} />} />
          </Route>
          <Route path="/login" element={<Login setUser={setUser} />}/>
          <Route path="/inscription" element={<Inscription setUser={setUser} />}/>
          <Route path='/change-password' element={<ChangePassword />}/>
        </Routes>
        </div>
        </>
      ) : (
        <div className="d-flex justify-content-center mt-5 flex-column">
          <div className="spinner-border" role="status">
          </div>
          <p>Chargement...</p>
        </div>
      )}
    </div>
  );
}

export default App;
