import Head from 'next/head'
import Image from 'next/legacy/image'
import styles from '@/styles/Menu.module.css'
import Featured from '@/components/featured';
import PizzaList from '@/components/PizzaList';
import axios from 'axios';
import { useState, useEffect } from "react";





export default function Menu({pizzaList}) {
  const [portion, setPortion] = useState("");

  function handleScroll() {
    window.scrollTo({
      top: window.innerHeight / 1,
      behavior: 'smooth'
    });
  }

  return (
    <div className={styles.container}>

      <Head>
        <title>USA Chicken and Biscuits</title>
        <meta name="description" content="Best Chicken Restraunt in New Hampshire" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
      <div className={styles.featuredContainer}>
         <Image
            src="/img/plate.png"
            alt="Featured Image"
            layout="fill"
            />
            <div className={styles.buttonContainer}>
                <h1 className={styles.button}>Menu</h1>
            </div>
         </div>
      </div>
      <div>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <h3 onClick={handleScroll}>Kabobs</h3>
        </li>
        <li className={styles.listItem}>
          <h3>The Spot</h3>
        </li>
        <li className={styles.listItem}>
          <h3>Everyday Specials</h3>
        </li>
        <li className={styles.listItem}>
          <h3>Side Orders</h3>
        </li>
        <li className={styles.listItem}>
          <h3>Chicken Only</h3>
        </li>
        <li className={styles.listItem}>
          <h3>Wings Only</h3>
        </li>
        <li className={styles.listItem}>
          <h3>Chicken with Fries or Rice</h3>
        </li>
        <li className={styles.listItem}>
          <h3>Chicken Combination</h3>
        </li>
        <li className={styles.listItem}>
          <h3>Tenders</h3>
        </li>
        <li className={styles.listItem}>
          <h3>Seafood</h3>
        </li>
        <li className={styles.listItem}>
          <h3>Healthier Options</h3>
        </li>
        <li className={styles.listItem}>
          <h3>Finger Food</h3>
        </li>
      </ul>
      </div>


      <PizzaList pizzaList={pizzaList} />

      <button onClick={handleScroll}>Scroll to middle</button>


      </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      pizzaList: res.data,
    },
  };
};