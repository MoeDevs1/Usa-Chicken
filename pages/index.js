import Head from 'next/head'
import Image from 'next/legacy/image'
import styles from '@/styles/Home.module.css'
import Featured from '@/components/featured';
import PizzaList from '@/components/PizzaList';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState, useRef, useSelector, useRouter } from "react";
import { RxEnter } from 'react-icons/rx';
import SignPoints from '@/components/signPoints'; // import the Address component



const pizzas = [
  {
    id: 1,
    title: 'The Spot',
    img: '/img/spot.webp',
    desc: 'A customizable and spicy dish with rice, meat, sauce, salad, and drink. Choose your favorites and enjoy a satisfying meal.',
    price: '$16.50',
    shref: "/Products/6428772c1f3cd6526fd276d6"

  },
  {
    id: 1,
    title: '5 Pc Tenders w/ Fries',
    img: '/img/fries&chicken.webp',
    desc: 'A crispy and juicy combo of chicken tenders and fries. Choose your sauce and enjoy a filling meal.',
    price: '$14.25',
    shref: "/Products/64286e131f3cd6526fd27587"

  },
  {
    id: 1,
    title: 'Beef Patty',
    img: '/img/beefP.webp',
    desc: 'Jamaican beef patties are made with a flaky pastry and filled with a fragrant seasoned beef filling.',
    price: '$3.99',
    shref: "/Products/642878f71f3cd6526fd2777c"

  },
  {
    id: 3,
    title: '5 Pc Chicken',
    img: '/img/chicken.webp',
    desc: 'The 5-piece chicken meal includes chicken, 2 sides, and 2 biscuits, offering a satisfying and filling option.',
    price: '$15.50' ,
    shref: "/Products/6428b53f1f3cd6526fd27b93"

  },
  {
    id: 5,
    title: '6 Pc Wings',
    img: '/img/chickenWings.jpeg',
    desc: 'Enjoy a 6-piece wings meal with your choice of sauce, including options like BBQ, Buffalo, and Bone in Spice.',
    price: '$8.99',
    shref: "/Products/6429b2146e949cdbabc23843"

  },
  {
    id: 6,
    title: 'Tres Leches Cake',
    img: '/img/tres.webp',
    desc: 'A cake soaked in a sweet mixture of three different milks, topped with a fluffy whipped cream frosting.',
    price: '$5.00' ,
    shref: "/Products/6428b85e1f3cd6526fd27c76"

  }
];




export default function Home({ pizzaList }) {
  const [showNav, setShowNav] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [emailState, setEmailState] = useState('');
  const dropdownRef = useRef(null); // Create a ref for the dropdown container

  

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const redirectToOtherAccount = (event) => {
    event.preventDefault();
    console.log("Redirecting to other account");
  };

  const handleSignup = async () => {
    router.push('/Signup');
  };

  const redirectToSettings = () => {
    router.push('/userProfile');
  };



  useEffect(() => {

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('/api/getUserDetails');
      if (response.status === 200) {
        setSessionToken(true);
        const { firstName, lastName, email } = response.data;
        setNewFirstName(firstName);
        setNewLastName(lastName);
        setEmailState(email);
      } else {
        setSessionToken(null);
      }
      
    } catch (error) {
      console.error('Error fetching user details', error);
      setSessionToken(null);
    }
    
  };

  fetchUserDetails();
  }, [sessionToken]);



  const signOut = async () => {
    try {
      let session = null;
      let response = null;
  
      try {
        session = await axios.get('/api/getUserDetails');
      } catch (error) {
        console.error('Error getting session details', error);
      }
  
      try {
        response = await axios.get('/api/getUserDetails?signout=true');
      } catch (error) {
        console.error('Error signing out', error);
      }
  
      if (session && session.data) {
        await nextAuthSignOut();
      }
  
      if (response && response.status === 200) {
        setSessionToken(null);
      } else {
        console.error('Error signing out');
      }
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowNav(false);
      setShowDropdown(false); // Hide the dropdown when clicking away from it
    } else {
      setShowNav(false);
    }
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (

    <div className={styles.container}>
      <Head>
        <title>USA Chicken and Biscuits</title>
        <meta name="description" content="Best Chicken Restraunt in New Hampshire" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      

      <div className={styles.bannerContainer}>
    <img className={styles.banner} src={"/img/banner.jpg"} alt="banner" />
    <div className={styles.circularContainer}>
  <img className={styles.halal} src={"/img/halal.png"} alt="halal" />
  </div>
</div>

      <div className={styles.buttons}>
      <div className={styles.slideInImage}>
      <Link href="/menu">
      <button className={styles.button}>Order Now from Manchester            <RxEnter className={styles.icon} />
</button>
</Link>

</div>
<div className={styles.slideInImage2}>
     <button className={styles.button1}>Order Now from Nashua       <RxEnter className={styles.icon} />
</button>

</div>
 </div>
      <div className={styles.content}>
        <div className={styles.words}>
          <div className={styles.paragraph1}>
        </div>
        </div>  
      </div>
      
      <h2 className={styles.top}>Popular Dishes </h2>

       <div className={styles.pizzaListContainer}>
      <ul className={styles.pizzaList}>
  
      {pizzas.map(pizza => (
  <li key={pizza.id} className={styles.pizzaItem}>
    <Link href={pizza.shref}>
      <div>
        <div className={styles.imageWrapper}>
          <Image className={styles.pizzaImg} src={pizza.img} alt={pizza.title} width={300} height={200}/>
        </div>
        <h3 className={styles.pizzaTitle}>{pizza.title}</h3>
        <p className={styles.pizzaDesc}>{pizza.desc}</p>
        <p className={styles.pizzaPrice}>{pizza.price}</p> {/* Added className here */}
      </div>         
    </Link> 
  </li>
))}




      </ul>
      <div className={styles.menuParent}>
      <Link href="/menu">
      <button className={styles.menuButton}>View Full Menu  </button>




      </Link>
      </div>
      </div>

{/* 
      <div className={styles.mealContainer}>
    <img className={styles.meal} src={"/img/fullMeal.jpeg"} alt="banner" />
</div> */}

      {sessionToken ? (
        <div>
        </div>
      ) : (
        <SignPoints/>

      )}

<div className={styles.delivery}>
  <h2 className={styles.deliveryTitle}>Delivery Options</h2>
  {/* <div className={styles.lineTip}></div>  */}

  <p className={styles.deliveryP}>Enjoy the convenience of delivery through popular services like DoorDash, Grubhub, and UberEats. Order your favorite meals and have them delivered right to your doorstep. We partner with trusted delivery providers to ensure a seamless and reliable experience for our customers.</p>

  <div className={styles.deliveryOptions}>
  <a href="https://www.ubereats.com/store/usa-chicken-%26-biscuit/3dYWUZGfRDqHxTYxFni34A" target="_blank">
    <Image className={styles.deliveryLogo} src="/img/ubereats.png" alt="UberEats" width={120} height={120} />
  </a>
  <a href="https://www.grubhub.com/restaurant/usa-chicken--biscuit-990-elm-st-manchester/1105914" target="_blank">
    <Image className={styles.deliveryLogo} src="/img/grubhub.png" alt="Grubhub" width={180} height={180} />
  </a>
  <a href="https://www.doordash.com/store/usa-chicken-&-biscuit-manchester-675957/" target="_blank">
    <Image className={styles.deliveryLogo} src="/img/doordash.png" alt="DoorDash" width={150} height={150} />
  </a>
</div>
</div>

</div>

); 
}