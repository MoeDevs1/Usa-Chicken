import axios from "axios";
import Image from "next/image";
import styles from "/styles/trackers.module.css";
import AddButton from "/components/AddButton.jsx";
import Add from "/components/Add.jsx";
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';


const trackers = ({ orders, products, admin }) => {

    const [close, setClose] = useState(true);

    const [pizzaList, setPizzaList] = useState(products);
    const status = ["Preparing", "Ready", "Picked Up!"];
    const [emailState, setEmailState] = useState('');
    const [orderList, setOrderList] = useState(orders);
  
    const handleDelete = async (id) => {
      console.log(id);

      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; 

        const res = await axios.delete(
          
          `${baseUrl}/api/products/` + id
        );
        setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
      } catch (err) {
        console.log(err);
      }
    };

   

const handleButtonClick = (event) => {
  setActiveButton(event.target.innerText);
};

const formatPhoneNumber = (number) => {
    const cleaned = ('' + number).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return null;
  };
  

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('/api/getUserDetails');
        const {email } = response.data;

        setEmailState(email);
  

      } catch (error) {
        console.error('Error fetching user details', error);
      }
    };
  
    fetchUserDetails();
  }, []);
      
    return(
        <div className={styles.container}>
    <div className={styles.item}>
  <h1 className={styles.title}>Orders</h1>
  <h5 className={styles.desc}>Click to track specific order</h5>
</div>

<div className={styles.cardContainer}>
{orderList &&
      Array.isArray(orderList) &&
      orderList.length > 0 &&
      orderList.slice().reverse().map((order, index) => {
         if (order.email === emailState) {

    return (
      <div className={styles.cardHeader}>
          <button className={styles.checkoutButton}>
          {/* <h2 className={styles.cardHeaderOrder}>{order.customer}</h2> */}
          <h2 className={styles.cardHeaderOrder}>{order.address}</h2>
          <h2 className={styles.cardHeaderText}>Total: {order.total}</h2>
          <h2 className={styles.cardHeaderText}>Status: {status[order.status]}</h2>
          <span className={styles.cardHeaderDate}>
            {new Date(order.createdAt).toLocaleString()}
          </span>
          </button>
          <div>
          <Link href={`/orders/${order._id}`}>

        <button className={styles.trackButton}>Track Order</button>
        </Link>

      </div>
        </div>
    );
    }
})}
  </div>
  <div className={styles.orderButtonContainer}>
    <Link href="/menu">
  <button className={styles.orderButton}>Order Now</button>
  </Link>
  </div>
        </div>
        
    );
};



export const getServerSideProps = async (ctx) => {  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; 

    const res = await axios.get(`${baseUrl}/api/products`);
  
  
    const productRes = await axios.get(`${baseUrl}/api/products`);
    const orderRes = await axios.get(`${baseUrl}/api/orders`);
  
    return {
      props: {
        orders: orderRes.data,
        products: productRes.data,
      },
    };
  };

export default trackers;