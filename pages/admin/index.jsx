import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import AddButton from "/components/AddButton.jsx";
import Add from "/components/Add.jsx";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaHome, FaUtensils, FaInfoCircle, FaPhone, FaBars, FaTimes, FaCircle} from 'react-icons/fa';


const Index = ({ orders, products, admin }) => {
  const [close, setClose] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [prevselectedOrder, setprevSelectedOrder] = useState(null);
  const [orderList, setOrderList] = useState(orders);
  const [phone, setPhone] = useState(0);
  const [firstName, setFirstName] = useState('');
  const status = ["Preparing", "Ready for Pick Up"];
  const [formOpen, setformOpen] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [pollingIntervalId, setPollingIntervalId] = useState(null);
  const [pizzaList, setPizzaList] = useState(products);

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
  
      if (currentStatus === 2) {
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

  
  const [password, setPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '1234') {
      setIsPasswordCorrect(true);
      router.push('/editProducts');
    } else {
      alert('Incorrect password');
    }
  };

  const [passwords, setPasswords] = useState('');
  const [isPasswordCorrects, setIsPasswordCorrects] = useState(false);
  const [showForms, setShowForms] = useState(false);
  const routers = useRouter();

  const handleSubmitOrders = (es) => {
    es.preventDefault();
    if (passwords === '123') {
      setIsPasswordCorrects(true);
      routers.push('/allOrders');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className={styles.container}>
     <nav className={styles.navbar}>
      </nav>
      <div className={styles.sidebar}>
        <div className={styles.topSideBar}>
        <Link href="/admin">
        <span className={styles.backButton}><FaBars className={styles.FaBars}/> </span>
        </Link>
        <span className={styles.title}>Admin Page</span>
        </div>
        <div className={styles.topSideBar2}>
        <span className={styles.kitchenTitle}>Select from menu</span>
   

<span className={styles.orderCount}>Options</span>
        </div>
        <ul className={styles.orderList}>
     
<nav className={styles.navbar}>
<div className={styles.buttonContainer}>
  <Link href="/admin">
    <button className={styles.button}>Dashboard</button>
  </Link>
  <Link href="/customerOrders">
    <button className={styles.button}>Orders</button>
  </Link>
  {!isPasswordCorrect ? (
      <>
        {!showForm ? (
          <button onClick={() => setShowForm(true)} className={styles.button}>
            Products
          </button>
        ) : (
          <div className={styles.modal}>
            <form onSubmit={handleSubmit}>
            <h1 className={styles.passcodeTitle}>Enter Passcode </h1>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className={styles.buttons}>Submit</button>
              <button className={styles.buttons} onClick={() => setShowForm(false)}>Close</button>
            </form>
          </div>
        )}
      </>
    ) : null}  
  {!isPasswordCorrects ? (
       <>
  {!showForms ? (
          <button onClick={() => setShowForms(true)} className={styles.button}>
           Order History
          </button>
        ) : (
          <div className={styles.modal}>
            <form onSubmit={handleSubmitOrders}>
            <h1 className={styles.passcodeTitle}>Enter Passcode </h1>
              <input
                type="password"
                value={passwords}
                onChange={(es) => setPasswords(es.target.value)}
              />
              <button className={styles.buttons}>Submit</button>
              <button className={styles.buttons} onClick={() => setShowForms(false)}>Close</button>
            </form>
          </div>
        )}
                </>
    ) : null}  
</div>
</nav>
   




</ul>


      </div>
      <div className={styles.cart}>
            <h2 className={styles.cartTitle}>DashBoard</h2>
            
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

export default Index;

{/* <nav className={styles.navbar}>
<div className={styles.buttonContainer}>
  <Link href="/admin">
    <button className={styles.navbarButton}>Dashboard</button>
  </Link>
  <Link href="/customerOrders">
    <button className={styles.navbarButton}>Orders</button>
  </Link>
  {!isPasswordCorrect ? (
      <>
        {!showForm ? (
          <button onClick={() => setShowForm(true)} className={styles.navbarButton}>
            Products
          </button>
        ) : (
          <div className={styles.modal}>
            <form onSubmit={handleSubmit}>
            <h1 className={styles.passcodeTitle}>Enter Passcode: </h1>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className={styles.buttons}>Submit</button>
              <button className={styles.buttons} onClick={() => setShowForm(false)}>Close</button>
            </form>
          </div>
        )}
      </>
    ) : null}  
  {!isPasswordCorrects ? (
       <>
  {!showForms ? (
          <button onClick={() => setShowForms(true)} className={styles.navbarButton}>
            All Orders
          </button>
        ) : (
          <div className={styles.modal}>
            <form onSubmit={handleSubmitOrders}>
            <h1 className={styles.passcodeTitle}>Enter Passcode: </h1>
              <input
                type="password"
                value={passwords}
                onChange={(es) => setPasswords(es.target.value)}
              />
              <button className={styles.buttons}>Submit</button>
              <button className={styles.buttons} onClick={() => setShowForms(false)}>Close</button>
            </form>
          </div>
        )}
                </>
    ) : null}  
</div>
</nav>
   
<div className={styles.dashboard}>
<h1 className={styles.title}>Dashboard</h1>
</div>

 */}


