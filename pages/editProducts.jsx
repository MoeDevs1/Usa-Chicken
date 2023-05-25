import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from '/styles/editProducts.module.css';
import AddButton from '/components/AddButton.jsx';
import Add from '/components/Add.jsx';
import Link from 'next/link';
import { FaHome, FaUtensils, FaInfoCircle, FaPhone, FaBars, FaTimes, FaCircle} from 'react-icons/fa';

const Index = ({ orders, products, admin }) => {
  const [close, setClose] = useState(true);
  const [pizzaList, setPizzaList] = useState(products);

  const handleDeleteConfirmation = (productId) => {
    setPizzaList((prevList) =>
      prevList.map((product) =>
        product._id === productId ? { ...product, showConfirmation: true } : product
      )
    );
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(`http://localhost:3000/api/products/${id}`);
      setPizzaList((prevList) => prevList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
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
        <span className={styles.title}>Products Page</span>
        </div>
        <div className={styles.topSideBar2}>
        <span className={styles.kitchenTitle}></span>
   

<span className={styles.orderCount}></span>
        </div>
        <ul className={styles.orderList}>
     
<nav className={styles.navbar}>
<div className={styles.buttonContainer}>
{admin && <AddButton setClose={setClose} />}
      {!close && <Add setClose={setClose} />}
            
{/* 
      {pizzaList.map((product) => {
  if (product.category === 'Popular') {
    return (
      <div key={product.id}>
        {product.title}
      </div>
    );
  }
  return null;
})} */}
</div>
</nav>
   




</ul>


      </div>
      <div className={styles.cart}>
            <h2 className={styles.cartTitle}>Products</h2>

      <div className={styles.item}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Catagory</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td className={styles.td}>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td className={styles.td}>{product._id.slice(0, 5)}...</td>
                <td className={styles.td}>{product.category}</td>
                <td className={styles.td}>{product.title}</td>
                <td className={styles.td}>${product.prices[0]}</td>
                <td className={styles.td}>
                  <button className={styles.choiceButton}>Edit</button>
                  {product.showConfirmation ? (
                    <div>
                      <p>Are you sure you want to delete this product?</p>
                      <button
                        className={styles.choiceButton}
                        onClick={() => {
                          handleDelete(product._id);
                        }}
                      >
                        Yes
                      </button>
                      <button
                        className={styles.choiceButton}
                        onClick={() => {
                          setPizzaList((prevList) =>
                            prevList.map((item) =>
                              item._id === product._id
                                ? { ...item, showConfirmation: false }
                                : item
                            )
                          );
                        }}
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      className={styles.choiceButton}
                      onClick={() => handleDeleteConfirmation(product._id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      </div>
    </div>
  );
};

// Remaining code...



export const getServerSideProps = async (ctx) => {
  // const myCookie = ctx.req?.cookies || "";

  // let admin = false;

  // if (myCookie.token === process.env.TOKEN) {
  //   admin = true;
  // }

  // const res = await axios.get("http://localhost:3000/api/products");

  // if (myCookie.token !== process.env.TOKEN) {
  //   return {
  //     redirect: {
  //       destination: "/admin/login",
  //       permanent: false,
  //       pizzaList: res.data,
  //        admin,
  //     },
  //   };
  // }

  const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");
  const res = await axios.get("http://localhost:3000/api/products");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
      pizzaList: res.data,
    },
  };
};

export default Index;

