import Image from "next/image";
import Link from "next/link";
import styles from  "../styles/Navbar.module.css"
import {useSelector } from "react-redux";
import { useState } from "react";
import { FaBars } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { FaUtensils, FaInfoCircle, FaPhone } from 'react-icons/fa';


const Navbar = ({pizza}) => {

    const [showNav, setShowNav] = useState(false);
    const quantity = useSelector((state) => state.cart.quantity);

    const handleBackgroundClick = (event) => {
      if (event.target === event.currentTarget) {
        setShowNav(false);
      } else {
        setShowNav(false); // close dropdown when a link is clicked
      }
    };

    return(
        <div className={styles.container}>
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
              <Image src="/img/userI.png" alt="user" width={30} height={30} style={{verticalAlign: "middle"}} />
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