import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AuthService from './services/auth.service';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Book from './pages/Book';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { useEffect, useState } from 'react';

function App() {
  const [currentUsesr, setCurrentUser] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
      if(user) {
      setCurrentUser(user)
    }
  }, [])

  const logout = () => {
    AuthService.logout();
  }

  return (
    <div>
        <Routes>
            <Route path='/login' exact element={<Login />} />
            <Route path='/signup' exact element={<SignUp />} />
            <Route path='/books/:id' exact element={<Book />} />
            <Route path='/dashboard' exact element={<Dashboard />} />
            <Route path='/' exact element={<Home />} />
        </Routes>
    </div>
  );
}

export default App;
