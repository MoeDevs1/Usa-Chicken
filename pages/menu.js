import Head from 'next/head'
import Image from 'next/legacy/image'
import styles from '@/styles/Menu.module.css'
import Featured from '@/components/featured';
import PizzaList from '@/components/PizzaList';
import axios from 'axios';
import { useState, useEffect } from "react";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import Address from '@/components/address'; // import the Address component
import AddButton from "../components/AddButton";
import Add from "../components/Add";



export default function Menu({pizzaList, admin}) {

  // Inside your app.js or main page script

// Function to check if the response has a 500 status code
function isInternalServerError(response) {
  return response.status === 500;
}

// Function to reload the page after a delay
function reloadPageWithDelay(delay) {
  setTimeout(function() {
    window.location.reload();
  }, delay);
}

// Make an AJAX request or fetch API call
fetch('your-api-endpoint')
  .then(function(response) {
    // Check if the response has a 500 status code
    if (isInternalServerError(response)) {
      // Reload the page after a delay (e.g., 3 seconds)
      reloadPageWithDelay(3000);
    } else {
      // Process the successful response
      // ...
    }
  })
  .catch(function(error) {
    // Handle network or other errors
    console.error(error);
  });

  
  const [close, setClose] = useState(true);

  const [portion, setPortion] = useState("");

  const [selected, setSelected] = useState(null);

  async function fetchData() {
    try {
      const response = await axios.get('/api/data');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      // Handle the error here
    }
  }
  
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  }

  const handleClick = (e) => {
    const clicked = e.currentTarget;
    const popularItems = document.getElementById('popular-itemss');
    const popularItemss = document.getElementById('popular-items');

    
    // if there is a previously selected item, change its style back to grey
    if (selected) {
      selected.style.color = "grey";
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // if selected item is not the popular items, make popular items style color grey
    if (selected === popularItems || selected !== popularItemss ) {
      popularItems.style.color = "grey";
    } else {
      // if selected item is the popular items, turn its text color back to black
      popularItems.style.color = "black";
    }

    // if the clicked item is the same as the previously selected item, change its style back to grey
    if (clicked === selected) {
      clicked.style.color = "grey";
      setSelected(null);
    } else {
      // make the clicked item black and set it as the new selected item
      clicked.style.color = "#09317d";
      setSelected(clicked);
    }
  }
  
  
  return (
    <div className={styles.container} suppressHydrationWarning={true}>

      <Head>
        <title>USA Chicken and Biscuits</title>
        <meta name="description" content="Best Chicken Restraunt in New Hampshire" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
      <Address/>

      </div>
      <div>
      <div className={styles.wholeContainer}>
        
      <h3 className={styles.menuPhoneTitle}>Menu</h3>

      <ul className={styles.listContainer}>
      <li className={styles.listTitle}>
          <h3>Menu</h3>
          
        </li>
        <li id="popular-itemss" className={styles.listItem} onClick={(e) => {handleClick(e); scrollToSection('popular-items')}} style={{color: "black"}}>
          <h3 id="popular-itemss" className={styles.listerss}>Popular Items</h3>
        </li>
        <li className={styles.listItem} onClick={(e) => {handleClick(e); scrollToSection('sandwiches')}}>
        <h3 className={`${styles.listers} ${styles.listersSecond}`}>Sandwiches &amp; Subs</h3>
        </li>
        <li className={styles.listItem} onClick={(e) => {handleClick(e); scrollToSection('halfapintsauces')}}>
          <h3 className={`${styles.listers} ${styles.listersThird}`}>Half a Pint Sauces</h3>
        </li>
        <li className={styles.listItem} onClick={(e) => {handleClick(e); scrollToSection('partywings')}}>
          <h3 className={styles.listers}>Party Wings</h3>
        </li>
        <li className={styles.listItem} onClick={(e) => {handleClick(e); scrollToSection('chickenonly')}}>
          <h3 className={styles.listers}>Chicken Only</h3>
        </li>
        <li className={styles.listItem} onClick={(e) => {handleClick(e); scrollToSection('chickenwithside')}}>
          <h3 className={styles.listers}>Chicken with Side</h3>
        </li>
        <li className={styles.listItem} onClick={(e) => {handleClick(e); scrollToSection('chickencombo')}}>
          <h3 className={styles.listers}>Chicken Combo</h3>
        </li>
        <li className={styles.listItem} onClick={(e) => {handleClick(e); scrollToSection('chickentenders')}}>
          <h3 className={styles.listers}>Chicken Tenders</h3>
        </li>
        <li className={styles.listItem} onClick={(e) => {handleClick(e); scrollToSection('seafood')}}>
          <h3 id="sidess" className={styles.listers}>Seafood</h3>
        </li>
        <li className={styles.listItem} onClick={(e) => {handleClick(e); scrollToSection('freshsalad')}}>
          <h3 className={styles.listers}>Fresh Salad</h3>
        </li>
        <li className={styles.listItem} onClick={(e) => {handleClick(e); scrollToSection('wraps')}}>
          <h3 className={styles.listers}>Wraps</h3>
        </li>
        <li className={styles.listItem} onClick={(e) => {handleClick(e); scrollToSection('sides')}}>
          <h3 className={styles.listers}>Sides</h3>
        </li>
        <li className={styles.listItem} onClick={(e) => {handleClick(e); scrollToSection('thespot')}}>
          <h3 className={styles.listers}>The Spot</h3>
        </li>
        <li className={styles.listItem} onClick={(e) => {handleClick(e); scrollToSection('chickennuggets')}}>
          <h3 className={styles.listers}>Chicken Nuggets</h3>
        </li>
        <li className={styles.listItem} onClick={(e) => {handleClick(e); scrollToSection('desserts')}}>
          <h3 className={styles.listers} >Desserts</h3>
        </li>
        <li className={styles.listItem} onClick={(e) => {handleClick(e); scrollToSection('beverages')}} >
          <h3 className={styles.listers} >Beverages</h3>
        </li>
      </ul>


<div className={styles.pizzaListContainer} id="pizzaListContainer">
{/*Title made for every catagories and spliting up catagories using slice method which goes into array*/}
{/*Popular items first 10*/}
<h1 className={styles.dash} id="popular-items">------------</h1>
<div className={styles.titleS} id=""> <h1 className={styles.popularItems}>POPULAR ITEMS</h1> </div> <PizzaList pizzaList={pizzaList.slice(0, 9)} />
  
{/*Popular items next 14*/}
<h1 className={styles.dash} id="sandwiches">------------</h1>
<div className={styles.titleS}> <h1>SANDWICHES & SUBS</h1> </div> <PizzaList pizzaList={pizzaList.slice(9, 23)}/>

<h1 className={styles.dash} id="halfapintsauces">------------</h1>
<div className={styles.titleS}> <h1>HALF A PINT SAUCES</h1> </div> <PizzaList pizzaList={pizzaList.slice(23, 26)} />

<h1 className={styles.dash} id="partywings">------------</h1>
<div className={styles.titleS}> <h1>PARTY WINGS</h1> </div> <PizzaList pizzaList={pizzaList.slice(26, 33)} />

<h1 className={styles.dash} id="chickenonly">------------</h1>
<div className={styles.titleS}> <h1>CHICKEN ONLY</h1> </div> <PizzaList pizzaList={pizzaList.slice(33, 35)} />

<h1 className={styles.dash} id="chickenwithside">------------</h1>
<div className={styles.titleS}> <h1>CHICKEN WITH SIDE</h1> </div> <PizzaList pizzaList={pizzaList.slice(35, 43)} />

<h1 className={styles.dash} id="chickencombo">------------</h1>
<div className={styles.titleS}> <h1>CHICKEN COMBO</h1> </div> <PizzaList pizzaList={pizzaList.slice(43, 50)} />

<h1 className={styles.dash} id="chickentenders">------------</h1>
<div className={styles.titleS}> <h1>CHICKEN TENDERS</h1> </div> <PizzaList pizzaList={pizzaList.slice(50, 58)} />

<h1 className={styles.dash} id="seafood">------------</h1>
<div className={styles.titleS}> <h1>SEAFOOD</h1> </div> <PizzaList pizzaList={pizzaList.slice(58, 66)} />

<h1 className={styles.dash} id="freshsalad">------------</h1>
<div className={styles.titleS}> <h1>FRESH SALAD</h1> </div> <PizzaList pizzaList={pizzaList.slice(66, 70)} />

<h1 className={styles.dash} id="wraps">------------</h1>
<div className={styles.titleS}> <h1>WRAPS</h1> </div> <PizzaList pizzaList={pizzaList.slice(70, 73)} />

<h1 className={styles.dash} id="sides">------------</h1>
<div className={styles.titleS}> <h1>SIDES</h1> </div> <PizzaList pizzaList={pizzaList.slice(73, 84)} />

<h1 className={styles.dash} id="thespot">------------</h1>
<div className={styles.titleS} > <h1>THE SPOT</h1> </div> <PizzaList pizzaList={pizzaList.slice(84, 85)} />

<h1 className={styles.dash} id="chickennuggets">------------</h1>
<div className={styles.titleS}> <h1>CHICKEN NUGGETS</h1> </div> <PizzaList pizzaList={pizzaList.slice(85, 88)} />

<h1 className={styles.dash} id="desserts">------------</h1>
<div className={styles.titleS}> <h1>DESSERTS</h1> </div> <PizzaList pizzaList={pizzaList.slice(88, 92)} />

<h1 className={styles.dash} id="beverages">------------</h1>
<div className={styles.titleS}> <h1>BEVERAGES</h1> </div> <PizzaList pizzaList={pizzaList.slice(92, 99)} />
<h1 className={styles.dash}>------------</h1>

<h1 className={styles.dash} id="extras">------------</h1>
<div className={styles.titleS}> <h1>Extras</h1> </div> <PizzaList pizzaList={pizzaList.slice(98)} />
<h1 className={styles.dash}>------------</h1>
<h1 className={styles.dash}>------------</h1>
<h1 className={styles.dash}>------------</h1>


</div>
</div>
</div>

</div>
  );
}



export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Replace with your environment variable name

  const res = await axios.get(`${baseUrl}/api/products`);


  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};
