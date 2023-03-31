 import styles from '../styles/Signup.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import axios from 'axios';
import { useState } from 'react';


const url = 'http://localhost:3000/api/auth/upSign'





const Signup = () => {
  const router = useRouter();

  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setCnfrmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setCnfrmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const formattedPhone = parseInt(phone.replace(/\D/g, '')); // use parseInt to convert phone to an integer
  const [emailExistsError, setEmailExistsError] = useState(''); // added state variable for email exists error
  const [isGoogleSignup, setIsGoogleSignup] = useState(false); // define the variable
  

  

  function isValidEmail(email) {
    // regular expression to check if the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }






  

  

  const formatPhoneNumber = (phoneNumber) => {
    let formattedNumber = phoneNumber.replace(/[^\d]/g, '');

    if (formattedNumber.length > 3) {
      formattedNumber = `(${formattedNumber.substring(0, 3)}) ${formattedNumber.substring(3)}`;
    }

    if (formattedNumber.length > 9) {
      formattedNumber = `${formattedNumber.substring(0, 9)}-${formattedNumber.substring(9)}`;
    }

    return formattedNumber;
  };

  const [loading, setLoading] = useState(false); // declare setLoading with initial value of false
  const [error, setError] = useState('');





  const handleGoogleSignup = async () => {
    setIsGoogleSignup(true);
    await signIn('google', { callbackUrl: '/Login' }); // specify the callback URL to redirect to after login
}


const findOneByEmail = async (email) => {
  try {
    const res = await axios.post(`${url}?email=${email}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};




  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
    
  
      const existingUser = await findOneByEmail(email);
      if (existingUser) {
       

        setEmailExistsError('User with this email already exists');
        setLoading(false);
        return;
      
      }
     
  
      const resp = await axios.post(url, {
        firstName: firstName, 
        lastName: lastName,
        phone: formattedPhone,
        email: email,
        password: password,
        confirmEmail: confirmEmail,
        confirmPassword: confirmPassword,
      });
      router.push('/Login');
      console.log(resp.data);
    } catch (error) {
      console.log(error.response);
      setError('Signup failed. Please try again.');
    }
    setLoading(false);
  };
  


  return (

    <section className={styles.Container}>


      <div className={styles.formLogin}>
        <div className={styles.head}>
          <Image src="/img/lol.png" alt="" width="222" height="222" />
          <header>Welcome To Usa Chicken</header>
        </div>

        <div className={`${styles.inputField} ${error && !firstName && styles.errorInput}`}>
          <input
            type="text"
            name="firstName"
            placeholder="*First Name"
            className={styles.input}
            value={firstName}
            onChange={(e) => setFirst(e.target.value)}
          />
          {error && !firstName && <div className={styles.errorMessage}>Please enter your first name</div>}
        </div>







        <div className={`${styles.inputField} ${error && !lastName && styles.errorInput}`}>
          <input
            type="text"
            name="last Name"
            placeholder=" Last Name"
            className={styles.input}
            value={lastName}
            onChange={(e) => setLast(e.target.value)}
          />
          {error && !lastName && <div className={styles.errorMessage}>Please enter your last name</div>}
        </div>


        <div className={`${styles.inputField} ${error && (!phone || phone.length !== 14) && styles.errorInput}`}>
          <input
            type="tel"
            name="phonenumber"
            placeholder="Phone Number"
            className={styles.input}
            value={phone}
            onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
            maxLength={14}
            required
          />

          {error && !phone && <div className={styles.errorMessage}>Please enter your phone number</div>}
          {error && phone && phone.length !== 14 && (<div className={styles.errorMessage}>Please enter a valid phone number</div>
          )}
        </div>

     
     
     
     
     
       <div className={`${styles.inputField} ${error&& (!email || setEmailExistsError || !isValidEmail(email)) && styles.errorInput}`}>
       <input
  type="email"
  name="email"
  placeholder="*Email"
  className={styles.input}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  onFocus={() => setEmailExistsError('')}
/>
  {error && !email && <div className={styles.errorMessage}>Please enter your email</div>}
 
  {error && email && !isValidEmail(email) && <div className={styles.errorMessage}>Please enter a valid email</div>}
  {error &&!!isValidEmail(email) && email && setEmailExistsError && <div className={styles.errorMessage}>User different email</div>}

</div>

 


        <div className={`${styles.inputField} ${error && (!confirmEmail || confirmEmail !== email) && styles.errorInput}`}>

          <input
            type="email"
            name="confirmEmail"
            placeholder="Confirm Email"
            className={styles.input}
            value={confirmEmail}
            onChange={(e) => setCnfrmEmail(e.target.value)}

          />
          {error && !email && <div className={styles.errorMessage}>Please confrim your email</div>}
          {error && email != confirmEmail && <div className={styles.errorMessage}>Please match your emails </div>}


        </div>

        <div className={`${styles.inputField} ${error && !password && styles.errorInput}`}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}


          />
          {error && !password && <div className={styles.errorMessage}>Please enter your password</div>}   
           {error && password && password.length<5 &&<div className={styles.errorMessage}>Password must be longer then 5</div>}


        </div>

        <div className={`${styles.inputField} ${error && !confirmPassword && styles.errorInput}`}>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setCnfrmPassword(e.target.value)}


          />
          {error && !confirmPassword && <div className={styles.errorMessage}>Please confirm your password</div>}
          {error && confirmPassword!=password && <div className={styles.errorMessage}>Please match your password</div>}

 
        </div>




        <div className={styles.buttonContainer}>
          <button className={styles.signupButton} onClick={handleSignup}>
            {loading ? 'Signing up...' : 'Sign Up'} {/* use loading state here */}
          </button>



          <button className={styles.GoogleButton} onClick={handleGoogleSignup}>Sign up with Google  <Image src="/img/google-logo-9808.png"
            alt="" width="14" height="14" />
          </button>
        </div>



      </div>
    </section>
  );
};

export default Signup