

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
import { useSession, signOut as nextAuthSignOut } from 'next-auth/react';
import { FaHome, FaUtensils, FaInfoCircle, FaPhone, FaBars, FaTimes } from 'react-icons/fa';
import Login from './logComp';
import axios from 'axios';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaRegHandshake } from 'react-icons/fa';
import { ImCool } from 'react-icons/im';



const Navbar = ({ pizza }) => {
  const [showNav, setShowNav] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');

  const dropdownRef = useRef(null); // Create a ref for the dropdown container

  const router = useRouter();
  

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const redirectToOtherAccount = (event) => {
    event.preventDefault();
    console.log("Redirecting to other account");
  };

  const handleSignup = async () => {
    router.push('/Signup');
  };

  const redirectToSettings = () => {
    router.push('/userProfile');
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('/api/getUserDetails');
        if (response.status === 200) {
          setSessionToken(true);
          const { firstName, lastName } = response.data;
          setNewFirstName(firstName);
          setNewLastName(lastName);
        } else {
          setSessionToken(null);
        }
      } catch (error) {
        console.error('Error fetching user details', error);
        setSessionToken(null);
      }
    };

    fetchUserDetails();
  }, [sessionToken]);



  const signOut = async () => {
    try {
      let session = null;
      let response = null;
  
      try {
        session = await axios.get('/api/getUserDetails');
      } catch (error) {
        console.error('Error getting session details', error);
      }
  
      try {
        response = await axios.get('/api/getUserDetails?signout=true');
      } catch (error) {
        console.error('Error signing out', error);
      }
  
      if (session && session.data) {
        await nextAuthSignOut();
      }
  
      if (response && response.status === 200) {
        setSessionToken(null);
      } else {
        console.error('Error signing out');
      }
    } catch (error) {
      console.error('Error signing out', error);
    }
  };
  




  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowNav(false);
      setShowDropdown(false); // Hide the dropdown when clicking away from it
    } else {
      setShowNav(false);
    }
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.container}>
          {showNav && <div className={styles.blurBackground} onClick={handleBackgroundClick} />}

      {showLogin && (
        <div className={styles.loginWrapper}>
          <button className={styles.closeLoginButton} onClick={toggleLogin}>
            <FaTimes />
          </button>
          <Login closeLogin={closeLogin} />
        </div>
      )}
  
     
     
     
      <div className={styles.item1}>
          <Link href="/">
            <Image src="/img/Logo.png" alt="Pizza Logo" width={65} height={65}    className={styles.logo}/>
 

            
          </Link>
      </div>

      {sessionToken && (

      <div className={styles.item}>
  <button className={styles.menuButton} onClick={() => setShowNav(!showNav)}>
    <FaBars className={styles.bars} />
  </button>
  <ul className={`${styles.list} ${showNav ? styles.show : ""}`} onClick={handleBackgroundClick}>
    <div className={styles.menuTitle}>
      <div className={styles.logocontainer}>
        <Link href="/">
          <Image src="/img/Logo.png" alt="Pizza Logo" width={140} height={145} className={styles.s}/>
        </Link>
      </div>
      <button className={styles.signUpButton3} onClick={() => setShowLogin(true)}>
      {newFirstName} {newLastName}      </button>
    </div>

    {showNav && (
      <button className={styles.closeButton} onClick={() => setShowNav(false)}>
        <FaTimes className={styles.closeIcon} />
      </button>
    )}

    <li className={styles.listItem}>
      <div className={styles.line0}></div>
    </li>
    <li className={styles.listItem}>
      <Link className={styles.fontstlye} href="/">Home</Link>
    </li>
    <li className={styles.listItem}>
      <Link className={styles.fontstlye} href="/menu">Menu</Link>
    </li>
    <li className={styles.listItem}>
      <Link className={styles.fontstlye} href="/trackers">Trackers</Link>
    </li>
    <li className={styles.listItem}>
      <Link className={styles.fontstlye}  href="/contact">Contact</Link>
    </li>
  </ul>
</div>
)}
    {!sessionToken && (

<div className={styles.item}>
<button className={styles.menuButton} onClick={() => setShowNav(!showNav)}>
<FaBars className={styles.bars} />
</button>
<ul className={`${styles.list} ${showNav ? styles.show : ""}`} onClick={handleBackgroundClick}>
<div className={styles.menuTitle}>
<div className={styles.logocontainer}>
  <Link href="/">
    <Image src="/img/Logo.png" alt="Pizza Logo" width={140} height={145} className={styles.s}/>
  </Link>
</div>
<button className={styles.signUpButton3} onClick={() => setShowLogin(true)}>
  Sign In & Earn Rewards
</button>
</div>

{showNav && (
<button className={styles.closeButton} onClick={() => setShowNav(false)}>
  <FaTimes className={styles.closeIcon} />
</button>
)}

<li className={styles.listItem}>
<div className={styles.line0}></div>
</li>
<li className={styles.listItem}>
<Link className={styles.fontstlye} href="/">Home</Link>
</li>
<li className={styles.listItem}>
<Link className={styles.fontstlye} href="/menu">Menu</Link>
</li>

<li className={styles.listItem}>
<Link className={styles.fontstlye}  href="/contact">Contact</Link>
</li>
</ul>
</div>
)}








  
      <div className={styles.item}>
        <div className={styles.cart}>
          {sessionToken ? (
            <>
              <div className={styles.dropdownContainer} ref={dropdownRef}>
                <button className={`${styles.userButton} user-button`} onClick={toggleDropdown}>
                  <Image className={`${styles.iconn} icon`} src="/img/userI.png" alt="user" width={40} height={40} />
                </button>
                {showDropdown && (
                  <div className={`${styles.dropdownMenu} dropdown-menu`}>
                    <div className="menu-item">
  
                      <div className={styles.userProfileLogo}>
                      </div>
                      <div className={styles.Title}></div>

                      <div className={styles.head}>
            
            <Image src="/img/Logo.png" alt="" width="122" height="122" />
          </div>
                      <div className={`${styles.dropDownTitle1}  icon`}> {newFirstName} {newLastName}</div>

                      <div className={styles.line}></div>

  
                      <div className={`${styles.link} ${styles.flexContainer}`}>
                        <Link href="#" className={styles.greenLink} onClick={redirectToSettings}>
                        <AiOutlineSetting className={styles.Icon}/>   Settings & Privacy      

              </Link>
              <div className={styles.divder}></div> {/* you might want to adjust the styling of this divider */}
              <Link href="#" className={styles.greenLink} onClick={redirectToOtherAccount}>

              <BiHelpCircle className={styles.Icon} />     Help     

              </Link>
              
            </div>
          </div>

          {/* <div className={`${styles.dropDownTitle3} icon`}>Other</div> */}
          <div className={styles.line2}></div> {/* add this div for the line */}


          <div className="menu-item">
            <Link href="#" className={styles.greenLink} onClick={signOut}>

            <FaSignOutAlt className={styles.Icon} />   Sign Out     


              <div className={styles.line3}></div> {/* add this div for the line */}

            </Link>
          </div>
        </div>
      )}
    </div>



    
                <span className={styles.cartSeparator} style={{verticalAlign: "middle"}}>|</span>
               
                <div className={styles.counter}>{quantity}</div>
              </>
            ) : (
              <>

              <div className={styles.ButtonContainer}> </div>
                <button className={styles.Loginbutton} onClick={handleSignup}>
                Sign Up
                </button>
                <button className={styles.signUpButton}  onClick={() => setShowLogin(true)}>
                  Login
                </button>
              </>
            )}
          </div>
        </div>
       
       
        {sessionToken && (
        <Link href="/Checkout">
          <Image className={styles.icon2} src="/img/cartI.png" alt="Shopping Cart" width={30} height={30} style={{verticalAlign: "middle"}} />
        </Link>
      )}
  
      </div>
    );
};

export default Navbar;
