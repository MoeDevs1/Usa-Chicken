import Head from 'next/head'
import Image from 'next/legacy/image'
import styles from '@/styles/Home.module.css'
import Featured from '@/components/featured';
import PizzaList from '@/components/PizzaList';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState, useRef } from "react";
import { RxEnter } from 'react-icons/rx';
import { useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { TbPigMoney } from "react-icons/tb";
import { GiTakeMyMoney } from "react-icons/gi";
import { Doughnut } from 'react-chartjs-2';
import { SemiCircle } from 'react-progressbar.js';


const pizzas = [
  {
    id: 1,
    title: 'The Spot',
    img: '/img/spot.webp',
    desc: 'A customizable and spicy dish with rice, meat, sauce, salad, and drink. Choose your favorites and enjoy a satisfying meal.',
    price: '$16.99',
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
  const quantity = useSelector((state) => state.cart.quantity);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  // const [userPoints, setUserPoints] = useState(0);
  let [points, setPoints] = useState(0);

  const dropdownRef = useRef(null); // Create a ref for the dropdown container

  const totalPoints = 100;



const options = {
    strokeWidth: 6,
    // color to be replaced with gradient via CSS
    color: 'url(#gradient)',
    trailColor: '#eee',
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    text: {
        value: '',
    },
    // Remove color animation
    from: { color: '#ED6A5A' },
    to: { color: '#ED6A5A' },
    step: (state, bar) => {
        bar.setText(Math.round(bar.value() * totalPoints));
    },
};

const containerStyle = {
    width: '300px',
    height: '150px',
};

if (points > 110){
  points = 100;

}

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
          const { firstName, lastName, points} = response.data;
          setNewFirstName(firstName);
          setNewLastName(lastName);
          // setUserPoints(points);
          setPoints(points);
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
  <div className={styles.circularContainer}>
  <img className={styles.banner} src={"/img/306745897_595177622299564_6310950388275390202_n.jpeg"} alt="banner" />
  </div>
  <img className={styles.halal} src={"/img/halal.png"} alt="halal" />
</div>
      <div className={styles.buttons}>

      <button className={styles.button}>Order Now from Manchester            <RxEnter className={styles.icon} />
</button>
     <button className={styles.button1}>Order Now from Nashua       <RxEnter className={styles.icon} />
</button>

 </div>
      <div className={styles.content}>
        <div className={styles.words}>
          <div className={styles.paragraph1}>
        </div>
        </div>  
      </div>
      <h2 className={styles.top}>Popular Dishes       <span className={styles.scroller}>Scroll &gt;</span>     </h2>
       <div className={styles.pizzaListContainer}>
      <ul className={styles.pizzaList}>
    
      {pizzas.map(pizza => (
  <li key={pizza.id} className={styles.pizzaItem}>
    <Link href={pizza.shref}>
      <div>
        <div className={styles.imageWrapper}>
          <Image src={pizza.img} alt={pizza.title} width={280} height={180}/>
        </div>
        <h3 className={styles.pizzaTitle}>{pizza.title}</h3>
        <p className={styles.pizzaDesc}>{pizza.desc}</p>
        <span className={styles.pizzaPrice}>{pizza.price}</span> {/* Added className here */}
      </div>         
    </Link> 
  </li>
))}




      </ul>
      </div>

      <div className={styles.menuParent}>
      <Link href="/menu">
      <button className={styles.menuButton}>View Full Menu  </button>
      {/* <Image src="/img/menuIcon.png" className={styles.menuImg}  width={40} height={40} /> */}
      </Link>
      </div>
      {!sessionToken && (

      <div className={styles.signupContainer}>
  <div className={styles.imageContainer}>
  <div className={styles.slideInImage}>
      {/* <Image className={styles.signImg} src="/img/logo.png" alt="" width={300} height={300} /> */}
    </div>  
    
    
    </div>
  <div className={styles.textContainer}>
  <div className={styles.head1}>
            <Image src="/img/Logo.png" alt="" width="290" height="290" />
            
          </div>
    <h2 className={styles.signupP}>Sign Up & Earn Points!</h2>
    <p className={styles.signupDesc}>Join USA-Chicken®. Earn points with every qualifying purchase. Redeem available rewards of your choice.</p>
    <div className={styles.deliveryOptions}>
      <Link href="/Signup">
        <button className={styles.signupButton}>Sign Me Up!</button>
      </Link>
    </div>
    <h5 className={styles.lastSign}>Already have an account?   <Link className={styles.signin} href="/Signup">  Sign-in </Link></h5>
  </div>
  
</div>
      )}
     
     
     
      {sessionToken && (
   <div className={styles.signupContainer}>

   <div className={styles.textContainer}>

    
   <div className={styles.textContainer2}>

     <div className={styles.head}>
     <h2 className={styles.signup3}>Reward Tracker    
          
</h2>
< GiTakeMyMoney  className={styles.check}/>

</div>

<div className={styles.textContainer2p}>

<CircularProgressbar 
  className={styles.circularProgress}

value={points}
maxValue={totalPoints}
text={`${points}/${totalPoints}`}
styles={buildStyles({
 strokeLinecap: "round",
 textSize: "20px",
 pathColor: `rgba(62, 152, 199, ${points / totalPoints})`,
 textColor: '',
 trailColor: '#d6d6d6',
 backgroundColor: '#3e98c7',
 pathTransition: 'stroke-dashoffset 0.5s ease 0s',
 transition: 'stroke 0.3s, stroke-width 0.3s ease-in-out',
 strokeWidth: 8,
 pathTransitionDuration: 0.5,
})}

/>
</div>
</div>


<div className={styles.headmax}>
   
{points === 100 ? (
  <div className={styles.head}>
    <h2 className={styles.signup4}>Congrats! Redeem 10% Off your next purchase! </h2>
  </div>
) : (
  <div className={styles.head}>
    <h2 className={styles.signup4}>Your {points/10}/10th Of The Way Off 10% </h2>
  </div>
)}


  
     <div className={styles.head}>

         </div>
    
         </div>

       
         <div className={styles.heade}>


    
          <Link href="/menu">
           <button className={styles.signupButton2}>Redeem</button>
           </Link>



  </div>
  </div>
   </div>
      )}


      <div className={styles.delivery}>
  <h2 className={styles.deliveryTitle}>Delivery Options</h2>
  <p className={styles.deliveryP}>Enjoy the convenience of delivery through popular services like DoorDash, Grubhub, and UberEats. Order your favorite meals and have them delivered right to your doorstep. We partner with trusted delivery providers to ensure a seamless and reliable experience for our customers.</p>

  <div className={styles.deliveryOptions}>
  <a href="https://www.ubereats.com/store/usa-chicken-%26-biscuit/3dYWUZGfRDqHxTYxFni34A" target="_blank">
    <Image className={styles.deliveryLogo} src="/img/ubereats.png" alt="UberEats" width={65} height={60} />
  </a>
  <a href="https://www.grubhub.com/restaurant/usa-chicken--biscuit-990-elm-st-manchester/1105914" target="_blank">
    <Image className={styles.deliveryLogo} src="/img/grubhub.png" alt="Grubhub" width={100} height={100} />
  </a>
  <a href="https://www.doordash.com/store/usa-chicken-&-biscuit-manchester-675957/" target="_blank">
    <Image className={styles.deliveryLogo} src="/img/doordash.png" alt="DoorDash" width={100} height={100} />
  </a>
  
</div>

</div>

</div>

); 
}
