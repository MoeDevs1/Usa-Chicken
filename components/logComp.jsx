import React from 'react';
import styles from '../styles/Login.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs';
import { AiFillUnlock } from 'react-icons/ai';
import { AiFillLock } from 'react-icons/ai';
import { signIn as nextAuthSignIn } from 'next-auth/react';
import axios from 'axios';



const Login = ({ closeLogin }) => {
  const [emailError, setEmailError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // declare setLoading with initial value of false
  const [rememberMe, setRememberMe] = useState(false);
  const [userError, setUserError] = useState('');

    const [passwordError, setPasswordError] = useState('');



 
    const handleGoogleSignIn = async (email) => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Replace with your environment variable name

        const response = await axios.post(`${baseUrl}/api/googleLogin`, { email });
    
        if (response.data.authorized) {
          closeLogin(); // close login form
          router.push('/userProfile');
        } else {
          setError("User not found in database");
        }
      } catch (error) {
        console.error(error);
        setError("Error occurred during sign in");
      }
    };



    const onGoogleSignInSuccess = async (email) => {
      handleGoogleSignIn(email);
    };
    
    const handleGoogleSignInClick = () => {
      nextAuthSignIn('google', {
        callbackUrl: '/userProfile',
        redirect: false,
      }).then((response) => {
        if (response?.status === 'authenticated') {
          onGoogleSignInSuccess(response?.user?.email);
        }
      });
    };













    useEffect(() => {  
     
      const fetchUserDetails = async () => {
        try {
          
          const response = await axios.get('/api/RemeberMe');
          const { password, email } = response.data;
          setPassword(password);
          setEmail(email);
      
        } catch (error) {
          console.error('Error fetching user details', error);
        }
      };
    
      fetchUserDetails();
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
    setLoading(true); // set loading state to true
  
    try {
      const response = await axios.post('api/Authentication', { email, password, rememberMe });
      console.log(response.data);
      closeLogin(); // close login form
      window.location.reload();
    } catch (error) {
      console.log(error)
  
      if (error.response && error.response.status === 401) {
        setUserError("Please confirm your email");
        setLoading(false); // set loading state to false
      } else if (error.response && error.response.status === 404) {
        setPasswordError("Please confirm your email");
        setLoading(false); // set loading state to false
      }
    };
  }
 
  
  
  return (
    <section className={styles.loginContainer}>

    
      <div className={styles.formLogin}>
        
        <div className={styles.formContent}>
        <button className={styles.closeButton} onClick={closeLogin}>
  X
</button>
        <div className={styles.line1}></div> {/* Add this line */}
   
          <div className={styles.head}>
            <Image src="/img/Logo.png" alt="" width="222" height="222" />
            
          </div>
          <div className={styles.head}>  Sign In To Usa Chicken </div>

          <div className={styles.form}>
            
          <form onSubmit={handleSignIn}>

            <div className={`${styles.inputFeild2}  ${!email && error && styles.errorInput}`}>
              <input
                type="email"
                placeholder="Email"
                className={` ${styles.inout}`}
                value={email}
                onChange={(e) => { setEmail(e.target.value);   setUserError('');
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
              {passwordError &&   <div className={styles.errorMessage1}>That's not the right password</div>}
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



           
        <div className={styles.forgotPasswordLink}>
  <a href="/forgot-password">Forgot password?</a>
</div>

            </div>

            <div>
              <button className={styles.loginButton} onClick={handleSignIn}>

                {loading ? 'Logining in...' : 'LOG IN'} {/* use loading state here */}
                <AiFillLock className={styles.icon}/>

              </button>

            </div>
            </form>

            <div>
              
              
              
              <button


                className={styles.signUp} onClick={handleSignup}>Sign Up <AiFillUnlock className={styles.icon} />

              </button>

            </div>
            <div className={styles.line}></div>
           
           
            <div>
            <button className={styles.GoogleButton} onClick={handleGoogleSignInClick}>
    <Image src="/img/google-logo-9808.png" alt="" width="14" height="14" />Continue with Google
  </button>
            
            
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


export default Login;