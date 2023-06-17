import Image from 'next/legacy/image';
import styles from '@/styles/Menu.module.css';
import Featured from '@/components/featured';
import PizzaList from '@/components/PizzaList';
import axios from 'axios';
import { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import Address from '@/components/address'; // import the Address component
import AddButton from "../components/AddButton";
import Add from "../components/Add";

export default function Menu({ pizzaList }) {
  const [close, setClose] = useState(true);
  const [portion, setPortion] = useState("");
  const [selected, setSelected] = useState(null);
  const [highlighted, setHighlighted] = useState(null);
  const [isSmoothScrolling, setIsSmoothScrolling] = useState(false); // Flag to track smooth scrolling

  const sidebarRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: .1, // Adjust this value as needed
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isSmoothScrolling) { // Check if smooth scrolling is not in progress
          setHighlighted(entry.target.id);
          const sidebarElement = sidebarRef.current;
          const highlightedItem = sidebarElement.querySelector(`.${styles.highlighted}`);
          if (highlightedItem) {
            sidebarElement.scrollLeft = highlightedItem.offsetLeft - sidebarElement.offsetWidth / 2 + highlightedItem.offsetWidth / 2;
          }
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, options);

    const sectionElements = Array.from(document.querySelectorAll('h1[id]'));
    sectionElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [isSmoothScrolling]); // Update the effect when isSmoothScrolling changes

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    setIsSmoothScrolling(true); // Set the flag to indicate smooth scrolling is in progress
    section.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      setIsSmoothScrolling(false); // Reset the flag after a delay
      setHighlighted(sectionId); // Set the highlighted state to the scrolled section
    }, 1000); // Adjust the delay as needed
  }
  
  // Rest of the component code...

 
  return (
    <div className={styles.container} suppressHydrationWarning={true}>
      <title>USA Chicken and Biscuits</title>
      <meta name="description" content="Best Chicken Restaurant in New Hampshire" />
      <link rel="icon" href="/favicon.ico" />
      <div>
        <Address />
      </div>
      <div>
        <div className={styles.wholeContainer}>
          <h3 className={styles.menuPhoneTitle}>Menu</h3>
  
          <ul className={`${styles.listContainer} ${styles.scrollContainer}`} ref={sidebarRef}>
            <li className={styles.listTitle}>
              <h3>Menu</h3>
            </li>
            <li
              id="popular-itemss"
              className={`${styles.listItem} ${highlighted === 'popular-items' ? styles.highlighted : ''}`}
              onClick={(e) => {  scrollToSection('popular-items') }}
            >
              <h3 className={`${styles.listerss} ${highlighted === 'popular-items' ? styles.highlightedText : ''}`}>Popular Items</h3>
            </li>
            <li
              className={`${styles.listItem} ${highlighted === 'sandwiches' ? styles.highlighted : ''}`}
              onClick={(e) => {  scrollToSection('sandwiches') }}
            >
              <h3 className={`${styles.listers} ${styles.listersSecond} ${highlighted === 'sandwiches' ? styles.highlightedText : ''}`}>Sandwiches &amp; Subs</h3>
            </li>
            <li
              className={`${styles.listItem} ${highlighted === 'halfapintsauces' ? styles.highlighted : ''}`}
              onClick={(e) => { scrollToSection('halfapintsauces') }}
            >
              <h3 className={`${styles.listers} ${styles.listersThird} ${highlighted === 'halfapintsauces' ? styles.highlightedText : ''}`}>Half a Pint Sauces</h3>
            </li>
            <li
              className={`${styles.listItem} ${highlighted === 'partywings' ? styles.highlighted : ''}`}
              onClick={(e) => {scrollToSection('partywings') }}
            >
              <h3 className={`${styles.listers} ${highlighted === 'partywings' ? styles.highlightedText : ''}`}>Party Wings</h3>
            </li>
            <li
              className={`${styles.listItem} ${highlighted === 'chickenonly' ? styles.highlighted : ''}`}
              onClick={(e) => {scrollToSection('chickenonly') }}
            >
              <h3 className={`${styles.listers} ${highlighted === 'chickenonly' ? styles.highlightedText : ''}`}>Chicken Only</h3>
            </li>
            <li
              className={`${styles.listItem} ${highlighted === 'chickenwithside' ? styles.highlighted : ''}`}
              onClick={(e) => {  scrollToSection('chickenwithside') }}
            >
              <h3 className={`${styles.listers} ${highlighted === 'chickenwithside' ? styles.highlightedText : ''}`}>Chicken with Side</h3>
            </li>
            <li
              className={`${styles.listItem} ${highlighted === 'chickencombo' ? styles.highlighted : ''}`}
              onClick={(e) => {  scrollToSection('chickencombo') }}
            >
              <h3 className={`${styles.listers} ${highlighted === 'chickencombo' ? styles.highlightedText : ''}`}>Chicken Combo</h3>
            </li>
            <li
              className={`${styles.listItem} ${highlighted === 'chickentenders' ? styles.highlighted : ''}`}
              onClick={(e) => {scrollToSection('chickentenders') }}
            >
              <h3 className={`${styles.listers} ${highlighted === 'chickentenders' ? styles.highlightedText : ''}`}>Chicken Tenders</h3>
            </li>
            <li
              className={`${styles.listItem} ${highlighted === 'seafood' ? styles.highlighted : ''}`}
              onClick={(e) => {scrollToSection('seafood') }}
            >
              <h3 className={`${styles.listers} ${highlighted === 'seafood' ? styles.highlightedText : ''}`}>Seafood</h3>
            </li>
            <li
              className={`${styles.listItem} ${highlighted === 'freshsalad' ? styles.highlighted : ''}`}
              onClick={(e) => {  scrollToSection('freshsalad') }}
            >
              <h3 className={`${styles.listers} ${highlighted === 'freshsalad' ? styles.highlightedText : ''}`}>Fresh Salad</h3>
            </li>
            <li
              className={`${styles.listItem} ${highlighted === 'wraps' ? styles.highlighted : ''}`}
              onClick={(e) => {scrollToSection('wraps') }}
            >
              <h3 className={`${styles.listers} ${highlighted === 'wraps' ? styles.highlightedText : ''}`}>Wraps</h3>
            </li>
            <li
              className={`${styles.listItem} ${highlighted === 'sides' ? styles.highlighted : ''}`}
              onClick={(e) => {  scrollToSection('sides') }}
            >
              <h3 className={`${styles.listers} ${highlighted === 'sides' ? styles.highlightedText : ''}`}>Sides</h3>
            </li>
            <li
              className={`${styles.listItem} ${highlighted === 'thespot' ? styles.highlighted : ''}`}
              onClick={(e) => { scrollToSection('thespot') }}
            >
              <h3 className={`${styles.listers} ${highlighted === 'thespot' ? styles.highlightedText : ''}`}>The Spot</h3>
            </li>
            <li
              className={`${styles.listItem} ${highlighted === 'chickennuggets' ? styles.highlighted : ''}`}
              onClick={(e) => { scrollToSection('chickennuggets') }}
            >
              <h3 className={`${styles.listers} ${highlighted === 'chickennuggets' ? styles.highlightedText : ''}`}>Chicken Nuggets</h3>
            </li>
            <li
              className={`${styles.listItem} ${highlighted === 'desserts' ? styles.highlighted : ''}`}
              onClick={(e) => {  scrollToSection('desserts') }}
            >
              <h3 className={`${styles.listers} ${highlighted === 'desserts' ? styles.highlightedText : ''}`}>Desserts</h3>
            </li>
            <li
              className={`${styles.listItem} ${highlighted === 'beverages' ? styles.highlighted : ''}`}
              onClick={(e) => { scrollToSection('beverages') }}
            >
              <h3 className={`${styles.listers} ${highlighted === 'beverages' ? styles.highlightedText : ''}`}>Beverages</h3>
            </li>
          </ul>
  

          <div className={styles.pizzaListContainer} id="pizzaListContainer">
            {/* Title made for every categories and splitting up categories using slice method which goes into array */}
            {/* Popular items first 10 */}
            <h1 className={styles.dash} id="popular-items">------------</h1>
            <div className={styles.titleS}><h1 className={styles.popularItems}>POPULAR ITEMS</h1></div>
            <PizzaList pizzaList={pizzaList.slice(0, 9)} />

            {/* Popular items next 14 */}
            <h1 className={styles.dash} id="sandwiches">------------</h1>
            <div className={styles.titleS}><h1>SANDWICHES & SUBS</h1></div>
            <PizzaList pizzaList={pizzaList.slice(9, 23)} />

            {/* Half a Pint Sauces */}
            <h1 className={styles.dash} id="halfapintsauces">------------</h1>
            <div className={styles.titleS}><h1>HALF A PINT SAUCES</h1></div>
            <PizzaList pizzaList={pizzaList.slice(23, 26)} />

            {/* Party Wings */}
            <h1 className={styles.dash} id="partywings">------------</h1>
            <div className={styles.titleS}><h1>PARTY WINGS</h1></div>
            <PizzaList pizzaList={pizzaList.slice(26, 33)} />

            {/* Chicken Only */}
            <h1 className={styles.dash} id="chickenonly">------------</h1>
            <div className={styles.titleS}><h1>CHICKEN ONLY</h1></div>
            <PizzaList pizzaList={pizzaList.slice(33, 35)} />

            {/* Chicken with Side */}
            <h1 className={styles.dash} id="chickenwithside">------------</h1>
            <div className={styles.titleS}><h1>CHICKEN WITH SIDE</h1></div>
            <PizzaList pizzaList={pizzaList.slice(35, 43)} />

            {/* Chicken Combo */}
            <h1 className={styles.dash} id="chickencombo">------------</h1>
            <div className={styles.titleS}><h1>CHICKEN COMBO</h1></div>
            <PizzaList pizzaList={pizzaList.slice(43, 50)} />

            {/* Chicken Tenders */}
            <h1 className={styles.dash} id="chickentenders">------------</h1>
            <div className={styles.titleS}><h1>CHICKEN TENDERS</h1></div>
            <PizzaList pizzaList={pizzaList.slice(50, 58)} />

            {/* Seafood */}
            <h1 className={styles.dash} id="seafood">------------</h1>
            <div className={styles.titleS}><h1>SEAFOOD</h1></div>
            <PizzaList pizzaList={pizzaList.slice(58, 66)} />

            {/* Fresh Salad */}
            <h1 className={styles.dash} id="freshsalad">------------</h1>
            <div className={styles.titleS}><h1>FRESH SALAD</h1></div>
            <PizzaList pizzaList={pizzaList.slice(66, 70)} />

            {/* Wraps */}
            <h1 className={styles.dash} id="wraps">------------</h1>
            <div className={styles.titleS}><h1>WRAPS</h1></div>
            <PizzaList pizzaList={pizzaList.slice(70, 73)} />

            {/* Sides */}
            <h1 className={styles.dash} id="sides">------------</h1>
            <div className={styles.titleS}><h1>SIDES</h1></div>
            <PizzaList pizzaList={pizzaList.slice(73, 84)} />

            {/* The Spot */}
            <h1 className={styles.dash} id="thespot">------------</h1>
            <div className={styles.titleS}><h1>THE SPOT</h1></div>
            <PizzaList pizzaList={pizzaList.slice(84, 85)} />

            {/* Chicken Nuggets */}
            <h1 className={styles.dash} id="chickennuggets">------------</h1>
            <div className={styles.titleS}><h1>CHICKEN NUGGETS</h1></div>
            <PizzaList pizzaList={pizzaList.slice(85, 88)} />

            {/* Desserts */}
            <h1 className={styles.dash} id="desserts">------------</h1>
            <div className={styles.titleS}><h1>DESSERTS</h1></div>
            <PizzaList pizzaList={pizzaList.slice(88, 92)} />

            {/* Beverages */}
            <h1 className={styles.dash} id="beverages">------------</h1>
            <div className={styles.titleS}><h1>BEVERAGES</h1></div>
            <PizzaList pizzaList={pizzaList.slice(92, 99)} />

            <h1 className={styles.dash}>------------</h1>
          </div>
        </div>
      </div>
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