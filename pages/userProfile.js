import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FiEdit2 } from 'react-icons/fi';
import { RiKey2Line } from 'react-icons/ri';
import { AiFillCaretDown } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { AiFillLock } from 'react-icons/ai';
import { GrTransaction } from 'react-icons/gr';
import axios from 'axios';
import { BsFillPersonFill, BsXLg } from 'react-icons/bs';
import styles from '../styles/userProfile.module.css';
import Image from 'next/image';
import { AiOutlineCheckCircle } from 'react-icons/ai';


const UserProfile = () => {
  const [teleport, setTeleport] = useState(false);
  const [update, setUpdate] = useState(false);
  const router = useRouter();
  const [oldEmail, setoldEmail] = useState('');
  const [newEmail, setnewEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [userError, setUserError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userExistError, setUserExistError] = useState(false);
  const [success, setSuccess] = useState('');

  const handleTextClick = () => {
    setTeleport(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitted(true);
  
    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/auth/ChangeInfo', {
        oldPassword,
        newPassword,
        confirmPassword,
        oldEmail,
        newEmail
      });
      console.log(response.data);
      if (response.data.success) {
        setTeleport(false);
        setOldPassword('');
        setNewPassword('');
        setnewEmail('');
        setoldEmail('');
        setConfirmPassword('');
        setError('');
        setUserError(false);
        setSubmitted(false);
        router.replace(router.asPath);
        if (newPassword || oldPassword) {
          setSuccess('Successful Password Update!');
        } else if (newEmail || oldEmail) {
          setSuccess('Successful Email Update!');
        }
      } else {
        alert(response.data.message);
      }
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid old email');
        setUserError(true);
      } else if (error.response && error.response.status === 404) {
        setError('Invalid old password');
        setUserError(false);
      } else if (error.response && error.response.status === 409) {
        setUserExistError('Email already exists');
        setUserError(true);
      }
    }
  };


  if (teleport) {
    // Render the empty container when teleport is true
    return (

      <div className={styles.parentContainer}>
   <div className={styles.container1}>
        
        <div className={styles.userProfileLogo}>
  <Image src="/img/lol.png" alt="" width="142" height="142" className={styles.logoImage} />
</div>

<div  className={styles.nameText}>Mohannad Osman</div>

        <div className={styles.buttonContainer}>
       
         
         <div>  
      <button    className={styles.button} onClick={handleTextClick}>   < BsFillPersonFill  className={styles.Icon}/>  
      User profile 
       </button>
        </div>
       
        <div>  
      <button    className={styles.button} onClick={handleTextClick}> < AiFillLock  className={styles.Icon}/>  Sign in & Security  </button>
        </div>

        <div>  
      <button    className={styles.button} onClick={handleTextClick}> < GrTransaction  className={styles.Icon}/>  Transactios  </button>
        </div>
      





        <div>  
      <button    className={styles.button} onClick={handleTextClick}> < BsFillPersonFill  className={styles.Icon}/>  Banking Info  </button>
        </div>
      
      

      
        <div>  
        </div>

        </div>
        </div>


        <div className={styles.SecurityContainer2}>
          <header className={styles.Title}> Password Setting</header>





          <div className={styles.inputContainer}>

          <div className={`${styles.oldPasswordContainer} ${!userError && error &&oldPassword&& styles.errorInput}`}>
    <input
      type="password"
      name="oldPassword"
      placeholder="Old Password"
      className={styles.inputFieldOldPassword}
      value={oldPassword}
      onChange={(e) => { setOldPassword(e.target.value)    
      setError(''); // reset the error state
      setUserError(false); // reset the userError state
      setSubmitted(false); // reset the submitted state
    }}
      
    />
  </div>
  {!userError && error&&oldPassword && <div className={styles.errorMessage1}>{error}</div>}

<div className={styles.passwordContainer}>

<div className={`${styles.access} ${submitted &&newPassword != confirmPassword  && styles.errorInput}`}>

    <input
      type="password"
      name="newPassword"
      placeholder="New Password"
      className={styles.inputFieldPassword}
      value={newPassword}
      onChange={(e) => {
        setNewPassword(e.target.value);
        if (passwordError) setPasswordError(false); // Add this line
      }}    />
      {submitted && newPassword != confirmPassword && <div className={styles.errorMessage}>Passwords Dont match !</div>}

  </div>
  <div className={`${styles.inputField1} ${submitted &&newPassword != confirmPassword  && styles.errorInput}`}>

    <input
      type="password"
      name="confirmPassword"
      placeholder="Confirm Password"
      className={styles.inputFieldPassword}
      value={confirmPassword}
      onChange={(e) => {
        setConfirmPassword(e.target.value);
        if (passwordError) setPasswordError(false); // Add this line
      }} 
  
  />
        {submitted && newPassword != confirmPassword && <div className={styles.errorMessage}>Passwords Dont match !</div>}

  </div>
</div>



            <div className={styles.topButtonContainer}>

    
            </div>

            <header className={styles.emailTitle}> Email Setting</header>

         
        

            <div className={styles.emailContainer}>

       
  <div className={`${styles.w} ${userError && error && styles.errorInput}`}>
  <input
  type="email"
  name="email"
  placeholder="Old Email"
  value={oldEmail}
  className={`${styles.inputOldFieldEmail} ${userError && error && styles.errorInput}`}
  onChange={(e) => {
    setoldEmail(e.target.value);
    setError(''); // reset the error state
    setUserError(false); // reset the userError state
    setSubmitted(false); // reset the submitted state
  }}
/>

    {userError && error && <div className={styles.errorMessage}>{error}</div>}
  </div>

  <div className={`${styles.inputField1} ${userExistError && styles.errorInput}`}>
  <input
    type="email"
    name="newEmail"
    placeholder="New Email"
    value={newEmail}
    onChange={(e) => {
      setnewEmail(e.target.value);
      setUserExistError('')
      setSubmitted(false);
      setUserError(false); // reset userError state
    }}
    className={styles.inputFieldNewEmail}
  />
{userExistError && <div className={styles.errorMessage}>{userExistError}</div>}



</div>

</div>
            <div className={styles.topButtonContainer}>
            <div>  
      <button    className={styles.cancelButton} onClick={handleUpdate}> update </button>
        </div>
            <div>  
      <button    className={styles.updateButton} onClick={handleTextClick}> cancel </button>
        </div>

          </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className={styles.parentContainer}>
   {success && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
          < AiOutlineCheckCircle  className={styles.check}/>

            <div className={styles.popupMessage}>{success}</div>
            <div    className={styles.text}> Please return back to the login page    </div>

            <button className={styles.popupButton}>Login Now</button>
          </div>
        </div>
      )}


     
      <div className={styles.container1}>

      <div className={styles.imageFrame}>
            <Image src="/img/lol.png" alt="" width="142" height="142" />
          </div>


          <div className={styles.buttonContainer}>

          <div>  
      <button    className={styles.button} onClick={handleTextClick}> User profile <RiKey2Line /></button>
        </div>
       
        <div>  
      <button    className={styles.button} onClick={handleTextClick}> Sign in & Security <RiKey2Line /></button>
        </div>

        <div>  
      <button    className={styles.button} onClick={handleTextClick}> Transactios <RiKey2Line /></button>
        </div>
      
      
        <div>  
      <button    className={styles.button} onClick={handleTextClick}> Banking Info <RiKey2Line /></button>
        </div>
        </div>

        <div className={styles.moreContent}></div>
      </div>

      <div className={styles.container2}>
      <header className={styles.Title}> Profile Setting</header>

        <div className={styles.inputContainer}>
          <div className={styles.inputText}>First name:</div>
          <div className={styles.inputField1}>
            <input
              type="text"
              name="firstName"
              placeholder="*First Name"
              className={styles.input}
            />
            <FiEdit2 className={styles.icon} />
          </div>

          <div className={styles.inputText}>Last name:</div>
          <div className={styles.inputField1}>
            <input
              type="text"
              name="lastName"
              placeholder="*Last Name"
              className={styles.input}
            />
            <FiEdit2 className={styles.icon} />
          </div>

          <div className={styles.inputText}>Phone Number:</div>
          <div className={styles.inputField1}>
            <input
              type="text"
              name="phoneNumber"
              placeholder="*Phone Number"
              className={styles.input}
            />
            <FiEdit2 className={styles.icon} />
          </div>
        </div>
      </div>
    </div >
  );
};

export default UserProfile;