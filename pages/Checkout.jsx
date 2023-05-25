import styles from '../styles/Checkout.module.css';
import Image from 'next/image';
import { BsPaypal } from 'react-icons/bs';
import { AiOutlineCreditCard } from 'react-icons/ai';
import { BsFillCreditCardFill } from 'react-icons/bs';
import React, { useContext } from 'react';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { deleteProduct } from "../redux/cartSlice"; // Import the deleteProduct action
import axios from "axios";
import { reset } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";
import CartItems from '../components/CartItems';



export default function Checkout() {
const cart = useSelector((state) => state.cart);
const [open, setOpen] = useState(false);
const [cash, setCash] = useState(false);
const currency = "USD";
const style = { layout: "vertical" };
const dispatch = useDispatch();
const router = useRouter();
const [taxRate, setTaxRate] = useState(0.09); // set tax rate to 8%
const [selectedTip, setSelectedTip] = useState(0);
const [selectedPersonalTip, setSelectedPersonalTip] = useState(0);
const tipAmount = parseFloat(selectedTip) / 100.0 * cart.total;
let personalTip = parseFloat(selectedPersonalTip);
let [points, setPoints] = useState(0); // Initialize with 0 instead of an empty string
const taxAmount = cart.total * taxRate;
const tipAmount10 = parseFloat(10) / 100.0 * cart.total;
const tipAmount15 = parseFloat(15) / 100.0 * cart.total;
const tipAmount30 = parseFloat(30) / 100.0 * cart.total;
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [emailState, setEmailState] = useState('');
const [personalPhone, setpersonalPhone] = useState('');


useEffect(() => {
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('/api/getUserDetails');
      const { firstName, lastName, email, phone, points } = response.data;
      setFirstName(firstName);
      setLastName(lastName);
      setEmailState(email);
      setpersonalPhone(phone)
      setPoints(points)
    } catch (error) {
      console.error('Error fetching user details', error);
    }
  };

  fetchUserDetails();
}, []);

let Discount = 0;
if (points === 100) {
  Discount = 0.10 * cart.total;
}

const handleDeleteProduct = (index) => {
  dispatch(deleteProduct(index));
};


const handleTipClick = (value) => {
  const tipPercentage = parseFloat(value) / 100;
  const tipAmount = tipPercentage * cart.total;
  const roundedTipAmount = roundToTwoDecimals(tipAmount);
  setSelectedPersonalTip(roundedTipAmount);
};

const handleCustomTipChange = (event) => {
  const customTip = event.target.value;
  setSelectedPersonalTip(customTip);
  
  const tipValue = customTip !== '' ? parseFloat(customTip.replace(/^0+/, '')) : 0;
  setSelectedPersonalTip(tipValue);
};


const roundToTwoDecimals = (number) => {
  return Math.round(number * 100) / 100;
};

const handlePersonal = (value) => {
  setSelectedTip(0);
}


const isSelected = (value) => {
  return value === setSelectedTip ? styles.selectedTipButton : "";
};

function handleKeyPress(event) {
  if (event.key === "-") {
    event.preventDefault();
  }
}




if (points === 110 ) {
  points = 10;
}

const updatePointsInDatabase = async (newPoints) => {
  try {
    // Make a request to your backend API to update the points
    await axios.put('/api/updatePoints', { points: newPoints });
    console.log('Points updated successfully in the database');

    // Check if points reach 600, then reset to 0
    if (newPoints === 110) {
      await axios.put('/api/updatePoints', { points: 10 });
      console.log('Points reset to 0');
    }
  } catch (error) {
    console.error('Error updating points in the database', error);
  }
};

let myTotal = cart.total + tipAmount + taxAmount + personalTip - Discount;

if ( myTotal < 0) {
  myTotal = 0;
}

  return (
    <div suppressHydrationWarning>
    <div className={styles.container} >
      <div className={styles.billingInfo}>
        <div className={styles.billingInfoHeader}>
          <div className={styles.titleContainer}>
             <h1 className={styles.titleCart}>Your Cart</h1>
               <Image className={styles.cartImg} src="/img/cartI.png" alt="" width="30" height="30"/>
             </div>
             </div>
             <div className={styles.line1}></div> {/* Add this line */}
             <div className={styles.left}>
             <CartItems suppressHydrationWarning/>
            </div>
          <div>
    </div>
   
     
     


      </div>

      <div className={styles.total}>
        <div>
          <h2 className={styles.title1}>Cart Total</h2>
          <div className={styles.subtotal}>
            <p>Subtotal:</p>
            <p>${cart.total.toFixed(2)}</p>
          </div>
          <div className={styles.tax}>
            <p>Tax:</p>
            <p>${taxAmount.toFixed(2)}</p>
          </div>
          
          {points === 100 ? (

<h5 className={`${styles.tipComment} ${styles.discountComment}`}>Congrats! You've reached 100 points. Enjoy a 10% discount!</h5>
) : (

<h5 className={`${styles.tipComment} ${styles.discountComment}`}>Once you reach 100 points, you'll get a 10% discount!  &nbsp; &nbsp;  <span className={styles.pointComment}>Your points:</span> {points}</h5>
)}
          <div className={styles.tax}>
  <p>Discount:</p>
  {points === 100 ? (
    <>
      <p>$-{Discount.toFixed(2)}</p>
    </>
  ) : (
    <p>$0</p>
  )}
</div>
          <div className={styles.buttons}></div>
          <div className={styles.lineTip}></div> 
          <div className={styles.subtotal}>
            <p>Total:</p>
            <p>${myTotal.toFixed(2)}</p>
          </div>
          <div className={styles.wholePriceArea}>
          {myTotal <= 0 ? (
    <>
          <h5 className={styles.cartEmpty}>Empty cart! Your stomach shouldn't be left hungry. Add items now and return to checkout.</h5>
          <button className={styles.orderNowButton} onClick={() => router.push("/menu")}>
            Order Now
          </button>
          </>
  ) : (
    <button className={styles.checkoutButton} onClick={() => router.push("/pay")}>
    Continue Checkout
  </button> 
   )}

          </div>
        </div>
      

    </div>
    </div>
    </div>
  );
}
