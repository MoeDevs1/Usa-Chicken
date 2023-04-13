import React from 'react';
import styles from '../styles/Login.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs';
import { AiFillUnlock } from 'react-icons/ai';
import { AiFillLock } from 'react-icons/ai';

import { parseCookies, setCookie, destroyCookie } from 'nookies';


const Login = () => {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');
  const [userError, setUserError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // declare setLoading with initial value of false
  const [rememberMe, setRememberMe] = useState(false);


  useEffect(() => {
    const cookies = parseCookies();
    const rememberMeCookie = cookies.rememberMe || '';
    const [savedEmail, savedPassword] = rememberMeCookie.split(':');
    setEmail(savedEmail || '');
    setPassword(savedPassword || '');
    setRememberMe(!!rememberMeCookie);
  }, []);





  const handleSignup = async () => {
    router.push('/Signup');
  }


  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!password) {
      setError("Please input password");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/auth/Login', { email, password, rememberMe });
      console.log(response.data);
  
      if (rememberMe) {
        setCookie(null, 'rememberMe', `${email}:${password}`, {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: '/',
        });
      } else {
        destroyCookie(null, 'rememberMe');
      }
  
      router.push('/Signup');
    } catch (error) {
      console.log(error)
  
      if (error.response && error.response.status === 401) {
        setUserError("Please confirm your email");
      } else if (error.response && error.response.status === 404) {
        setPasswordError("Please confirm your email");
      }
    };
  }
  
  

  return (
    <section className={styles.Container}>
      <div className={styles.formLogin}>
        <div className={styles.formContent}>
        
        
   
          <div className={styles.head}>
            
            <Image src="/img/lol.png" alt="" width="222" height="222" />
          </div>
          <div className={styles.form}>
            <div className={`${styles.inputFeild2}  ${!email && error && styles.errorInput}`}>
              <input
                type="email"
                placeholder="Email"
                className={` ${styles.inout}`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setUserError('');
                }}
              />
              {!email && error && <div className={styles.errorMessage}>Input Email</div>}
              {email && userError && <div className={styles.errorMessage}>User does not  exisit</div>}
            </div>
            <div className={`${styles.inputFeild2} ${!password && error && styles.errorInput}`}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`${styles.inout} password`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
              />
              {passwordError && <div className={styles.errorMessage1}>That's not the right password</div>}
              {!password && error && <div className={styles.errorMessage1}>Password is required</div>}
              <span className={styles.showPassword} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
              </span>
            </div>
            <div className={styles.Container2}>
           


            <label className={styles.rememberPasswordLabel}>
            <input
  type="checkbox"
  className={styles.rememberPasswordCheckbox}
  checked={rememberMe}
  onChange={(event) => setRememberMe(event.target.checked)}
/>
          Remeber Password
        </label>



           
              <a href="#" className={styles.forgotPasswordLink}>
                {' '}
                Forgot Password?</a>
            </div>

            <div>
              <button className={styles.loginButton} onClick={handleSignIn}>

                {loading ? 'Signing up...' : 'LOG IN'} {/* use loading state here */}
                <AiFillLock className={styles.icon}/>

              </button>

            </div>

            <div>
              
              
              
              <button


                className={styles.signUp} onClick={handleSignup}>Sign Up <AiFillUnlock className={styles.icon} />

              </button>

            </div>
            <div className={styles.line}></div>
           
           
            <div>
              <button className={styles.GoogleButton} onClick={() => signIn('google', { callbackUrl: '/Signup' })}>  <Image src="/img/google-logo-9808.png"
                alt="" width="14" height="14" />Continue with Google 
              </button>
            
            
            
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


export default Login;