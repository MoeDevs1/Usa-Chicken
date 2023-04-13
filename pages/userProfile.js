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
import { AiFillCreditCard } from 'react-icons/ai';



const UserProfile = () => {
  const [teleport, setTeleport] = useState(false);
  const [update, setUpdate] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [newPassword, setNewPassword] = useState('');


  const handleTextClick = () => {
    setTeleport(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log('lol')

    try {
      const response = await axios.post('http://localhost:3000/api/auth/ChangeInfo', {
        oldPassword,
        newPassword,
        confirmNewPassword: confirmPassword,
      });

      if (response.data.success) {
        alert(response.data.message);
        setTeleport(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred while changing the password.');
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



          <div className={styles.oldPasswordContainer}>
  <input
    type="password"
    name="oldPassword"
    placeholder="Old Password"
    className={styles.inputFieldOldPassword}
    value={oldPassword}
    onChange={(e) => setOldPassword(e.target.value)}
  />
</div>

<div className={styles.passwordContainer}>
  <div className={styles.access}>
    <input
      type="password"
      name="newPassword"
      placeholder="New Password"
      className={styles.inputFieldPassword}
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
    />
  </div>

  <div className={styles.inputField1}>
    <input
      type="password"
      name="confirmPassword"
      placeholder="Confirm Password"
      className={styles.inputFieldPassword}
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
    />
  </div>
</div>

            <div className={styles.topButtonContainer}>

    
            </div>

            <header className={styles.emailTitle}> Email Setting</header>

         
        

            <div className={styles.emailContainer}>


              <div className={styles.w}>
                <input
                  type="email"
                  name="email"
                  placeholder="Old Email"
                  className={styles.inputOldFieldEmail}
                />
              </div>


              <div className={styles.inputField1}>
                <input
                  type="email"
                  name="newEmail"
                  placeholder="New Email"
                  className={styles.inputFieldNewEmail}
                />

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
