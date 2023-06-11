import axios from "axios";
import { useState } from "react";
import styles from "/styles/allOrders.module.css";
import Link from 'next/link';
import { FaHome, FaUtensils, FaInfoCircle, FaPhone, FaBars, FaTimes, FaCircle} from 'react-icons/fa';
import React, { useEffect } from 'react';


const CustomerOrders = ({ orders, products, admin }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [prevselectedOrder, setprevSelectedOrder] = useState(null);
  const [orderList, setOrderList] = useState(orders);
  const [phone, setPhone] = useState(0);
  const [firstName, setFirstName] = useState('');
  const status = ["Preparing", "Ready for Pick Up"];
  const [formOpen, setformOpen] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [pollingIntervalId, setPollingIntervalId] = useState(null);



  const fetchOrders = async () => {
    try {
      // Make the API request to fetch the orders
      const response = await axios.get('/api/orders');
      const data = response.data;
  
      // Update the orderList state with the fetched data
      setOrderList(data);
 
    } catch (error) {
      // Handle any error that occurs during the fetch
      console.error('Error fetching orders:', error);
    }
  };
  
  
  const startPolling = () => {
    const intervalId = setInterval(() => {
      fetchOrders(); // Fetch orders at the specified interval
    }, 5000); // 5000 milliseconds (5 seconds) interval, adjust as needed
  
    // Save the interval ID to a state variable
    setPollingIntervalId(intervalId);
  };



  useEffect(() => {
    fetchOrders(); // Fetch orders when the component mounts
    startPolling(); // Start polling for updates
  
    return () => {
      // Clean up the polling interval when the component unmounts
      clearInterval(pollingIntervalId);
    };
  }, []);
  
  

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
        const { firstName, lastName, phone, email, points } = response.data;
        setFirstName(firstName);
        setLastName(lastName);
        setEmailState(email);
        setPhone(phone);
        setRawPhone(phone); // Set the raw phone number
        setNewFirstName(firstName);
        setNewLastName(lastName);
        setPoints(points);
      } catch (error) {
        console.error('Error fetching user details', error);
      }
    };
  
    fetchUserDetails();
  }, []);
  
  const handleOrderClick = (orderId) => {
    if (selectedOrder === orderId) {
      setSelectedOrder(null);

    } else {
      setSelectedOrder(orderId);
    }
  };
  

  const handleStatus = async (id, currentStatus) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; 
    try {
      const res = await axios.put(
        `${baseUrl}/api/orders/`+ id,
        {  
          status: currentStatus + 1,
        }
      );

      if (currentStatus === 3) {
        await axios.delete( `${baseUrl}/api/orders/` + id);
        setOrderList(orderList.filter((order) => order._id !== id));
      } else {
        setOrderList([
          res.data,
          ...orderList.filter((order) => order._id !== id),
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const orderList0 = orderList.filter((order) => order.status === 0);
const orderListCount = orderList0.length;

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
      </nav>
      <div className={styles.sidebar}>
  <div className={styles.topSideBar}>
    <Link href="/admin">
      <span className={styles.backButton}><FaBars className={styles.FaBars}/> </span>
    </Link>
    <span className={styles.title}>History</span>
  </div>
  <div className={styles.topSideBar2}>
    <span className={styles.kitchenTitle}>Last 100 Orders</span>
    <span className={styles.orderCount}>{orderList.length} Orders</span>
  </div>
  <ul className={styles.orderList}>
    {orderList.slice(-100).reverse().map((order) => {
      if (order.status > 0) {
        const readyForPickupTime = new Date(new Date(order.createdAt).getTime() + 15 * 60000).toLocaleString([], {
          hour12: false, // Ensure consistent 24-hour format
        });

        return (
          <li
            key={order._id}
            className={`${styles.order} ${selectedOrder === order._id ? styles.selected : ""}`}
            onClick={() => handleOrderClick(order._id)}
          >
            <span className={styles.orderPicking}>Picking up</span>
            <p className={styles.customer}><span className={styles.firstLetter}>{order.customer.slice(0,1)}</span>{order.customer.slice(1)}</p>
            <p className={styles.orderId}>#{order._id.slice(0, 8)}...</p> 
            <span className={styles.orderTime}>Order made: {readyForPickupTime}</span>
          </li>
        );
      }

      return null;
    })}
  </ul>
</div>

      <div className={styles.cart}>
            <h2 className={styles.cartTitle}>Order Details</h2>
            {selectedOrder && (
  <>
    {selectedOrder && orderList.find((order) => order._id === selectedOrder) ? (
      <div className={styles.orderDetails}>
        <span className={styles.details}><span className={styles.header}>Order ID:</span>{orderList.find((order) => order._id === selectedOrder)._id.slice(0, 8)}...</span>
        <span className={styles.details}><span className={styles.header}>Customer:</span> <span className={styles.firstLetter}>{orderList.find((order) => order._id === selectedOrder).customer.slice(0, 1)}</span>{orderList.find((order) => order._id === selectedOrder).customer.slice(1)}</span>
        <span className={styles.details}>
        <span className={styles.header}>Items: </span>
          {orderList
            .find((order) => order._id === selectedOrder)
            .cart.reduce((total, item) => total + item.quantity, 0)}
        </span>
          <span className={styles.details}><span className={styles.header}>Total: </span> {orderList.find((order) => order._id === selectedOrder).total}</span>
          <span className={styles.details}><span className={styles.header}>Phone: </span> {formatPhoneNumber(orderList.find((order) => order._id === selectedOrder).phone)}</span>

        </div>
    ) : null}

            <div className={styles.cartItems}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={`${styles.th} ${styles.thTitle}`}>Product</th>
                    <th className={`${styles.th} ${styles.thTitle}`}>Quantity</th>
                    <th className={`${styles.th} ${styles.thTitle}`}>Extras</th>
                  </tr>
                </thead>
                <tbody>
  
                {orderList
                    .find((order) => order._id === selectedOrder)
                    .cart.map((item) => {
                      const product = products.find(
                        (product) => product._id === item.product
                      );
                      const title = product ? product.title : "Product not found";
                      const price = product ? product.price : "Product not found";

                      const extras = product && product.extraOptions
                        ? item.extras.map((extraId, index) => {
                            const extraOption = product.extraOptions.find(
                              (extra) => extra._id === extraId
                            );
                            const num = index + 1;
                            return extraOption
                              ? `${num}. ${extraOption.text}`
                              : "Extra not found";
                          })
                        : [];
                      return (
                        <tr className={styles.cartItem}>
                          <td className={`${styles.th} ${styles.thMain}`}>
                            {title}
                          </td>
                          <td className={`${styles.th} ${styles.thMain}`}>
                            {item.quantity}
                          </td>
                          <td className={`${styles.th} ${styles.thMain}`}>
                            {extras.map((extra, index) => (
                              <div key={index}>{extra}</div>
                            ))}
                          </td>
                          
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            
          </>
        )}
      </div>
    </div>
  );
};


export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; 

  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get(`${baseUrl}/api/products`);

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
        pizzaList: res.data,
        admin,
      },
    };
  }

  const productRes = await axios.get(`${baseUrl}/api/products`);
  const orderRes = await axios.get(`${baseUrl}/api/orders`);

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default CustomerOrders;
