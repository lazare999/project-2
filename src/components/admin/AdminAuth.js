import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth'; 

import classes from './AdminAuth.module.css';

const AdminAuth = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (email === 'admin@admin.com') {
        const token = await getIdToken(user);
        localStorage.setItem('adminUserToken', token);
        navigate('/admin-panel');
      } else {
        setErrorMessage('Invalid email address');
      }
    } catch (error) {
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
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminAuth;

export async function checkAuthLoader() {
  const user = auth.currentUser; 
  const token = user ? await getIdToken(user) : null;

  if (!token) {
    return redirect('/');
  }else {
    return null
  }
}