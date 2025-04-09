import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductList from './components/ProductList';
import ProductCreate from './components/ProductCreate';
import ProductUpdate from './components/ProductUpdate';
import Swal from 'sweetalert2';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    Swal.fire({
      icon: 'success',
      title: 'Login Successful!',
    });
  };

  const handleSignup = () => {
    Swal.fire({
      icon: 'success',
      title: 'Signup Successful!',
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    delete axios.defaults.headers.common['Authorization'];
    Swal.fire({
      icon: 'success',
      title: 'Logout Successful!',
    });
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Products</Link>
          </li>
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>

      <Routes>
        <Route
          path="/login"
          element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!isLoggedIn ? <Signup onSignup={handleSignup} /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={
            isLoggedIn ? <ProductList /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/create"
          element={
            isLoggedIn ? <ProductCreate /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/update/:id"
          element={
            isLoggedIn ? <ProductUpdate /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
