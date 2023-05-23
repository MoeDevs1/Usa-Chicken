import styles from "../styles/signPoints.module.css";
import Link from 'next/link';
import Image from 'next/legacy/image'
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
import React, { useState, useEffect, useRef } from 'react';



const signPoints = () => {
    const [showNav, setShowNav] = useState(false);
    const quantity = useSelector((state) => state.cart.quantity);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [sessionToken, setSessionToken] = useState(null);
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [emailState, setEmailState] = useState('');
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
          const { firstName, lastName, email } = response.data;
          setNewFirstName(firstName);
          setNewLastName(lastName);
          setEmailState(email);
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
        <div className={styles.signupContainer}>

            <div>
              {showLogin && (
                <div className={styles.loginWrapper}>
                  <button className={styles.closeLoginButton} onClick={toggleLogin}>
                    <FaTimes />
                  </button>
                  <Login closeLogin={closeLogin} />
                </div>
              )}
    
              <div className={styles.imageContainer}>
                <Image className={styles.signImg} src="/img/logo.png" alt="" width={300} height={300} />
              </div>
              <div className={styles.textContainer}>
                <h2 className={styles.signupP}>Sign up <span className={styles.earnPoints}>and earn points!</span></h2>
                <p className={styles.signupDesc}>Join USA-Chicken®. Earn points with every qualifying purchase. Redeem available rewards of your choice.</p>
                <div className={styles.deliveryOptions}>
                  <Link href="/Signup">
                    <button className={styles.signupButton}>Sign Me Up!</button>
                  </Link>
                </div>
                <h5 className={styles.lastSign}>Already have an account? <span className={styles.signin} onClick={() => setShowLogin(true)}>Sign-in</span></h5>
              </div>
            </div>
        </div>
      );
};

export default signPoints;