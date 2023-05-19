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
import { firstName, lastName } from '/pages/UserProfile'; // Replace './UserProfile' with the correct path to the file containing the variables



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
const taxAmount = cart.total * taxRate;
const myTotal = cart.total + tipAmount + taxAmount + personalTip;
const tipAmount10 = parseFloat(10) / 100.0 * cart.total;
const tipAmount15 = parseFloat(15) / 100.0 * cart.total;
const tipAmount30 = parseFloat(30) / 100.0 * cart.total;
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');

useEffect(() => {
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('/api/getUserDetails');
      const { firstName, lastName, phone } = response.data;
      setFirstName(firstName);
      setLastName(lastName);
      setPhone(formatPhoneNumber(phone));
      setRawPhone(phone); // Set the raw phone number
      setNewFirstName(firstName);
      setNewLastName(lastName);
    } catch (error) {
      console.error('Error fetching user details', error);
    }
  };

  fetchUserDetails();
}, []);


const handleDeleteProduct = (productId) => {
  dispatch(deleteProduct(productId));
};
  
const handleTipClick = (value) => {
  setSelectedTip(value);
  personalTip = 0;
  setSelectedPersonalTip(0);
}

const handlePersonal = (value) => {
  setSelectedTip(0);
}

const handleCustomTipChange = (event) => {
  setSelectedPersonalTip(event.target.value);

};

const isSelected = (value) => {
  return value === setSelectedTip ? styles.selectedTipButton : "";
};




const createOrder = async (data) => {
  try {
    const res = await axios.post("http://localhost:3000/api/orders", data);
    if (res.status === 201) {
      dispatch(reset());
      router.push(`/orders/${res.data._id}`);
    }
  } catch (err) {
    console.log(err);
  }
};

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
              createOrder({
                customer: firstName + ' ' + lastName,
                address: '990 Elm St, Manchester, NH',
                total: myTotal.toFixed(2),
                method: 1234,
              });
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
        <div className={styles.billingInfoHeader}>
  <div className={styles.titleContainer}>
    <h1 className={styles.titleCart}>Your Cart</h1>
        <Image className={styles.cartImg} src="/img/cartI.png" alt="" width="30" height="30"/>
  </div>
</div>


        </div>
        <div className={styles.line1}></div> {/* Add this line */}

    
<div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Edit</th>

            </tr>
          </tbody>
          <tbody>
            {cart.products.map((product) => (
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
                  <button className={styles.deleteButton}
                      onClick={() => handleDeleteProduct(product._id)}
                    >Delete</button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

<div>
      <h1 className={styles.title2}>
        Pay Now <span className={styles.icon}><AiOutlineCreditCard size={24} /></span>
      </h1>
    </div>
        <div className={styles.line}></div> 
     
     
     

     <div className={styles.purchaseContainer}>
    <div>
      <div className={styles.paypal} >
      <PayPalScriptProvider
  options={{
    "client-id": "test",
    components: "buttons",
    currency: "USD",
    "disable-funding": "paylater",
  }}
>
<ButtonWrapper currency={currency} showSpinner={false} style={{ width: '200px' }} />
</PayPalScriptProvider>



      {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}

         
        </div>
</div>
   
</div>
      </div>

      <div className={styles.total}>
        <h2 className={styles.title1}>Cart Total</h2>
        <div className={styles.subtotal}>
          <p>Subtotal:</p>
          <p>${cart.total.toFixed(2)}</p>
        </div>
        {/* <div className={styles.tax}>
          <p>Discount:</p>
          <p>$0</p>
        </div> */}
        <div className={styles.tax}>
          <p>Tax:</p>
          <p>${taxAmount.toFixed(2)}</p>
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
      />
      <div className={styles.tipInputContainer}></div>

</div>
        <div className={styles.lineTip}></div> {/* add thislineTip div for the line */}
        <div className={styles.subtotal}>
          <p>Total:</p>
          <p>${myTotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
    
  );
}

