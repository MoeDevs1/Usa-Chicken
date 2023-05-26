import styles from '../styles/Checkout.module.css';
import Image from 'next/image';
import { BsPaypal } from 'react-icons/bs';
import { AiOutlineCreditCard } from 'react-icons/ai';
import { BsFillCreditCardFill } from 'react-icons/bs';
import React, { useContext } from 'react';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import Link from 'next/link';
import { deleteProduct } from "../redux/cartSlice"; // Import the deleteProduct action
import axios from "axios";
import { reset } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";



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
if (points === 500) {
  Discount = 0.05 * cart.total;
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


const createOrder = async (data) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; 
    const res = await axios.post(`${baseUrl}/api/orders`, data);
    if (res.status === 201) {
      dispatch(reset());
      router.push(`/orders/${res.data._id}`);
    }
  } catch (err) {
    console.log(err);
  }
};

if (points === 110 ) {
  points = 10;
}

const updatePointsInDatabase = async (newPoints) => {
  try {
    // Make a request to your backend API to update the points
    await axios.put('/api/updatePoints', { points: newPoints });
    console.log('Points updated successfully in the database');

    // Check if points reach 600, then reset to 0
    if (newPoints === 600) {
      await axios.put('/api/updatePoints', { points: 100 });
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

  const ButtonWrapper = ({ currency, showSpinner }) => {

    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[myTotal.toFixed(2), currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: myTotal.toFixed(2),
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const cartItems = cart.products.map((product) => ({
                product: product._id,
                extras: product.extras.map((extra) => extra._id),
                quantity: product.quantity,
              }));
          
              createOrder({
                customer: firstName + ' ' + lastName,
                address: '990 Elm St, Manchester, NH',
                total: myTotal.toFixed(2),
                method: 6032322934,
                phone: personalPhone,
                email: emailState,
                cart: cartItems,
              });

              if (myTotal > 10) {
                const newPointsValue = points + 10; // Add 100 points to the existing points value
                updatePointsInDatabase(newPointsValue);
              }if(myTotal < 10 && points === 100 ){
                const newPointsValue = points + 10; // Add 100 points to the existing points value
                updatePointsInDatabase(newPointsValue);
              }
            });
          }}
        />
      </>
    );
  };
  
  return (


    
    <div className={styles.container}>

      <div className={styles.billingInfo}>
   
        <div className={styles.billingInfoHeader}>
  <div className={styles.titleContainer}>
    <h1 className={styles.titleCart}>Your Cart</h1>
        <Image className={styles.cartImg} src="/img/cartI.png" alt="" width="30" height="30"/>
  </div>


        </div>
        <div className={styles.line1}></div> {/* Add this line */}

    
<div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th className={styles.columnTitles}>Product</th>
              <th className={styles.columnTitles}>Name</th>
              <th className={styles.columnTitles}>Extras</th>
              <th className={styles.columnTitles}>Quantity</th>
              <th className={styles.columnTitles}>Total</th>
              <th className={styles.columnTitles}>Edit</th>

            </tr>
          </tbody>
          <tbody>
            {cart.products.map((product, index) => (
              <tr className={styles.tr} key={product._id}>
                <td className={styles.td}>
                  <div className={styles.imgContainer}>
                  <span className={styles.images}>

                    <Image
                      className={styles.realImage}
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                    </span>
                  </div>
                </td>
                <td className={styles.td}>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.extras}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                </td>
                <td className={styles.td}>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.totals}>
                    ${product.price * product.quantity}
                  </span>
                </td>
                <td className={styles.td}>
                  <span className={styles.edButtons}>
                  <Link href={`/Products/${product._id}`}>
                  <button className={styles.editButton}
                  onClick={() => handleDeleteProduct(product._id)}
                    
                  >Edit
                  </button>
                  </Link>
                  <button className={styles.deleteButton} onClick={() => handleDeleteProduct(index)}>
          Delete
        </button>
                  </span>
                </td>
          
              </tr>
              
            ))}
          </tbody>
        </table>
        
      </div>
<div>
  
     
    </div>
   
     
     


      </div>

      <div className={styles.total}>
      {open ? (
        
        <div className={styles.paymentMethods}>
           <h1 className={styles.title2}>
        Pay Now <span className={styles.icon}><AiOutlineCreditCard size={24} /></span>
      </h1>
      <div className={styles.lineTotal}></div> {/* add this div for the line */}
      <PayPalScriptProvider
  options={{
    "client-id": "test",
    components: "buttons",
    currency: "USD",
    intent: "capture", // or intent: "purchase"
  }}
>
  <ButtonWrapper currency={currency} showSpinner={false} />
</PayPalScriptProvider>
          <button className={styles.backButton} onClick={() => setOpen(false)}>
  <span className={styles.buttonText}>Go Back to Billing</span>
  <span className={styles.buttonAmount}>${myTotal.toFixed(2)}</span>
</button>
          {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
        </div>
      ) : (
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
          {points === 500 ? (

          <h5 className={`${styles.tipComment} ${styles.discountComment}`}>Congrats! You've reached 100 points. Enjoy a 10% discount! Order must be over $10.</h5>

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

          <div className={styles.lineTotal}></div> {/* add this div for the line */}
          <h2 className={styles.title1}>Tip</h2>
          <h5 className={styles.tipComment}>Spread the love! Tip your order, it's appreciated!</h5>
          <div className={styles.tipContainer}>
            <button
              className={`${styles.tipButton} ${isSelected("10%")}`}
              onClick={() => handleTipClick("10%")}
            >
              10%
              <div className={styles.tipAmountNum}>${tipAmount10.toFixed(2)}</div>
            </button>
            <button
              className={`${styles.tipButton} ${isSelected("15%")}`}
              onClick={() => handleTipClick("15%")}
            >
              15%
              <div className={styles.tipAmountNum}>${tipAmount15.toFixed(2)}</div>
            </button>
            <button
              className={`${styles.tipButton} ${isSelected("30%")}`}
              onClick={() => handleTipClick("30%")}
            >
              30%
              <div className={styles.tipAmountNum}>${tipAmount30.toFixed(2)}</div>
            </button>

            <input
  className={styles.tipInput}
  type="number"
  id="custom-amount"
  name="custom-amount"
  min="0"
  step="1.00"
  value={selectedPersonalTip}
  onChange={handleCustomTipChange}
  onClick={handlePersonal}
  onKeyPress={handleKeyPress} // Add this line
/>
            <div className={styles.tipInputContainer}></div>
          </div>

          <div className={styles.lineTip}></div> {/* add thislineTip div for the line */}
          <div className={styles.subtotal}>
            <p>Total:</p>
            <p>${myTotal.toFixed(2)}</p>
          </div>
          <div className={styles.wholePriceArea}>
          {myTotal <= 0 ? (
    <>
          <button onClick={() => setOpen(false)} className={styles.checkoutButton}>
            Checkout &nbsp; <span className={styles.buttonSentence}>(order cant be $0)</span>
          </button>    </>
  ) : (
    <button onClick={() => setOpen(true)} className={styles.checkoutButton}>
    Checkout
  </button>  )}

          </div>
        </div>
      ) }

    </div>
    </div>

    
  );
}



