import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Signup({ onSignup }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/auth/signup', {
        name,
        email,
        password,
      });
      onSignup();
      Swal.fire({
        icon: 'success',
        title: 'Signup Successful!',
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'swal2-toast',
          title: 'swal2-toast-title',
        },
      });
      navigate('/login');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: 'Please check your information and try again.',
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'swal2-toast swal2-toast-error',
          title: 'swal2-toast-title',
          content: 'swal2-toast-content',
        },
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="signup-button-container">
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
