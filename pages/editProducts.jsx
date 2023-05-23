import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from '/styles/editProducts.module.css';
import AddButton from '/components/AddButton.jsx';
import Add from '/components/Add.jsx';
import Link from 'next/link';

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
        <div className={styles.buttonContainer}>
          <Link href="/admin">
            <button className={styles.navbarButton}>Back to Admin Dashboard</button>
          </Link>
        </div>
      </nav>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  {product.showConfirmation ? (
                    <div>
                      <p>Are you sure you want to delete this product?</p>
                      <button
                        className={styles.button}
                        onClick={() => {
                          handleDelete(product._id);
                        }}
                      >
                        Yes
                      </button>
                      <button
                        className={styles.button}
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
                      className={styles.button}
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
      {admin && <AddButton setClose={setClose} />}
      {!close && <Add setClose={setClose} />}
    </div>
  );
};

// Remaining code...



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
      pizzaList: res.data,
      admin,
    },
  };
};

export default Index;

