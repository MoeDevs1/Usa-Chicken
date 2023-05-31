import React from 'react';
import styles from  "../styles/Footer.module.css"
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { FaFacebookF, FaYoutube, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';



const Footer = () => {
  return (
    <div className={styles.footer}>

{/* <div className={styles.delivery}>
  <h2 className={styles.deliveryTitle}>Delivery Options</h2>
  <p className={styles.deliveryP}>Enjoy the convenience of delivery through popular services like DoorDash, Grubhub, and UberEats. Order your favorite meals and have them delivered right to your doorstep. We partner with trusted delivery providers to ensure a seamless and reliable experience for our customers.</p>

  <div className={styles.deliveryOptions}>
  <a href="https://www.ubereats.com/store/usa-chicken-%26-biscuit/3dYWUZGfRDqHxTYxFni34A" target="_blank">
    <Image className={styles.deliveryLogo} src="/img/ubereats.png" alt="UberEats" width={100} height={100} />
  </a>
  <a href="https://www.grubhub.com/restaurant/usa-chicken--biscuit-990-elm-st-manchester/1105914" target="_blank">
    <Image className={styles.deliveryLogo} src="/img/grubhub.png" alt="Grubhub" width={100} height={100} />
  </a>
  <a href="https://www.doordash.com/store/usa-chicken-&-biscuit-manchester-675957/" target="_blank">
    <Image className={styles.deliveryLogo} src="/img/doordash.png" alt="DoorDash" width={100} height={100} />
  </a>
</div>
</div> */}
      <div className={styles.column}>
        <img src="/img/—Pngtree—burger with melting cheese flat_5511393.png" alt="Logo" className={styles.logo} />
        <p className={styles.description}>
        USA Chicken is a delicious and friendly restaurant that serves up a variety of delicious dishes in a cozy and inviting community setting.
        </p>
        <div className={styles.socials}>
          <a href="https://www.facebook.com/USAChickenManchester/" target="_blank" rel="noreferrer">
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

           <a href="tel:+16032322934" className={styles.phoneNumber}>(603) 232-2934</a>
        </p>
       </div>


      {/* Footer bottom section */}
      <div className={styles.bottom}>
      {/* <Image className={styles.text} src="/img/credit-card-png-23535.png" alt="name" width="200" height="80" /> */}
         <p className={styles.text}>Created by Devs© 2023</p>
      </div>

 
    </div>
  );
};

export default Footer;