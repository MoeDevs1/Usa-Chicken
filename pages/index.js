import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Featured from '@/components/featured';
import PizzaList from '@/components/PizzaList';
import axios from 'axios';
import Link from 'next/link';

// Define some sample pizzas to display
const pizzas = [
  {
    id: 1,
    title: 'Pepperoni Pizza',
    img: '/img/pizza.png',
    desc: 'Our classic pepperoni pizza with tomato sauce and mozzarella cheese.',
    price: '$12.99'
  },
  {
    id: 1,
    title: 'Pepperoni Pizza',
    img: '/img/pizza.png',
    desc: 'Our classic pepperoni pizza with tomato sauce and mozzarella cheese. Our classic pepperoni pizza with tomato sauce and mozzarella cheese. Our classic pepperoni pizza with tomato sauce and mozzarella cheese. Our classic pepperoni pizza with tomato sauce and mozzarella cheese.',
    price: '$12.99'
  },
  {
    id: 1,
    title: 'Pepperoni Pizza',
    img: '/img/pizza.png',
    desc: 'Our classic pepperoni pizza with tomato sauce and mozzarella cheese.',
    price: '$12.99'
  },
  {
    id: 3,
    title: 'Meat Lovers Pizza',
    img: '/img/pizza.png',
    desc: 'A hearty pizza with plenty of meat including pepperoni, sausage, and bacon.',
    price: '$14.99'
  }
];


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>USA Chicken and Biscuits</title>
        <meta name="description" content="Best Chicken Restraunt in New Hampshire" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured/>
      <div className={styles.content}>
        <div className={styles.words}>
          <div className={styles.paragraph1}>
            <h2>REFRESH YOUR TASTE BUDS ---------</h2>
          </div>

          <div className={styles.paragraph2}>
            <h2>Enjoy An Exceptional Journey of Taste</h2>
          </div>

          <div className={styles.paragraph3}>
            <h3>Chateau Yaffa is a stunning new restaurant that offers diners a unique and unforgettable dining experience. Located in a 6214 Avenue U, Brooklyn NY 11234, the restaurant boasts elegant and sophisticated décor, with high ceilings, ornate details, and a warm and inviting atmosphere. 
      
            The menu features a range of delicious, seasonally inspired dishes, created using only the freshest and finest ingredients. 

            </h3>
          </div>
        </div>  
      </div>
      <h2 className={styles.top}>Top Picks</h2>
      {/* Display the pizza list using flexbox and pseudo-elements */}
      <ul className={styles.pizzaList}>
        {pizzas.map(pizza => (
          <li key={pizza.id} className={styles.pizzaItem}>
            <Image src={pizza.img} alt={pizza.title} width={200} height={200} />
            <h3>{pizza.title}</h3>
            <p>{pizza.desc}</p>
            <span>{pizza.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  <Featured/>
}

