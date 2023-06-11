import styles from '@/styles/PizzaCard.module.css'
import Image from "next/legacy/image";
import Link from 'next/link';

const PizzaCard = ({pizza}) => {
  return (
    <div className={styles.container}>
      <Link href={`/Products/${pizza._id}`} passHref>
     
     
      <div className={styles.card}>
        <div className={styles.info}> 
          <h1 className={styles.title}>{pizza.title}</h1>
          <span className={styles.price}>{pizza.prices[0].toFixed(2)}</span>
          <p className={styles.desc}>{pizza.desc}</p>
        </div>
        <div className={styles.img3}>
          <Image src={pizza.img} alt="" width="130" height="130"/> 
        </div>
      </div>
      </Link>
      </div>
  )
} 

export default PizzaCard;


// import React, { useState } from 'react';
// import styles from '@/styles/PizzaCard.module.css';
// import Image from "next/legacy/image";
// import ProductPopup from './ProductPopup';

// const PizzaCard = ({ pizza }) => {
//   const [isPopupVisible, setPopupVisible] = useState(false);

//   const handlePopupOpen = () => {
//     setPopupVisible(true);
//   };

//   const handlePopupClose = () => {
//     setPopupVisible(false);
//   };

//   return (
//     <div className={styles.container}>
//       {isPopupVisible && (
//         <ProductPopup onClose={handlePopupClose} pizza={pizza} />
//       )}
//       <div className={styles.card} onClick={handlePopupOpen}>
//         <div className={styles.info}>
//           <h1 className={styles.title}>{pizza.title}</h1>
//           <span className={styles.price}>{pizza.prices[0].toFixed(2)}</span>
//           <p className={styles.desc}>{pizza.desc}</p>
//         </div>
//         <div className={styles.img3}>
//           <Image src={pizza.img} alt="" width="130" height="130" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PizzaCard;
