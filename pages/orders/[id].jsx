import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from "axios";
import { AiOutlineCreditCard } from "react-icons/ai";
import { formatPhoneNumber } from 'libphonenumber-js';
import { useEffect, useState } from "react";
import { phone as userProfilePhone } from '/pages/UserProfile'; // Replace './UserProfile' with the correct path to the file containing the variables


const Order = ({ order, products }) => {
  const status = order.status;

  const [phone, setPhone] = useState('');
  const [rawPhone, setRawPhone] = useState('');

  


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
        <div className={statusClass(1)}>
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
        <div className={statusClass(3)}>
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
          {/* <div className={styles.totalText}>
            <b className={`${styles.totalTextTitle} ${styles.phoneText}`}>Email: </b>{order.email}
          </div>
          <div className={styles.totalText}>
            <b className={`${styles.totalTextTitle} ${styles.phoneText}`}>Email: </b>{order.phone}
          </div> */}
          {/* <div className={styles.totalText}>
          <b className={styles.totalTextTitle}>Phone: </b>{phone}
          </div> */}
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
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
  const productRes = await axios.get("http://localhost:3000/api/products");

  return {
    props: { 
      order: res.data,
      products: productRes.data,
    },

  };
};

export default Order;


//-----------------------------------