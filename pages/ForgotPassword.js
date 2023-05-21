import React, { useState } from 'react';
import axios from 'axios';
import { BsCheck2Circle } from 'react-icons/bs';
import styles from '@/styles/ForgotPassword.module.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const checkUserExists = async () => {
    try {
      const res = await axios.post('/api/emailExisit', { oldEmail: email });
      if (res.status === 200) {
        setSuccess(true);
        // Here you would typically send an email to the user with the 6-digit code
        // This can be done on the server in your userExisit API or in another API.
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = () => {
    // Add your login handling code here
    console.log('Login Now');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Forgot Password</h1>
        <h2>Enter Email</h2>
        <input 
          className={styles.input} 
          type="email" 
          placeholder="Your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button className={styles.button} onClick={checkUserExists}>Reset Password</button>
        <button className={styles.backButton}>Back</button>
       
      </div>
    </div>
  );
}

export default ForgotPassword;
