import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "/styles/customerOrders.module.css";
import AddButton from "/components/AddButton.jsx";
import Add from "/components/Add.jsx";
import Link from 'next/link';


const customerOrders = ({ orders, products, admin }) => {

    const [close, setClose] = useState(true);
    const [pizzaList, setPizzaList] = useState(products);
    const [orderList, setOrderList] = useState(orders);
    const status = ["Paid", "Preparing", "Ready", "Picked Up!"];

  
    const handleDelete = async (id) => {
      console.log(id);
      try {
        const res = await axios.delete(
          "http://localhost:3000/api/products/" + id
        );
        setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
      } catch (err) {
        console.log(err);
      }
    };

    const handleStatus = async (id) => {
        const item = orderList.find((order) => order._id === id);
        const currentStatus = item.status;
      
        try {
          const res = await axios.put("http://localhost:3000/api/orders/" + id, {
            status: currentStatus + 1,
          });
      
          if (currentStatus === 4) {
            await axios.delete("http://localhost:3000/api/orders/" + id);
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

      const handleStatusNo = async (id) => {
        const item = orderList.find((order) => order._id === id);
        const currentStatus = item.status;
      
        try {
          const res = await axios.put("http://localhost:3000/api/orders/" + id, {
            status: currentStatus - 1,
          });
      
          if (currentStatus === 4) {
            await axios.delete("http://localhost:3000/api/orders/" + id);
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

      
      
    return(
        <div className={styles.container}>
                  <nav className={styles.navbar}>
              <div className={styles.buttonContainer}>
      <Link href="/admin">
      <button className={styles.navbarButton}>Back to Admin DashBoard</button>
     </Link>
    </div>
    </nav>
    <div className={styles.item}>
  <h1 className={styles.title}>Orders</h1>
  <div className={styles.cardContainer}>
    {orderList.map((order) =>
      order.status !== 4 ? (
        <div className={styles.card} key={order._id}>
          <span className={styles.customer}>{order.customer}</span>
          <span className={` ${styles.customer}  ${styles.phone}`}>{order.phone}</span>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardHeaderText}>{order._id.slice(0, 6)}...</h2>
            <span className={styles.cardHeaderDate}>
              {new Date(order.createdAt).toLocaleString()}
            </span>
          </div>
          <strong className={styles.cardTextTitle}>Status: <span className={styles.status}>{status[order.status]}</span></strong>


          <div className={styles.line1}></div> {/* Add this line */}

          <table className={styles.table}>
            <thead>
              <tr>
                <th className={` ${styles.th}  ${styles.thTitle}`}>Product</th>
                <th className={` ${styles.th}  ${styles.thTitle}`}>Quantity</th>
                <th className={` ${styles.th}  ${styles.thTitle}`}>Extras</th>
              </tr>
            </thead>
            <tbody>
            {order.cart.map((item) => {
  const product = products.find((product) => product._id === item.product);
  const title = product ? product.title : 'Product not found';
  const extras = product && product.extraOptions
    ? item.extras.map((extraId, index) => {
        const extraOption = product.extraOptions.find((extra) => extra._id === extraId);
        const num = index + 1; // Increment the number by one for each extra
        return extraOption ?`${num}.  ${extraOption.text}`  : 'Extra not found';
      })
    : [];

  return (
    <tr key={item.product} className={styles.cartItem}>
      <td className={` ${styles.th}  ${styles.thMain}`}>{title}</td>
      <td className={` ${styles.th}  ${styles.thMain}`}></td>
      <td className={` ${styles.th}  ${styles.thMain}`}>
      {extras.map((extra, index) => (
        <div key={index}>{extra}</div>
      ))}
    </td>    </tr>
  );
})}
            </tbody>
          </table>

        
          <div className={styles.cardFooter}>
          {order.status === 3 ? (
            <div className={styles.form}>
    <div className={styles.confirmation}>
      <form>Are you sure you want to close this order?</form>
      </div>

      <div className={styles.closingOrder}>
        <button className={styles.button} onClick={() => handleStatus(order._id)}>Yes Close</button>
        <button className={styles.button} onClick={() => handleStatusNo(order._id)}>No</button>
      </div>
      </div>
  ) : (
    <button
      className={styles.navbarButton}
      onClick={() => {
        handleStatus(order._id);
      }}
    >
      Next Stage - ({status[order.status + 1]})
    </button>
  )
}

          </div>
        </div>
      ) : null
    )}
  </div>
</div>

        </div>
    );
};



export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || "";
  
    let admin = false;
  
    if (myCookie.token === process.env.TOKEN) {
      admin = true;
    }
  
    const res = await axios.get("http://localhost:3000/api/products");
  
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
  
    const productRes = await axios.get("http://localhost:3000/api/products");
    const orderRes = await axios.get("http://localhost:3000/api/orders");
  
    return {
      props: {
        orders: orderRes.data,
        products: productRes.data,
      },
    };
  };

export default customerOrders;