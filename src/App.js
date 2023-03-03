import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from './components/Header';
import Home from './components/Home';
import Account from './components/Account';
import Login from './components/Login';
import Inscription from './components/Inscription';
import ProtectedRoute from './components/ProtectedRoute';

import "./fonts/Parisienne-Regular.ttf";

const App = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null
  });
  
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleLogin = values => {
    setUser({values});
    navigate('/');
    console.log(values)
  }
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('library');
    localStorage.removeItem('search');
    setUser(null);
    navigate('/login');
  }

  const handleInscription = () => {
    setTimeout(() => {
      navigate('/login');
    }, "2000")
  
  }
  
  return (
    <div className="App">
      <Header user={user} logout={handleLogout} />
        <div className='mx-5 py-5'>
        <Routes>
          <Route path="/" element={<Home user={user} />}/>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/account" element={<Account user={user} setUser={setUser} />} />
          </Route>
          <Route path="/login" element={<Login login={handleLogin} />}/>
          <Route path="/inscription" element={<Inscription redirect={handleInscription}/>}/>
        </Routes>

        </div>
    </div>
  );
}

export default App;
