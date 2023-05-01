import React from 'react';
import styles from  "../styles/Footer.module.css"
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { FaFacebookF, FaYoutube, FaInstagram } from 'react-icons/fa';



const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.column}>
        <img src="/img/logo.png" alt="Logo" className={styles.logo} />
        <p className={styles.description}>
        USA Chicken is a delicious and friendly restaurant that serves up a variety of delicious dishes in a cozy and inviting community setting.
        </p>
        <div className={styles.socials}>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <FaFacebookF className={styles.icon} />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
         <FaYoutube className={styles.icon} />
          </a>
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
       <FaInstagram className={styles.icon} />
       </a>
      </div>
      </div>
      <div className={`${styles.column} ${styles.links}`}>
      <h3 className={`${styles.title} ${styles.firstTitle}`}>Links</h3>
        <ul className={styles.list}>
          <li className={styles.item}>
            <a href="/" className={styles.link}>Home
            </a>
          </li>
          <li className={styles.item}>
            <a href="/menu" className={styles.link}>Menu
            </a>
          </li>
          <li className={styles.item}>
            <a href="/about" className={styles.link}>About
            </a>
          </li>
          <li className={styles.item}>
            <a href="/privacy" className={styles.link}>Privacy Policy
            </a>
          </li>
          <li className={styles.item}>
            <a href="/admin" className={styles.link}>Administrator
            </a>
          </li>
        </ul>
      </div>

      {/*hours of operation column*/}
      <div className={`${styles.column} ${styles.hours}`}>
       <h3 className={styles.title}>Hours of Operation</h3>
        <p className={styles.text}>Monday - Thursday: 11AM - 10:30AM</p>
         <p className={styles.text}>Friday - Sunday: 11AM - 11:30AM</p>
      </div>

       {/*Address*/}
       <div className={styles.column}>
        <h3 className={styles.title}>Address</h3>
        <p className={styles.text}>
           <FaMapMarkerAlt className={styles.icon} />
           990 Elm St, Manchester, NH 03104
        </p>
        <p className={styles.text}>
           <FaPhone className={styles.icon} />

           (603) 232-2934
        </p>
       </div>

      {/* Footer bottom section */}
      <div className={styles.bottom}>
         <p className={styles.text}>Created by MoeDevs© 2023</p>
      </div>
    </div>
  );
};

export default Footer;