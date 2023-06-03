import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from "axios";
import { AiOutlineCreditCard } from "react-icons/ai";
import { formatPhoneNumber } from 'libphonenumber-js';
import { useEffect, useState} from "react";
import { Route, Router } from "react-router-dom";
import { useRouter } from 'next/router';


const Order = ({ order, products }) => {
  const status = order.status;
  const [phone, setPhone] = useState('');
  const [rawPhone, setRawPhone] = useState('');
  const [pollingIntervalId, setPollingIntervalId] = useState(null);
  // const router = useRouter();
  // const [reloadPage, setReloadPage] = useState(false);

  // useEffect(() => {
  //   if (order.status === 1 && !reloadPage) {
  //     setReloadPage(true);
  //   }
  // }, [order.status]);
  
  // useEffect(() => {
  //   if (reloadPage) {
  //     setTimeout(() => {
  //       window.location.reload();
  //       setReloadPage(false);
  //     }, 5000);
  //   }
  // }, [reloadPage]);

  // const [statuss, setStatus] = useState(0);

  // useEffect(() => {
  //   const timer1 = setTimeout(() => {
  //     setStatus(1);
  //   }, 60000); // 1 minute

  //   const timer2 = setTimeout(() => {
  //     setStatus(2);
  //   }, 120000); // 2 minutes

  //   return () => {
  //     clearTimeout(timer1);
  //     clearTimeout(timer2);
  //   };
  // }, []);
  
  // Inside your app.js or main page script

// Function to check if the response has a 500 status code
function isInternalServerError(response) {
  return response.status === 500;
}

// Function to reload the page after a delay
function reloadPageWithDelay(delay) {
  setTimeout(function() {
    window.location.reload();
  }, delay);
}

// Make an AJAX request or fetch API call
fetch('your-api-endpoint')
  .then(function(response) {
    // Check if the response has a 500 status code
    if (isInternalServerError(response)) {
      // Reload the page after a delay (e.g., 3 seconds)
      reloadPageWithDelay(3000);
    } else {
      // Process the successful response
      // ...
    }
  })
  .catch(function(error) {
    // Handle network or other errors
    console.error(error);
  });

  
  function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
  }
  
  const formattedPhoneNumber = formatPhoneNumber(order.method);


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('/api/getUserDetails');
        const { firstName, lastName, phone } = response.data;
        setFirstName(firstName);
        setLastName(lastName);
        setUserPhone(formatPhoneNumber(phone));
        setRawPhone(phone); // Set the raw phone number
        setNewFirstName(firstName);
        setNewLastName(lastName);
        setNewLastName(lastName);
      } catch (error) {
        console.error('Error fetching user details', error);
      }
    };


  let newNum = 0;

  function changeNewNum() {
    setTimeout(() => {
      newNum = 1;
      console.log("newNum has changed to 1");
    }, 1000); // 5 minutes in milliseconds
  }

  
    changeNewNum();
    fetchUserDetails();
  }, []);

  

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };


  return (
    <div className={styles.newContainer}>
    <div className={styles.tracker}>
    <h1 className={styles.title}>Order Tracker</h1>
   


      <div className={styles.row}>
        <div className={statusClass(0)}>
          <Image src="/img/paid.png" width={30} height={30} alt="" />
          <span className={styles.text}>Payment</span>
          <div className={styles.checkedIcon}>
            <Image
              className={styles.checkedIcon}
              src="/img/checked.png"
              width={20}
              height={20}
              alt=""
            />
          </div>
        </div>
        <div className={statusClass(1)}>
          <Image src="/img/bake.png" width={30} height={30} alt="" />
          <span className={styles.text}>Preparing</span>
          <div className={styles.checkedIcon}>
            <Image
              className={styles.checkedIcon}
              src="/img/checked.png"
              width={20}
              height={20}
              alt=""
            />
          </div>
        </div>
        <div className={statusClass(2)}>
          <Image src="/img/almostDone.png" width={30} height={30} alt="" />
          <span className={styles.text}>Ready</span>
          <div className={styles.checkedIcon}>
            <Image
              className={styles.checkedIcon}
              src="/img/checked.png"
              width={20}
              height={20}
              alt=""
            />
          </div>
        </div>
        <div className={statusClass(1)}>
          <Image src="/img/delivered.png" width={30} height={30} alt="" />
          <span className={styles.text}>Picked Up!</span>
<div className={`${styles.checkedIcon} ${styles.checkedIcons}`}>
            <Image
              className={styles.checkedIcon}
              src="/img/checked.png"
              width={20}
              height={20}
              alt=""
            />
          </div>
          
        </div>
      </div>
      </div>
    <div className={styles.container}>




      <div className={styles.billingInfo}>
      <div className={styles.titleContainer}>
    <h1 className={styles.titleCart}>Your Cart</h1>
        <Image className={styles.cartImg} src="/img/cartI.png" alt="" width="30" height="30"/>
  </div>
  <div className={styles.line1}></div> {/* Add this line */}
  <table className={styles.table}>
    <tbody>
      <tr className={styles.totalText}>
        <th className={styles.totalTextTitles}>Image</th>
        <th className={styles.totalTextTitle}>Product</th>
        <th className={styles.totalTextTitle}>Quantity</th>
        <th className={styles.totalTextTitle}>Extras</th>
        <th className={styles.totalTextTitle}>Price</th>

      </tr>
      {order.cart.map((item) => {
        const product = products.find((product) => product._id === item.product);
        const title = product ? product.title : 'Product not found';
        const price = product ? product.prices[0] : 'Price not found';
        const img = product ? product.img : 'Product not found';
        const extras = product && product.extraOptions
          ? item.extras.map((extraId) => {
              const extraOption = product.extraOptions.find((extra) => extra._id === extraId);
              return extraOption ? extraOption.text : 'Extra not found';
            })
          : [];

          const extrasPrice = product && product.extraOptions
  ? item.extras.reduce((totalPrice, extraId) => {
      const extraOption = product.extraOptions.find((extra) => extra._id === extraId);
      return extraOption ? totalPrice + extraOption.price : totalPrice;
    }, 0)
  : 0;
        return (
          <tr className={styles.products} key={item.product}>
            <td>
              <img className={styles.productImages} src={img} alt="Product Image" width={50} height={50} />
            </td>
            <td className={`${styles.cartTitle} ${styles.newTitle}`}>{title}</td>
            <td className={styles.cartTitle}>{item.quantity}</td>
            <td className={styles.cartTitle}>{extras.join(", ")}</td>
            <td className={styles.cartTitle}>{price * item.quantity}</td>

          </tr>
        );
      })}
    </tbody>
  </table>
      
      </div>


      <div className={styles.total}>
      <div className={styles.titleContainer}>
    <h1 className={styles.titleCart}>Order Details</h1>
    <span className={styles.icon}><AiOutlineCreditCard size={30} /></span>
      </div>
  <div className={styles.lineTotal}></div> {/* add this div for the line */}



            <div className={styles.totalText}>
            <b className={`${styles.totalTextTitle} ${styles.phoneText}`}>Order ID: </b>{order._id}
            {/* // .slice(0, 6)}... */}
          </div>
          <div className={styles.totalText}>
            <b className={`${styles.totalTextTitle} ${styles.phoneText}`}>Customer: </b>{order.customer}
          </div>
          <div className={styles.totalText}>
            <b className={`${styles.totalTextTitle} ${styles.phoneText}`}>Address: </b>{order.address}
          </div>
          <div className={styles.totalText}>
            <b className={`${styles.totalTextTitle} ${styles.phoneText}`}>Store Phone: </b>{formattedPhoneNumber}
          </div>
          <div className={styles.totalText}>
            <b className={`${styles.totalTextTitle} ${styles.phoneText}`}>Total: </b>${order.total.toFixed(2)} 
          </div>
       
        
          <div className={styles.wholePriceArea}>
          <button className={styles.checkoutButton}>
            Paid
          </button>
          </div>
</div>



    </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Replace with your environment variable name

  const res = await axios.get(`${baseUrl}/api/orders/${params.id}`);
  const productRes = await axios.get(`${baseUrl}/api/products`);

  return {
    props: { 
      order: res.data,
      products: productRes.data,
    },

  };
};

export default Order;


