import { addProduct } from '@/redux/cartSlice';
import styles from '@/styles/Product.module.css'
import axios from 'axios';
import Image from "next/legacy/image";
import { useState } from 'react';
import { useDispatch } from 'react-redux';





const Product = ({pizza}) => {
const [price, setPrice] = useState(pizza?.prices[0] || 0);
const [size, setSize] = useState(0);
const [extras, setExtras] = useState([]);
const [quantity, setQuantity] = useState(1);
const dispatch = useDispatch();


  
const handleSizeOptions = () => {
    if (pizza.title === "chicken") {
      return (
        <>
        </>
      );
    } else {
      return (
        <>
        </>
      );
    }
  };

const changePrice = (number) => {
    setPrice(price + number);
}

const handleSize = (sizeIndex)=> {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference)
};


const handleChange = (e, option) => {
  const checked = e.target.checked;
  // If the checkbox is checked
  if (checked) {
    // Uncheck the other checkboxes if one is already checked
    // Delete the option from the array if already exist
    if(pizza.title === "The Spot"){
    
    //Meat choice if one checked then the others uncheck
    if (option.text === "Chicken") {
      document.getElementById("Beef").checked = false;
      document.getElementById("Mixed Meat").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Beef" && extra.text !== "Mixed Meat"));
    } else if (option.text === "Beef") {
      document.getElementById("Chicken").checked = false;
      document.getElementById("Mixed Meat").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Chicken" && extra.text !== "Mixed Meat"));
    } else if (option.text === "Mixed Meat") {
      document.getElementById("Chicken").checked = false;
      document.getElementById("Beef").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Chicken" && extra.text !== "Beef"));
    }
    
     //Rice choice if one checked then the others uncheck
    else if (option.text === "White Rice") {
      document.getElementById("Spicy Rice").checked = false;
      document.getElementById("Mixed Rice").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Spicy Rice" && extra.text !== "Mixed Rice"));
    } else if (option.text === "Mixed Rice") {
      document.getElementById("White Rice").checked = false;
      document.getElementById("Spicy Rice").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "White Rice" && extra.text !== "Spicy Rice"));
    }else if (option.text === "Spicy Rice") {
      document.getElementById("White Rice").checked = false;
      document.getElementById("Mixed Rice").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "White Rice" && extra.text !== "Mixed Rice"));
    } 
    
    //Sauce choice if one checked then the others uncheck
    else if (option.text === "Mixed Sauce") {
      document.getElementById("White Sauce").checked = false;
      document.getElementById("BBQ Sauce").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "BBQ Sauce" && extra.text !== "White Sauce"));
    }else if (option.text === "BBQ Sauce") {
      document.getElementById("White Sauce").checked = false;
      document.getElementById("Mixed Sauce").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "White Sauce" && extra.text !== "Mixed Sauce"));
    } else if (option.text === "White Sauce") {
      document.getElementById("Mixed Sauce").checked = false;
      document.getElementById("BBQ Sauce").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Mixed Sauce" && extra.text !== "BBQ Sauce"));
    }
  }

  if(pizza.title === "5 Pc Tenders w/ Fries"){

    //Chicken choice if one checked then the others uncheck
    if (option.text === "Honey Mustard") {
    //unchecking all sauces that are "honey mustard"
      document.getElementById("BBQ").checked = false;
      document.getElementById("Buffalo").checked = false;
      document.getElementById("White Sauce").checked = false;
      document.getElementById("Ranch").checked = false;
      document.getElementById("Sweet & Sour").checked = false;
      document.getElementById("Blue Cheese").checked = false;

      setExtras((prev) => prev.filter((extra) => extra.text !== "BBQ" && extra.text !== "Buffalo"  && extra.text !== "White Sauce"  && extra.text !== "Ranch"  && extra.text !== "Sweet & Sour"  && extra.text !== "Blue Cheese"));
    } else if (option.text === "BBQ") {
      document.getElementById("Honey Mustard").checked = false;
      document.getElementById("Buffalo").checked = false;
      document.getElementById("White Sauce").checked = false;
      document.getElementById("Ranch").checked = false;
      document.getElementById("Sweet & Sour").checked = false;
      document.getElementById("Blue Cheese").checked = false;

      setExtras((prev) => prev.filter((extra) => extra.text !== "Honey Mustard" && extra.text !== "Buffalo"  && extra.text !== "White Sauce"  && extra.text !== "Ranch"  && extra.text !== "Sweet & Sour"  && extra.text !== "Blue Cheese"));
    }else if (option.text === "Buffalo") {
      document.getElementById("BBQ").checked = false;
      document.getElementById("Honey Mustard").checked = false;
      document.getElementById("White Sauce").checked = false;
      document.getElementById("Ranch").checked = false;
      document.getElementById("Sweet & Sour").checked = false;
      document.getElementById("Blue Cheese").checked = false;

      setExtras((prev) => prev.filter((extra) => extra.text !== "BBQ" && extra.text !== "Honey Mustard"  && extra.text !== "White Sauce"  && extra.text !== "Ranch"  && extra.text !== "Sweet & Sour"  && extra.text !== "Blue Cheese"));
    } else if (option.text === "White Sauce") {
      document.getElementById("Honey Mustard").checked = false;
      document.getElementById("Buffalo").checked = false;
      document.getElementById("BBQ").checked = false;
      document.getElementById("Ranch").checked = false;
      document.getElementById("Sweet & Sour").checked = false;
      document.getElementById("Blue Cheese").checked = false;

      setExtras((prev) => prev.filter((extra) => extra.text !== "Honey Mustard" && extra.text !== "Buffalo"  && extra.text !== "BBQ"  && extra.text !== "Ranch"  && extra.text !== "Sweet & Sour"  && extra.text !== "Blue Cheese"));
    }else if (option.text === "Ranch") {
      document.getElementById("Honey Mustard").checked = false;
      document.getElementById("Buffalo").checked = false;
      document.getElementById("White Sauce").checked = false;
      document.getElementById("BBQ").checked = false;
      document.getElementById("Sweet & Sour").checked = false;
      document.getElementById("Blue Cheese").checked = false;

      setExtras((prev) => prev.filter((extra) => extra.text !== "Honey Mustard" && extra.text !== "Buffalo"  && extra.text !== "White Sauce"  && extra.text !== "BBQ"  && extra.text !== "Sweet & Sour"  && extra.text !== "Blue Cheese"));
    }else if (option.text === "Sweet & Sour") {
      document.getElementById("Honey Mustard").checked = false;
      document.getElementById("Buffalo").checked = false;
      document.getElementById("White Sauce").checked = false;
      document.getElementById("Ranch").checked = false;
      document.getElementById("BBQ").checked = false;
      document.getElementById("Blue Cheese").checked = false;

      setExtras((prev) => prev.filter((extra) => extra.text !== "Honey Mustard" && extra.text !== "Buffalo"  && extra.text !== "White Sauce"  && extra.text !== "Ranch"  && extra.text !== "BBQ"  && extra.text !== "Blue Cheese"));
    }else if (option.text === "Blue Cheese") {
      document.getElementById("Honey Mustard").checked = false;
      document.getElementById("Buffalo").checked = false;
      document.getElementById("White Sauce").checked = false;
      document.getElementById("Ranch").checked = false;
      document.getElementById("BBQ").checked = false;
      document.getElementById("Sweet & Sour").checked = false;

      setExtras((prev) => prev.filter((extra) => extra.text !== "Honey Mustard" && extra.text !== "Buffalo"  && extra.text !== "White Sauce"  && extra.text !== "Ranch"  && extra.text !== "BBQ"  && extra.text !== "Sweet & Sour"));
    }




    if (option.text === "Coke") {
      //unchecking all sauces that are "Coke mustard"
        document.getElementById("Diet Coke").checked = false;
        document.getElementById("Sprite").checked = false;
        document.getElementById("Smart Water").checked = false;
        document.getElementById("Orange Fanta").checked = false;
        document.getElementById("Powerrade").checked = false;
        document.getElementById("Sweet Tea").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke" && extra.text !== "Sprite"  && extra.text !== "Smart Water"  && extra.text !== "Orange Fanta"  && extra.text !== "Powerrade"  && extra.text !== "Sweet Tea"));
      } else if (option.text === "BBQ") {
        document.getElementById("Honey Mustard").checked = false;
        document.getElementById("Buffalo").checked = false;
        document.getElementById("White Sauce").checked = false;
        document.getElementById("Ranch").checked = false;
        document.getElementById("Sweet & Sour").checked = false;
        document.getElementById("Blue Cheese").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Honey Mustard" && extra.text !== "Buffalo"  && extra.text !== "White Sauce"  && extra.text !== "Ranch"  && extra.text !== "Sweet & Sour"  && extra.text !== "Blue Cheese"));
      }else if (option.text === "Buffalo") {
        document.getElementById("BBQ").checked = false;
        document.getElementById("Honey Mustard").checked = false;
        document.getElementById("White Sauce").checked = false;
        document.getElementById("Ranch").checked = false;
        document.getElementById("Sweet & Sour").checked = false;
        document.getElementById("Blue Cheese").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "BBQ" && extra.text !== "Honey Mustard"  && extra.text !== "White Sauce"  && extra.text !== "Ranch"  && extra.text !== "Sweet & Sour"  && extra.text !== "Blue Cheese"));
      } else if (option.text === "White Sauce") {
        document.getElementById("Honey Mustard").checked = false;
        document.getElementById("Buffalo").checked = false;
        document.getElementById("BBQ").checked = false;
        document.getElementById("Ranch").checked = false;
        document.getElementById("Sweet & Sour").checked = false;
        document.getElementById("Blue Cheese").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Honey Mustard" && extra.text !== "Buffalo"  && extra.text !== "BBQ"  && extra.text !== "Ranch"  && extra.text !== "Sweet & Sour"  && extra.text !== "Blue Cheese"));
      }else if (option.text === "Ranch") {
        document.getElementById("Honey Mustard").checked = false;
        document.getElementById("Buffalo").checked = false;
        document.getElementById("White Sauce").checked = false;
        document.getElementById("BBQ").checked = false;
        document.getElementById("Sweet & Sour").checked = false;
        document.getElementById("Blue Cheese").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Honey Mustard" && extra.text !== "Buffalo"  && extra.text !== "White Sauce"  && extra.text !== "BBQ"  && extra.text !== "Sweet & Sour"  && extra.text !== "Blue Cheese"));
      }else if (option.text === "Sweet & Sour") {
        document.getElementById("Honey Mustard").checked = false;
        document.getElementById("Buffalo").checked = false;
        document.getElementById("White Sauce").checked = false;
        document.getElementById("Ranch").checked = false;
        document.getElementById("BBQ").checked = false;
        document.getElementById("Blue Cheese").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Honey Mustard" && extra.text !== "Buffalo"  && extra.text !== "White Sauce"  && extra.text !== "Ranch"  && extra.text !== "BBQ"  && extra.text !== "Blue Cheese"));
      }else if (option.text === "Blue Cheese") {
        document.getElementById("Honey Mustard").checked = false;
        document.getElementById("Buffalo").checked = false;
        document.getElementById("White Sauce").checked = false;
        document.getElementById("Ranch").checked = false;
        document.getElementById("BBQ").checked = false;
        document.getElementById("Sweet & Sour").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Honey Mustard" && extra.text !== "Buffalo"  && extra.text !== "White Sauce"  && extra.text !== "Ranch"  && extra.text !== "BBQ"  && extra.text !== "Sweet & Sour"));
      }

      

    //Sauce choice if one checked then the others uncheck
    else if (option.text === "Mixed Sauce") {
      document.getElementById("White Sauce").checked = false;
      document.getElementById("BBQ Sauce").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "BBQ Sauce" && extra.text !== "White Sauce"));
    }else if (option.text === "BBQ Sauce") {
      document.getElementById("White Sauce").checked = false;
      document.getElementById("Mixed Sauce").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "White Sauce" && extra.text !== "Mixed Sauce"));
    } else if (option.text === "White Sauce") {
      document.getElementById("Mixed Sauce").checked = false;
      document.getElementById("BBQ Sauce").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Mixed Sauce" && extra.text !== "BBQ Sauce"));
    }
  }



    changePrice(option.price);
    setExtras((prev) => [...prev, option]);
  } else {
    changePrice(-option.price);
    setExtras(extras.filter((extra) => extra._id !== option._id));
  }
};





