import Image from "next/image";
import Link from "next/link";
import styles from  "../styles/Navbar.module.css"
import {useSelector } from "react-redux";
import { useState } from "react";
import { FaHome } from 'react-icons/fa';
import axios from 'axios';

import { FaUtensils, FaInfoCircle, FaPhone } from 'react-icons/fa';
import Login from './Login'; // import the Address component
import { FaBars, FaTimes } from 'react-icons/fa';


const Navbar = ({pizza}) => {

    const [showNav, setShowNav] = useState(false);
    const quantity = useSelector((state) => state.cart.quantity);
    const [showLogin, setShowLogin] = useState(false);

    const handleBackgroundClick = (event) => {
      if (event.target === event.currentTarget) {
        setShowNav(false);
      } else {
        setShowNav(false); // close dropdown when a link is clicked
      }
    };
    const toggleLogin = () => {
      setShowLogin(!showLogin);
    };




    // ... other state variables and functions
  
    const closeLogin = () => {
      setShowLogin(false);
    };
  

    return(
      
      <div className={styles.container}>


{showLogin && (
  <div className={styles.loginWrapper}>
    <button className={styles.closeLoginButton} onClick={toggleLogin}>
      <FaTimes />
    </button>
    <Login />
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
            
              

               <button
  className={styles.Loginbutton}
  style={{ verticalAlign: "middle" }}
  onClick={() => setShowLogin(true)}
>
  Login
</button>
     
      
         <span className={styles.cartSeparator} style={{verticalAlign: "middle"}}>|</span>
                    <Link href="/cart">
               <Image src="/img/cartI.png" alt="Shopping Cart" width={30} height={30} style={{verticalAlign: "middle"}} />
                     </Link>
               <div className={styles.counter}>{quantity}</div>
                  </div>
            </div>
        </div>
    );
};

export default Navbar;