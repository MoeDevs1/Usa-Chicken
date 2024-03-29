import axios from "axios";
import { useState, useEffect, useRef } from "react";
import styles from "/styles/customerOrders.module.css";
import Link from 'next/link';
import { FaHome, FaUtensils, FaInfoCircle, FaPhone, FaBars, FaTimes, FaCircle} from 'react-icons/fa';
import React from 'react';

const CustomerOrders = ({ orders, products, admin }) => {
  const audioRef = useRef(null);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderList, setOrderList] = useState(orders);
  const [pollingIntervalId, setPollingIntervalId] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isNewOrderButtonVisible, setIsNewOrderButtonVisible] = useState(false);
  const [isNewOrderReceived, setIsNewOrderReceived] = useState(false);
  const [isConfirmButtonVisible, setIsConfirmButtonVisible] = useState(false);

  const playAudioOnNewOrder = () => {
    const audioElement = audioRef.current;
    audioElement.currentTime = 0; // Reset the audio to the beginning
    audioElement.play();
    setIsAudioPlaying(true);

    // Stop the audio after 5 seconds (adjust the duration as needed)
    setTimeout(() => {
      audioElement.pause();
      setIsAudioPlaying(false);
    }, 500000); // 5000 milliseconds (5 seconds)
  };

  const stopAudio = () => {
    const audioElement = audioRef.current;
    audioElement.pause();
    setIsAudioPlaying(false);
  };

  const fetchOrders = async () => {
    try {
      // Make the API request to fetch the orders
      const response = await axios.get('/api/orders');
      const data = response.data;

      // Check if a new order has arrived
      const newOrderReceived = data.some((order) => order.status === 0 && !orderList.some((o) => o._id === order._id));

      // Update the orderList state with the fetched data
      setOrderList(data);

      if (newOrderReceived && !isAudioPlaying) {
        playAudioOnNewOrder();
        setIsNewOrderReceived(true);
        setIsNewOrderButtonVisible(true);
      }
      
      if (selectedOrder) {
        const selectedOrderStatus = data.find((order) => order._id === selectedOrder)?.status;
        setIsConfirmButtonVisible(selectedOrderStatus === 0);
      }
    } catch (error) {
      // Handle any error that occurs during the fetch
      console.error('Error fetching orders:', error);
    }
  };

  const handleNewOrderButtonClicked = () => {
    stopAudio();
    setIsNewOrderButtonVisible(false);
    setIsNewOrderReceived(false);
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

  const handleOrderClick = (orderId) => {
    if (selectedOrder === orderId) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(orderId);
      setIsConfirmButtonVisible(orderList.find((order) => order._id === orderId)?.status === 0);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.find((order) => order._id === id);
    const currentStatus = item.status;

    try {
      const res = await axios.put(`/api/orders/${id}`, {
        status: currentStatus + 1,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusNo = async (id) => {
    const item = orderList.find((order) => order._id === id);
    const currentStatus = item.status;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    try {
      const res = await axios.put(`${baseUrl}/api/orders/` + id, {
        status: currentStatus - 1,
      });

      if (currentStatus === 4) {
        await axios.delete(`${baseUrl}/api/orders/` + id);
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
      {orderList.length > 0 && <audio ref={audioRef} src="/ringer.mp3" autoPlay={false} />}
      {isNewOrderButtonVisible && (
        <button onClick={handleNewOrderButtonClicked}>Received New Order</button>
      )}

      <nav className={styles.navbar}></nav>
      <div className={styles.sidebar}>
        <div className={styles.topSideBar}>
          <Link href="/admin">
            <span className={styles.backButton}><FaBars className={styles.FaBars}/> </span>
          </Link>
          <span className={styles.title}>Orders</span>
        </div>
        <div className={styles.topSideBar2}>
          <span className={styles.kitchenTitle}>In The Kitchen</span>
          <span className={styles.orderCount}>{orderListCount} Orders</span>
        </div>
        <ul className={styles.orderList}>
          {orderList.map((order) => {
            if (order.status === 0) {
              const readyForPickupTime = new Date(new Date(order.createdAt).getTime() + 15 * 60000).toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit',
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
                  <span className={styles.orderTime}>Ready for pick up at: {readyForPickupTime}</span>
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
                <span className={styles.details}><span className={styles.header}>Order ID:</span> #{orderList.find((order) => order._id === selectedOrder)._id.slice(0, 8)}...</span>
                <span className={styles.details}><span className={styles.header}>Customer:</span> <span className={styles.firstLetter}>{orderList.find((order) => order._id === selectedOrder).customer.slice(0, 1)}</span>{orderList.find((order) => order._id === selectedOrder).customer.slice(1)}</span>
                <span className={styles.details}>
                  <span className={styles.header}>Items: </span>
                  {orderList
                    .find((order) => order._id === selectedOrder)
                    .cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
                <span className={styles.details}><span className={styles.header}>Total: </span> ${orderList.find((order) => order._id === selectedOrder).total}</span>
                <span className={styles.details}><span className={styles.header}>Phone: </span> {formatPhoneNumber(orderList.find((order) => order._id === selectedOrder).phone)}</span>
              </div>
            ) : null}

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
                      <tr className={styles.cartItem} key={item._id}>
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
            <div className={styles.cartFooter}>
              {isConfirmButtonVisible ? (
                <form>
                  <h5 className={styles.question}>Confirm Pickup</h5>
                  <button
                    className={styles.navbarButton}
                    onClick={() => handleStatus(selectedOrder)}
                  >
                    Confirmed
                  </button>
                  <button
                    className={styles.navbarButton}
                    onClick={() => {
                      setSelectedOrder(null);
                    }}
                  >
                    Not Yet
                  </button>
                </form>
              ) : (
                <button
                  className={styles.navbarButton}
                  onClick={() => {
                    setSelectedOrder(null);
                  }}
                >
                  Close
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* <audio ref={audioRef} src="/ringer.mp3" />  */}
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