const handleClick = () => {
    dispatch(addProduct({...pizza, extras, price, quantity}));
  };

  
  const sizeOptions = handleSizeOptions(pizza, handleSize);

    return (
        <div className={styles.container}>
        <div className={styles.left}> 
        <div className={styles.imgContainer}> 
        <Image src={pizza.img}  objectFit="contain" layout="fill" alt=""/> 
        </div>
        </div>
        <div className={styles.right}> 
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        {sizeOptions}



 {pizza.title === "The Spot" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Choose Ingredients</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4>Must Choose 1 Option</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 3).map((option) => (
       <div className={styles.option} key={option._id}>
      <input
      type="checkbox"
      id={option.text}
      name={option.text}
      className={styles.checkbox}
      onChange={(e) => handleChange(e, option)}
      />
            <label htmlFor={option.text}>{option.text}</label>
          </div>
        ))}
      </div>
      <h4>Must Choose 1 Option</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(3, 6).map((option) => (
          <div className={styles.option} key={option._id}>
            <input
              type="checkbox"
              id={option.text}
              name={option.text}
              className={styles.checkbox}
              onChange={(e) => handleChange(e, option)}
            />
            <label htmlFor={option.text}>{option.text}</label>
          </div>
        ))}
      </div>
      <h4>Must Choose 1 Option</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(6, 9).map((option) => (
          <div className={styles.option} key={option._id}>
            <input
              type="checkbox"
              id={option.text}
              name={option.text}
              className={styles.checkbox}
              onChange={(e) => handleChange(e, option)}
            />
            <label htmlFor={option.text}>{option.text}</label>
          </div>
        ))}
      </div>
    </div>
    <div>
      <h4>Additional options</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(9, 11).map((option) => (
          <div className={styles.option} key={option._id}>
            <input
              type="checkbox"
              id={option.text}
              name={option.text}
              className={styles.checkbox}
              onChange={(e) => handleChange(e, option)}
            />
            <label htmlFor={option.text}>{option.text}</label>
          </div>
        ))}
      </div>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(11, 14).map((option) => (
          <div className={styles.option} key={option._id}>
            <input
              type="checkbox"
              id={option.text}
              name={option.text}
              className={styles.checkbox}
              onChange={(e) => handleChange(e, option)}
            />
            <label htmlFor={option.text}>{option.text}</label>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
</>
)}

