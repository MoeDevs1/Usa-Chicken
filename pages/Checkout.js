import styles from '../styles/Checkout.module.css';
import Image from 'next/image';
import { BsPaypal } from 'react-icons/bs';
import { AiOutlineCreditCard } from 'react-icons/ai';
import React, { useState } from 'react';

import { BsFillCreditCardFill } from 'react-icons/bs';

export default function Checkout() {
  const [selectedTip, setSelectedTip] = useState("10%");

  const handleTipClick = (value) => {
    setSelectedTip(value);
  };

  const isSelected = (value) => {
    return value === selectedTip ? styles.selectedTipButton : "";
  };

  
  return (



    
    <div className={styles.container}>
  
      
      <div className={styles.billingInfo}>
   
        <div className={styles.billingInfoHeader}>
        <div className={styles.billingInfoHeader}>
  <div className={styles.titleContainer}>
    <h1 className={styles.title1}>Billing Information</h1>
    <Image src="/img/credit-card-png-23535.png" alt="" width="200" height="80" />
  </div>
  <div className={styles.creditCardImageContainer}></div>
</div>


        </div>
        <div className={styles.line1}></div> {/* Add this line */}

        <form>
  <div className={styles.formGroup}>
    <input type="text" id="firstName" name="firstName" className={styles.input} placeholder="Enter your first name" />
  </div>
  <div className={styles.formGroup}>
    <input type="text" id="lastName" name="lastName" className={styles.input} placeholder="Enter your last name" />
  </div>
  <div className={styles.formGroup}>
    <input type="text" id="creditCard" name="creditCard" className={styles.input} placeholder="Enter your credit card number" />
  </div>
  <div className={styles.formGroup1}>
    <input type="text" id="cvv" name="cvv" className={styles.smallInput} placeholder="Enter CVV" />
    <input type="text" id="expDate" name="expDate" className={styles.smallInput} placeholder="MM/YY" />
    <input type="text" id="zipCode" name="zipCode" className={styles.smallInput} placeholder="Zip" />
  </div>
  <div className={styles.formGroup1}>
  <label className={styles.rememberPasswordLabel}>
            <input
  type="checkbox"
  className={styles.rememberPasswordCheckbox}

/>
Save Card For Next Purchase        </label>  </div>
</form>
<div>
      <h1 className={styles.title2}>
        Pay Now <span className={styles.icon}><AiOutlineCreditCard size={24} /></span>
      </h1>
      {/* Any other JSX code */}
    </div>
        <div className={styles.line}></div> {/* add this div for the line */}
     
     
     

     <div className={styles.purchaseContainer}>
     <button className={styles.orderNow}>
        <BsFillCreditCardFill size={14} style={{ marginRight: "5px", verticalAlign: "middle" }} />
        <span style={{ verticalAlign: "middle" }}>Order Now</span>
      </button>
    <div>
        <button className={styles.paypal}><BsPaypal size={14} />
Pay with PayPal</button>
</div>
   
   
</div>
      </div>

      <div className={styles.total}>
        <h2 className={styles.title1}>Cart</h2>
        <div className={styles.subtotal}>
          <p>Subtotal:</p>
          <p>$30.00</p>
        </div>
        <div className={styles.tax}>
          <p>Tax:</p>
          <p>$3.00</p>
        </div>
      
        {/* <div className={styles.totalAmount}>
          <p>Total:</p>
          <p>$33.00</p>
        </div> */}
        <div className={styles.buttons}></div>


        <div className={styles.lineTotal}></div> {/* add this div for the line */}
        <h2 className={styles.title1}>Tip</h2>
      <div className={styles.tipContainer}>
        <button
          className={`${styles.tipButton} ${isSelected("10%")}`}
          onClick={() => handleTipClick("10%")}
        >
          10%
        </button>
        <button
          className={`${styles.tipButton} ${isSelected("15%")}`}
          onClick={() => handleTipClick("15%")}
        >
          15%
        </button>
        <button
          className={`${styles.tipButton} ${isSelected("30%")}`}
          onClick={() => handleTipClick("30%")}
        >
          30%
        </button>
        <button
          className={`${styles.tipButton} ${isSelected("other")}`}
          onClick={() => handleTipClick("other")}
        >
          other
        </button>
        <input
          className={styles.tipInput}
          type="number"
          id="custom-amount"
          placeholder=""
        ></input>
      <div className={styles.tipInputContainer}></div>

</div>
        <div className={styles.lineTip}></div> {/* add thislineTip div for the line */}

        <h2 className={styles.title1}>Total</h2>

      </div>
    </div>
  );
}
