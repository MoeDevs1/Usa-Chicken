import React from 'react';
import styles from  "../styles/Footer.module.css"
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaFacebookF, FaYoutube, FaInstagram } from 'react-icons/fa';



const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.column}>
        <img src="/img/logo.png" alt="Logo" className={styles.logo} />
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
          aliquet lorem. Morbi vitae leo ut nisl tincidunt ullamcorper.
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
      <div className={styles.column}>
        <h3 className={styles.title}>Links</h3>
        <ul className={styles.list}>
          <li className={styles.item}>
            <a href="/" className={styles.link}>
              Home
            </a>
          </li>
          <li className={styles.item}>
            <a href="/about" className={styles.link}>
              About
            </a>
          </li>
          <li className={styles.item}>
            <a href="/menu" className={styles.link}>
              Menu
            </a>
          </li>
          <li className={styles.item}>
            <a href="/contact" className={styles.link}>
              Contact
            </a>
          </li>
          <li className={styles.item}>
            <a href="/privacy-policy" className={styles.link}>
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>

      {/*hours of operation column*/}
      <div className={styles.column}>
       <h3 className={styles.title}>Hours of Operation</h3>
        <p className={styles.text}>Monday - Friday: 9am - 5pm</p>
         <p className={styles.text}>Saturday: 10am - 4pm</p>
        <p className={styles.text}>Sunday: Closed</p>
      </div>

       {/*Address*/}
       <div className={styles.column}>
        <h3 className={styles.title}>Address</h3>
        <p className={styles.text}>
           <FaMapMarkerAlt className={styles.icon} />
           6214 Avenue U, Brooklyn, NY 11234
        </p>
       </div>

      {/* Footer bottom section */}
      <div className={styles.bottom}>
         <p className={styles.text}>Created by MoeDevs</p>
      </div>
    </div>
  );
};

export default Footer;