{pizza.title === "5 Pc Tenders w/ Fries" && (
  <>{/*For the two rows for the must include options and additional options*/}
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4>Choose 1 Sauce (Required)</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 7).map((option) => (
       <div className={styles.option} key={option._id}>
      <input
      type="checkbox"
      id={option.text}
      name={option.text}
      className={styles.checkbox}
      onChange={(e) => handleChange(e, option)}
      />
            <label htmlFor={option.text}>{option.text}</label>
          </div>
        ))}
      </div>
      <h4>Choose a Drink (optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(7, 14).map((option) => (
          <div className={styles.option} key={option._id}>
            <input
              type="checkbox"
              id={option.text}
              name={option.text}
              className={styles.checkbox}
              onChange={(e) => handleChange(e, option)}
            />
            <label htmlFor={option.text}>{option.text}</label>
          </div>
        ))}
      </div>
      <h4>Add a Biscuit (optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(14, 17).map((option) => (
          <div className={styles.option} key={option._id}>
            <input
              type="checkbox"
              id={option.text}
              name={option.text}
              className={styles.checkbox}
              onChange={(e) => handleChange(e, option)}
            />
            <label htmlFor={option.text}>{option.text}</label>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
</>
)}























    {/*Add to cart button*/}
    <div className={styles.add}>
        {/* <input onChange={(e)=>setQuantity(e.target.value)} type="number" defaultValue={1} className={styles.quantity}/> */}
        <button className={styles.button} onClick={handleClick}>
        Add to Cart
        </button>
    </div>
    </div>
    </div>
    )
}

export const getServerSideProps = async ({ params }) => {
    const res = await axios.get(
      `http://localhost:3000/api/products/${params.id}`
    );
    return {
      props: {
        pizza: res.data,
      },
    };
  };


export default Product