import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import the Firebase auth method

import classes from './AdminAuth.module.css';

const AdminAuth = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Add state for the password
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign in with Firebase using email and password
      await signInWithEmailAndPassword(auth, email, password);

      // Check if the entered email is 'admin@admin.com'
      if (email === 'admin@admin.com') {
        // Redirect to 'admin-panel' path
        navigate('/admin-panel');
      } else {
        setErrorMessage('Invalid email address');
      }
    } catch (error) {
      // Handle authentication error
      console.error(error);
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <p>Hello world</p>
            {errorMessage && <p>{errorMessage}</p>}
        <label>
          Email:
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password} // Bind the password value
            onChange={(e) => setPassword(e.target.value)} // Handle password input change
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminAuth;
