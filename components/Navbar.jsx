import Image from "next/image";
import Link from "next/link";
import styles from  "../styles/Navbar.module.css"
import {useSelector } from "react-redux";

const Navbar = ({pizza}) => {

    const quantity = useSelector((state) => state.cart.quantity);

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
                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        <Link href="/">Home</Link>
                    </li>
                    <li className={styles.listItem}>
                        <Link href="/menu">Menu</Link>
                        {/* <ul className={styles.sublist}>
                            <li className={styles.dropdownItem}><Link href="/menu/pizza">Pizza</Link></li>
                            <li className={styles.dropdownItem}><Link href="/menu/pasta">Pasta</Link></li>
                            <li className={styles.dropdownItem}><Link href="/menu/dessert">Dessert</Link></li>
                        </ul> */}
                    </li>
                    <li className={styles.listItem}>
                        <Link href="/products">About</Link>
                    </li>
                    <li className={styles.listItem}>
                        <Link href="/contact">Contact</Link>
                    </li>
                </ul>
            </div>
            <div className={styles.item}>
                 <div className={styles.cart}>
              <Image src="/img/user.png" alt="Shopping Cart" width={30} height={30} style={{verticalAlign: "middle"}} />
                    <span className={styles.cartSeparator} style={{verticalAlign: "middle"}}>|</span>
                    <Link href="/cart">
               <Image src="/img/cart.png" alt="Shopping Cart" width={30} height={30} style={{verticalAlign: "middle"}} />
                     </Link>
               <div className={styles.counter}>{quantity}</div>
                  </div>
                {/* <div className={styles.callbutton}>
                    <Link href="/products">
                        Start Order
                    </Link>
                </div> */}
            </div>
        </div>
    );
};

export default Navbar;