// CartItems.js
import React from 'react';
import Image from 'next/image';
import { useDispatch, useSelector} from 'react-redux';
import { deleteProduct } from '../redux/cartSlice';
import Link from 'next/link';
import styles from '../styles/CartItems.module.css';


const CartItems = ({ products }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  if (typeof window === 'undefined') {
    // Render nothing on the server-side
    return null;
  }


  return (
    <div className={styles.container} suppressHydrationWarning>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.trTitle}>
            <th className={styles.columnTitles}>Product</th>
            <th className={styles.columnTitles}>Name</th>
            <th className={styles.columnTitles}>Extras</th>
            <th className={styles.columnTitles}>Quantity</th>
            <th className={styles.columnTitles}>Total</th>
            <th className={styles.columnTitles}>Edit</th>
          </tr>
          {cart.products.map((product, index) => (
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
                    <button
                      className={styles.editButton}
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartItems;
