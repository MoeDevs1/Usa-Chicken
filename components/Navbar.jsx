import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from  "../styles/Navbar.module.css"
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';

import { FaHome, FaUtensils, FaInfoCircle, FaPhone, FaBars, FaTimes } from 'react-icons/fa';
import Login from './Login'; 
import axios from 'axios';  // Import axios for fetching user details
import { AiOutlineCaretDown } from 'react-icons/ai';

const Navbar = ({pizza}) => {
    const [showNav, setShowNav] = useState(false);
    const quantity = useSelector((state) => state.cart.quantity);
    const [showDropdown, setShowDropdown] = useState(false);

    const [showLogin, setShowLogin] = useState(false);
    const [sessionToken, setSessionToken] = useState(null);
    
    const router = useRouter(); // New hook

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
        
    };
    const redirectToOtherAccount = (event) => {
      event.preventDefault();
      // code to redirect to other account goes here
      console.log("Redirecting to other account");
    }
    const signOut = (event) => {
      event.preventDefault();
      // code to sign out goes here
      console.log("Signing out");
    }
        
    
    const handleSignup = async () => {
        router.push('/Signup');
    }

    const redirectToSettings = () => {
      router.push('/settings');
  };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('/api/getUserDetails');
                if (response.status === 200) {
                    setSessionToken(true);
                } else {
                    setSessionToken(null);
                }
            } catch (error) {
                console.error('Error fetching user details', error);
                setSessionToken(null);
            }
        };
        fetchUserDetails();
    }, []);

    const handleBackgroundClick = (event) => {
        if (event.target === event.currentTarget) {
            setShowNav(false);
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


    return (
      <div className={styles.container}>
        {showLogin && (
          <div className={styles.loginWrapper}>
            <button className={styles.closeLoginButton} onClick={toggleLogin}>
              <FaTimes />
            </button>
            <Login closeLogin={closeLogin} /> {/* Pass closeLogin function here */}
          </div>
        )}
    
        <div className={styles.item}>
          <div className={styles.logo}>
            <Link href="/">
              <Image src="/img/Logo.png" alt="Pizza Logo" width={70} height={70} />
            </Link>
          </div>
        </div>
    
        <div className={styles.item}>
          <button className={styles.menuButton} onClick={() => setShowNav(!showNav)}>
            <FaBars />
          </button>
          <ul className={`${styles.list} ${showNav ? styles.show : ""}`} onClick={handleBackgroundClick}>
            <div className={styles.menuTitle}>
              <h1>USA Chicken</h1>
            </div>
            <li className={styles.listItem}>
              <Link href="/">
                <FaHome className={styles.faIcon} size={24} color="#000" style={{ marginRight: "10px", marginLeft: "-10px"}} />
                Home
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link href="/menu">
                <FaUtensils className={styles.faIcon} size={24} color="#000" style={{ marginRight: "10px", marginLeft: "-10px"}} />
                Menu
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link href="/">
                <FaInfoCircle className={styles.faIcon} size={24} color="#000" style={{ marginRight: "10px", marginLeft: "-10px"}} />
                About
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link href="/">
                <FaPhone className={styles.faIcon} size={24} color="#000" style={{ marginRight: "10px", marginLeft: "-10px"}} />
                Contact
              </Link>
            </li>
          </ul>
        </div>
    
        <div className={styles.item}>
          <div className={styles.cart}>
          {sessionToken ? (
  <>
    <div className={styles.dropdownContainer}>
      <button className={`${styles.userButton} user-button`} onClick={toggleDropdown}> 

      <Image className={`${styles.icon} icon`} src="/img/userI.png" alt="user" width={30} height={30} />
<AiOutlineCaretDown className="dropdown-icon" />
</button>
{showDropdown && (
  <div className={`${styles.dropdownMenu} dropdown-menu`}>
    <div className="menu-item">
      <div className={`${styles.dropDownTitle} icon`}>Account</div>

      <div className={styles.link}>
      <div className={styles.line}></div> {/* add this div for the line */}

        <Link href="#" className={styles.greenLink} onClick={redirectToSettings}>
          Settings
        </Link>
      </div>
      <div className={styles.divder}>
        <Link href="#" className={styles.greenLink} onClick={redirectToOtherAccount}>
          Help
        </Link>
      </div>
    </div>
    <div className={`${styles.dropDownTitle2} icon`}>Other</div>
    <div className={styles.line2}></div> {/* add this div for the line */}

    <div className="menu-item">
      <Link href="#" className={styles.greenLink} onClick={signOut}>
        Sign Out
      </Link>
    </div>
  </div>
      )}
    </div>


    
                <span className={styles.cartSeparator} style={{verticalAlign: "middle"}}>|</span>
                <Link href="/cart">
                  <Image className={styles.icon2} src="/img/cartI.png" alt="Shopping Cart" width={30} height={30} style={{verticalAlign: "middle"}} />
                </Link>
                <div className={styles.counter}>{quantity}</div>
              </>
            ) : (
              <>
                <button className={styles.Loginbutton} onClick={() => setShowLogin(true)}>
                  Login
                </button>
                <button className={styles.signUpButton} onClick={handleSignup}>
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
};

export default Navbar;