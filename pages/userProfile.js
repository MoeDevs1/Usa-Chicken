

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FiEdit2 } from 'react-icons/fi';
import { RiKey2Line } from 'react-icons/ri';
import { AiFillLock } from 'react-icons/ai';
import { GrTransaction } from 'react-icons/gr';
import axios from 'axios';
import { BsFillPersonFill, BsXLg } from 'react-icons/bs';
import styles from '../styles/userProfile.module.css';
import Image from 'next/image';
import { BsCheck2Circle } from 'react-icons/bs';
import Link from 'next/link';


const UserProfile = ({ orders, products, admin }) => {
  const [teleport, setTeleport] = useState(false);
  const [teleport1, setTeleport1] = useState(false);
  const [teleport2, setTeleport2] = useState(false);
  const [update, setUpdate] = useState(false)
  const [loading, setLoading] = useState(false); // declare setLoading with initial value of false
  const [lastNameError, setLastNameError] = useState(false);
  const router = useRouter();
  const [oldEmail, setoldEmail] = useState('');
  const [newEmail, setnewEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userError, setUserError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userExistError, setUserExistError] = useState(false);
  const [success, setSuccess] = useState('');
  const [phone, setPhone] = useState('');
// Add these two state variables at the beginning
const [newFirstName, setNewFirstName] = useState('');
const [newLastName, setNewLastName] = useState('');
const [firstNameError, setFirstNameError] = useState(false);
const [rawPhone, setRawPhone] = useState('');
const [activeButton, setActiveButton] = useState("User profile");
const [close, setClose] = useState(true);
const [pizzaList, setPizzaList] = useState(products);
const [orderList, setOrderList] = useState(orders);
const status = ["Paid", "Preparing", "Ready", "Picked Up!"];
const [emailState, setEmailState] = useState('');
const [points, setPoints] = useState();


const handleButtonClick = (event) => {
  setActiveButton(event.target.innerText);
};

const formatPhoneNumber = (number) => {
    const cleaned = ('' + number).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return null;
  };
  

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('/api/getUserDetails');
        const { firstName, lastName, phone, email, points } = response.data;
        setFirstName(firstName);
        setLastName(lastName);
        setEmailState(email);
        setPhone(formatPhoneNumber(phone));
        setRawPhone(phone); // Set the raw phone number
        setNewFirstName(firstName);
        setNewLastName(lastName);
        setPoints(points);

      } catch (error) {
        console.error('Error fetching user details', error);
      }
    };
  
    fetchUserDetails();
  }, []);
  
  const handleCancel = () => {
    setNewFirstName(firstName);
    setNewLastName(lastName);
    setOldPassword('');
    setNewPassword('');
    setnewEmail('');
    setoldEmail('');
    setConfirmPassword('');
    setError('');
    setUserError(false);
    setPasswordError(false);
    setFirstNameError(false);
    setLastNameError(false);
    setSubmitted(false);
  };


  const handleLogin = async () => {
    router.push('/Login');
  }
  
  const handleTextClick = () => {
    setTeleport(true);
    setActiveButton("Sign in & Security"); // Add this line to set the active button
  };
  
  const handleProfileClick = () => {
    if (activeButton === "User profile") {
      // If the "User profile" button is already active, do nothing
      return;
    } else {
      setTeleport(false); // Set teleport to false when "User profile" is clicked
      setTeleport1(false); // Set teleport to false when "User profile" is clicked
      setTeleport2(false); // Set teleport to false when "User profile" is clicked

      setActiveButton("User profile");
    }
  };
  

  const handleTransactionClick = () => {
    setTeleport1(true);
    setTeleport2(false); // Set teleport to false when "User profile" is clicked
    setTeleport(false); // Set teleport to false when "User profile" is clicked
    setActiveButton("Transactions"); // Add this line to set the active button
  };

  const handlePointsClick = () => {
    setTeleport2(true);
    setTeleport1(false);
    setTeleport(false); // Set teleport to false when "User profile" is clicked
    setActiveButton("Banking Info"); // Add this line to set the active button
  };


  const handleUpdateRresh = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setLoading(true); // Set loading to true when the update process starts

    if (newLastName.length < 2 || newLastName.length > 10) {
      setLastNameError(true);
      return;
    } else {
      setLastNameError(false);
    }

    if (newFirstName.length < 2 || newFirstName.length > 10) {
      setFirstNameError(true);
      return;
    } else {
      setFirstNameError(false);
    }
    try {
      const response = await axios.post('http://localhost:3000/api/ChangeInfo', {
        oldPassword,
        newPassword,
        confirmPassword,
        oldEmail,
        phone: rawPhone, // Use the rawPhone variable here
        newEmail,
        firstName: newFirstName, // Use the new state variable here
        lastName: newLastName, // Use the new state variable here
       
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
        window.location.reload();

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



  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setLoading(true); // Set loading to true when the update process starts

  
    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/ChangeInfo', {
        oldPassword,
        newPassword,
        confirmPassword,
        oldEmail,
        newEmail,
        phone: rawPhone, // Use the rawPhone variable here

        firstName: newFirstName, // Use the new state variable here
        lastName: newLastName, // Use the new state variable here
       
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
<div className={styles.nameText}>{firstName} {lastName}</div>


       
<div className={styles.buttonWrapper}>
    <button
      className={`${styles.button} ${activeButton === "User profile" ? styles.active : ""}`}
      onClick={handleProfileClick}
    >
      <BsFillPersonFill className={styles.Icon} />
      User profile
    </button>
  </div>

  <div className={styles.buttonWrapper}>
    <button
      className={`${styles.button} ${activeButton === "Sign in & Security" ? styles.active : ""}`}
      onClick={handleTextClick}
    >
      <AiFillLock className={styles.Icon} />
      Sign in & Security
    </button>
  </div>

  <div className={styles.buttonWrapper}>
    <button
      className={`${styles.button} ${activeButton === "Transactions" ? styles.active : ""}`}
      onClick={handleTransactionClick}
    >
      <GrTransaction className={styles.Icon} />
      Transactions
    </button>
  </div>

  <div className={styles.buttonWrapper}>
    <button
      className={`${styles.button} ${activeButton === "Banking Info" ? styles.active : ""}`}
      onClick={handlePointsClick}
    >
      <BsFillPersonFill className={styles.Icon} />
      Points Tracker
    </button>
          </div>
        </div>

        


        <div className={styles.container2}>
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
      className={styles.inputFieldPassword1}
      value={newPassword}
      onChange={(e) => {
        setNewPassword(e.target.value);
        if (passwordError) setPasswordError(false); // Add this line
      }}    />
      {submitted && newPassword != confirmPassword && <div className={styles.errorMessage1}>Passwords Dont match !</div>}

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
        {submitted && newPassword != confirmPassword && <div className={styles.errorMessage1}>Passwords Dont match !</div>}

  </div>
</div>



          
            <header className={styles.emailTitle}> Email Setting</header>

         
        

            <div className={styles.emailContainer}>

       
  <div className={`${styles.inputField1} ${userError && error && styles.errorInput}`}>
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
    className={styles.inputOldFieldEmail}
  />
{userExistError && <div className={styles.errorMessage}>{userExistError}</div>}



</div>

</div>
            <div className={styles.topButtonContainer}>
            <div>  
      <button    className={styles.cancelButton} onClick={handleUpdate}> update </button>
        </div>
            <div>  
            <button className={styles.updateButton} onClick={handleCancel}>
    Cancel
  </button>
        </div>

          </div>
          </div>
        </div>
      </div>
    );
  }
  if (teleport1) {
    // Render the empty container when teleport is true
    return (

      <div className={styles.parentContainer}>

   <div className={styles.container1}>
        
        <div className={styles.userProfileLogo}>
  <Image src="/img/lol.png" alt="" width="142" height="142" className={styles.logoImage} />
</div>
<div className={styles.nameText}>{firstName} {lastName}</div>


       
<div className={styles.buttonWrapper}>
    <button
      className={`${styles.button} ${activeButton === "User profile" ? styles.active : ""}`}
      onClick={handleProfileClick}
    >
      <BsFillPersonFill className={styles.Icon} />
      User profile
    </button>
  </div>

  <div className={styles.buttonWrapper}>
    <button
      className={`${styles.button} ${activeButton === "Sign in & Security" ? styles.active : ""}`}
      onClick={handleTextClick}
    >
      <AiFillLock className={styles.Icon} />
      Sign in & Security
    </button>
  </div>

  <div className={styles.buttonWrapper}>
    <button
      className={`${styles.button} ${activeButton === "Transactions" ? styles.active : ""}`}
      onClick={handleTransactionClick}
    >
      <GrTransaction className={styles.Icon} />
      Transactions
    </button>
  </div>

  <div className={styles.buttonWrapper}>
    <button
      className={`${styles.button} ${activeButton === "Banking Info" ? styles.active : ""}`}
      onClick={handlePointsClick}
    >
      <BsFillPersonFill className={styles.Icon} />
      Points Tracker
    </button>
          </div>
        </div>

        


        <div className={styles.container2}>
        {/* {points === 500 ? (
          <header className= {`${styles.Title} ${styles.Title}`}><span className={styles.pointsTitle}>Your Points: </span> {points} <span className={styles.ordering}> &nbsp; (Order and get $10 Off)  </span></header>
  ) : (
    <header className= {`${styles.Title} ${styles.Title}`}> <span className={styles.pointsTitle}>Your Points: </span> {points}</header>
    )} */}
    <button className= {`${styles.checkoutButton} ${styles.orderNowButton}`}>Order Now</button>
        <header className= {`${styles.Title} ${styles.Title}`}> Your Orders</header>

          <div className={styles.cardContainer}>
          {orderList.map((order) => {
  if (order.email === emailState) {
    return (
      <div className={styles.cardHeader}>
        <Link href={`/orders/${order._id}`}>
          <button className={styles.checkoutButton}>
          <h2 className={styles.cardHeaderOrder}>{order.address}</h2>

          <h2 className={styles.cardHeaderText}>Total: {order.total}</h2>

          <span className={styles.cardHeaderDate}>
            {new Date(order.createdAt).toLocaleString()}
          </span>
          </button>
          </Link>
        </div>
    );
  }
  return null; // Skip rendering if the order doesn't match the email
})}
  </div>

        </div>
      </div>
    );
  }


  if (teleport2) {
    // Render the empty container when teleport is true
    return (

      <div className={styles.parentContainer}>

   <div className={styles.container1}>
        
        <div className={styles.userProfileLogo}>
  <Image src="/img/lol.png" alt="" width="142" height="142" className={styles.logoImage} />
</div>
<div className={styles.nameText}>{firstName} {lastName}</div>


       
<div className={styles.buttonWrapper}>
    <button
      className={`${styles.button} ${activeButton === "User profile" ? styles.active : ""}`}
      onClick={handleProfileClick}
    >
      <BsFillPersonFill className={styles.Icon} />
      User profile
    </button>
  </div>

  <div className={styles.buttonWrapper}>
    <button
      className={`${styles.button} ${activeButton === "Sign in & Security" ? styles.active : ""}`}
      onClick={handleTextClick}
    >
      <AiFillLock className={styles.Icon} />
      Sign in & Security
    </button>
  </div>

  <div className={styles.buttonWrapper}>
    <button
      className={`${styles.button} ${activeButton === "Transactions" ? styles.active : ""}`}
      onClick={handleTransactionClick}
    >
      <GrTransaction className={styles.Icon} />
      Transactions
    </button>
  </div>

  <div className={styles.buttonWrapper}>
    <button
      className={`${styles.button} ${activeButton === "Banking Info" ? styles.active : ""}`}
      onClick={handlePointsClick}
    >
      <BsFillPersonFill className={styles.Icon} />
      Points Tracker
    </button>
          </div>
        </div>



        <div className={styles.container2}>
        {points === 500 ? (
          <header className= {`${styles.Title} ${styles.Title}`}><span className={styles.pointsTitle}>Your Points: </span> {points} <span className={styles.ordering}> &nbsp; (Order and get 5% Off)  </span></header>
  ) : (
    <header className= {`${styles.Title} ${styles.Title}`}> <span className={styles.pointsTitle}>Your Points: </span> &nbsp; {points} / 500</header>
    )}
    <button className= {`${styles.checkoutButton} ${styles.orderNowButton}`}>Order Now</button>
        <header className= {`${styles.Title} ${styles.Title}`}> Point Tracker</header>

        <div className={styles.circleContainer}>
       
             
</div>

        </div>
      </div>
    );
  }









  return  (
    <div className={styles.parentContainer}>
   {success && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
          < BsCheck2Circle  className={styles.check}/>

            <div className={styles.popupMessage}>{success}</div>
            <div    className={styles.text}> Please return back to the login page    </div>

            <button onClick={handleLogin} className={styles.popupButton}>Login Now</button>
          </div>
        </div>
      )}


     
<div className={styles.container1}>
  <div className={styles.userProfileLogo}>
    <Image src="/img/lol.png" alt="" width="142" height="142" className={styles.logoImage} />
  </div>
  <div className={styles.nameText}>{firstName} {lastName}</div>

  <div className={styles.buttonWrapper}>
    <button
      className={`${styles.button} ${activeButton === "User profile" ? styles.active : ""}`}
      onClick={handleProfileClick}
    >
      <BsFillPersonFill className={styles.Icon} />
      User profile
    </button>
  </div>

  <div className={styles.buttonWrapper}>
    <button
      className={`${styles.button} ${activeButton === "Sign in & Security" ? styles.active : ""}`}
      onClick={handleTextClick}
    >
      <AiFillLock className={styles.Icon} />
      Sign in & Security
    </button>
  </div>

  <div className={styles.buttonWrapper}>
    <button
      className={`${styles.button} ${activeButton === "Transactions" ? styles.active : ""}`}
      onClick={handleTransactionClick}
    >
      <GrTransaction className={styles.Icon} />
      Transactions
    </button>
  </div>

  <div className={styles.buttonWrapper}>
    <button
      className={`${styles.button} ${activeButton === "Banking Info" ? styles.active : ""}`}
      onClick={handlePointsClick}
    >
      <BsFillPersonFill className={styles.Icon} />
      Points Tracker
    </button>
  </div>

  <div className={styles.moreContent}></div>
</div>

      <div className={styles.container2}>
      
                <div className={styles.inputContainer}>

      <header className={styles.Title}> Profile Setting</header>

          <div className={styles.inputText}>First name:</div>
          <div className={`${styles.inputField1} ${firstNameError && styles.errorInput}`}>
            <input
              type="text"
              name="firstName"
              placeholder="*First Name"
              className={styles.input}
              value={newFirstName} // Use the new state variable here
              onChange={(e) => {
                setNewFirstName(e.target.value);
                setFirstNameError(false); // Reset firstNameError when user changes the input
              }}
            />
         </div>
{firstNameError && (
  <div className={styles.errorMessage2}>
    Last name must be between 2 and 10 characters.
  </div>
)}

          <div className={styles.inputText}>Last name:</div>
          <div className={`${styles.inputField1} ${lastNameError && styles.errorInput}`}>
  <input
    type="text"
    name="lastName"
    placeholder="*Last Name"
    value={newLastName}
    className={styles.input}
    onChange={(e) => {
      setNewLastName(e.target.value);
      if (lastNameError) setLastNameError(false); // Reset the lastNameError state
    }}
  />
</div>
{lastNameError && (
  <div className={styles.errorMessage2}>
    Last name must be between 2 and 10 characters.
  </div>
)}


          <div className={styles.inputText}>Phone Number:</div>
 
          <div className={`${styles.inputField1} ${error && (!phone || phone.length !== 14) && styles.errorInput}`}>
          <input
  type="tel"
  name="phonenumber"
  placeholder="*Phone Number"
  className={styles.input}
  value={phone}
  onChange={(e) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    if (formattedNumber) {
      setPhone(formattedNumber);
      setRawPhone(e.target.value.replace(/\D/g, ''));
    } else {
      setPhone(e.target.value);
    }
  }}
    maxLength={14}
  required
/>


          {error && !phone && <div className={styles.errorMessage2}>Please enter your phone number</div>}
          {error && phone && phone.length !== 14 && (<div className={styles.errorMessage2}>Please enter a valid phone number</div>
          )}
       <div className={styles.profileButtonContainer}>
            <div>  
      <button    className={styles.cancelButton} onClick={handleUpdateRresh}>    Update       
 </button>
        </div>
            <div>  
            <button className={styles.updateButton} onClick={handleCancel}>
    Cancel
  </button>

        </div>
        </div>
          
          </div>
   
        </div>
      </div>
    </div >
  );
};

export const getServerSideProps = async (ctx) => {
  const res = await axios.get("http://localhost:3000/api/products");



  const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default UserProfile;