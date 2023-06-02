import { addProduct } from '@/redux/cartSlice';
import styles from '@/styles/Product.module.css'
import axios from 'axios';
import Image from "next/legacy/image";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import Address from '@/components/address'; // import the Address component
import Link from 'next/link';


const Product = ({pizza}) => {

const [price, setPrice] = useState(pizza.prices[0] || 0);
const [size, setSize] = useState(0);
const [extras, setExtras] = useState([]);
const [quantity, setQuantity] = useState(1);
const dispatch = useDispatch()
;
const handleMinusButtonClick = () => {
  if (quantity > 1) {
    setQuantity(quantity - 1);
  }
};

// Function to handle the plus button click
const handlePlusButtonClick = () => {
  if (quantity < 10) {
    setQuantity(quantity + 1);
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

const [previousOption, setPreviousOption] = useState("");

const options = [  {    group: 'meat',    choices: ['Chicken', 'Beef', 'Mixed Meat', 'Fish', 'Veggie'],
    extrasToRemove: ['Beef', 'Mixed Meat', 'Fish', 'Veggie', 'Chicken']
  },
  {
    group: 'rice',
    choices: ['White Rice', 'Mixed Rice', 'Spicy Rice'],
    extrasToRemove: ['Spicy Rice', 'Mixed Rice', 'White Rice']
  },
  {
    group: 'sauce',
    choices: ['Mixed Sauce', 'BBQ Sauce', 'White Sauce', 'No Sauce'],
    extrasToRemove: ['BBQ Sauce', 'White Sauce', 'No Sauce', 'Mixed Sauce']
  },
  {
    group: 'drinks',
    choices: ['Coke +$3.50', 'Diet Coke +$3.50', 'Sprite +$3.50', 'Smart Water +$3.50', 'Powerrade +$3.50', 'Orange Fanta +$3.50', 'Sweet Tea +$3.50'],
    extrasToRemove: ['Coke +$3.50','Powerrade +$3.50', 'Orange Fanta +$3.50', 'Sweet Tea +$3.50', 'Diet Coke +$3.50', 'Sprite +$3.50', 'Smart Water +$3.50',]
  },
  {
    group: 'chicken sauce',
    choices: ['BBQ', 'Honey Mustard', 'Buffalo', 'White Sauce ', 'Ranch', 'Sweet & Sour', 'Blue Cheese'],
    extrasToRemove: ['BBQ', 'Honey Mustard', 'Buffalo', 'White Sauce ', 'Ranch', 'Sweet & Sour', 'Blue Cheese']
  },
  {
    group: 'biscuits',
    choices: ['One Biscuit +$0.99', 'Two Biscuits +$1.99', 'Four Biscuits +$3.50'],
    extrasToRemove: ['One Biscuit +$0.99', 'Two Biscuits +$1.99', 'Four Biscuits +$3.50']
  },
  {
    group: 'cheese',
    choices: ['No Cheese', 'Add Cheese +$0.50', 'With Coco Bread and Cheese +$2.00'],
    extrasToRemove: ['No Cheese', 'Add Cheese +$0.50', 'With Coco Bread and Cheese +$2.00']
  },
  {
    group: 'side choice',
    choices: ['Coleslaw', 'Corn', 'Mac & Cheese', 'Mashed Potatoes'],
    extrasToRemove: ['Coleslaw', 'Corn', 'Mac & Cheese', 'Mashed Potatoes']
  },
  {
    group: 'recommended',
    choices: ['Small Fries +$3.50', 'Mozzarella Sticks (6pc.) +$6.99', 'Mac & Cheese +$3.50'],
    extrasToRemove: ['Small Fries +$3.50', 'Mozzarella Sticks (6pc.) +$6.99', 'Mac & Cheese +$3.50']
  },
  {
    group: 'dessert',
    choices: ['Tres Leches Cake +$5.00', 'Oreo Cake +$5.00', 'Carrot Cake +$5.00', 'Chocolate Cake +$5.00'],
    extrasToRemove: ['Tres Leches Cake +$5.00', 'Oreo Cake +$5.00', 'Carrot Cake +$5.00', 'Chocolate Cake +$5.00']
  },
  {
    group: 'add a side',
    choices: ['French Fries +$3.50', 'Coleslaw +$3.50', 'Mac & Cheese +$3.50 ', 'Mashed Potatoes & Gravy +$3.50' , 'Beef Patty +$3.50', 'Corn +$3.50' ],
    extrasToRemove: ['French Fries +$3.50', 'Coleslaw +$3.50', 'Mac & Cheese +$3.50 ', 'Mashed Potatoes & Gravy +$3.50' , 'Beef Patty +$3.50', 'Corn +$3.50' ]
  },
  {
    group: 'rice or fries',
    choices: ['Rice', 'French Fries'],
    extrasToRemove: ['Rice', 'French Fries']
  },
  {
    group: 'wing sauces',
    choices: ['Bone in Spice', 'BBQ ', 'Buffalo ', 'Traditional'],
    extrasToRemove:  ['Bone in Spice', 'BBQ ', 'Buffalo ', 'Traditional']
  },
  {
    group: 'Cheese steak',
    choices: ['No Onions', 'No Peppers', 'No Mayo', 'Double Cheese +$1.33'],
    extrasToRemove:  ['No Onions', 'No Peppers', 'No Mayo', 'Double Cheese +$1.33']
  },
  {
    group: 'chicken size',
    choices: ['5 Pc', '9 Pc +$5.49', '15 Pc +$15.00', '21 Pc +$22.25', '35 Pc +$45.99',  '50 Pc +$64.99'],
    extrasToRemove:  ['5 Pc', '9 Pc +$5.49', '15 Pc +$15.00', '21 Pc +$22.25', '35 Pc +$45.99',  '50 Pc +$64.99']
  },
  {
    group: 'chicken selection',
    choices: ['Wings +$1.20', 'Legs +$2.10', 'Breast +$3.30', 'Thigh +$3.30'],
    extrasToRemove: ['Wings +$1.20', 'Legs +$2.10', 'Breast +$3.30', 'Thigh +$3.30']
  },
  {
    group: 'by the piece selection',
    choices: ['Wing +$1.50', 'Leg / Drumstick +$2.50', 'Breast +$3.99', 'Thigh +$3.99'],
    extrasToRemove:  ['Wing +$1.50', 'Leg / Drumstick +$2.50', 'Breast +$3.99', 'Thigh +$3.99']
  },
  {
    group: 'sodeChoice',
    choices: ['Diet Coke ', 'Sprite ', 'Coke', 'Orange Fanta ', 'Root Beer ', 'Ginger Ale '],
    extrasToRemove: ['Diet Coke ', 'Sprite ', 'Coke', 'Orange Fanta ', 'Root Beer ','Ginger Ale ']
  },
  {
    group: 'newSideChoice',
    choices: ['2. Coleslaw', '2. Corn', '2. Mac & Cheese', '2. Mashed Potatoes'],
    extrasToRemove: ['2. Coleslaw', '2. Corn', '2. Mac & Cheese', '2. Mashed Potatoes']
  },
  {
    group: 'newSideChoice',
    choices: ['3. Coleslaw', '3. Corn', '3. Mac & Cheese', '3. Mashed Potatoes'],
    extrasToRemove: ['3. Coleslaw', '3. Corn', '3. Mac & Cheese', '3. Mashed Potatoes']
  },
  {
    group: 'newSideChoice',
    choices: ['4. Coleslaw', '4. Corn', '4. Mac & Cheese', '4. Mashed Potatoes'],
    extrasToRemove: ['4. Coleslaw', '4. Corn', '4. Mac & Cheese', '4. Mashed Potatoes']
  },
  {
    group: 'newSideChoice',
    choices: ['5. Coleslaw', '5. Corn', '5. Mac & Cheese', '5. Mashed Potatoes'],
    extrasToRemove: ['5. Coleslaw', '5. Corn', '5. Mac & Cheese', '5. Mashed Potatoes']
  },
  {
    group: 'newSideChoice',
    choices: ['6. Coleslaw', '6. Corn', '6. Mac & Cheese', '6. Mashed Potatoes'],
    extrasToRemove: ['6. Coleslaw', '6. Corn', '6. Mac & Cheese', '6. Mashed Potatoes']
  },
  {
    group: 'twoLiter',
    choices: ['Coke Cola', 'Diet Coke', 'Sprite'],
    extrasToRemove: ['Coke Cola', 'Diet Coke', 'Sprite']
  },
  {
    group: 'jumboShrimp',
    choices: ['6 Pc', '10 Pc +$1.51'],
    extrasToRemove: ['10 Pc +$1.51', '6 Pc']
  },
  {
    group: 'jumboShrimps',
    choices: ['6pc', '10pc +$3.49'],
    extrasToRemove: ['10pc +$3.49', '6pc']
  },
  {
    group: 'chickenChoiceWraps',
    choices: ['Crispy Chicken', 'Grilled Chicken', 'Grilled Beef'],
    extrasToRemove: ['Crispy Chicken', 'Grilled Chicken', 'Grilled Beef']
  },
  {
    group: 'newSauce',
    choices: ['1 BBQ', '1 Honey Mustard', '1 Buffalo', '1 White Sauce', '1 Ranch', '1 Sweet & Sour', '1 Blue Cheese'],
    extrasToRemove: ['1 BBQ', '1 Honey Mustard', '1 Buffalo', '1 White Sauce', '1 Ranch', '1 Sweet & Sour', '1 Blue Cheese']
  },
  {
    group: 'nuggetSac',
    choices: ['1. BBQ', '1. Honey Mustard', '1. Buffalo', '1. White Sauce', '1. Ranch', '1. Sweet & Sour', '1. Blue Cheese'],
    extrasToRemove: ['1. BBQ', '1. Honey Mustard', '1. Buffalo', '1. White Sauce', '1. Ranch', '1. Sweet & Sour', '1. Blue Cheese']
  },
];

const [originalPrice, setOriginalPrice] = useState(price);

const handleChange = (e, option) => {
  const checked = e.target.checked;

  if (checked) {
    options.forEach((group) => {
      if (group.choices.includes(option.text)) {
        group.choices.forEach((choice) => {
          if (choice !== option.text) {
            const choiceCheckbox = document.getElementById(choice);

            if (choiceCheckbox.checked) {
              choiceCheckbox.checked = false;
              setPrice(prevPrice => parseFloat((prevPrice - parseFloat(choiceCheckbox.value)).toFixed(2)));
              setExtras((prev) => prev.filter((extra) => extra._id !== choiceCheckbox.id));
            }
          }
        });

        setExtras((prev) => {
          const newExtras = prev.filter((extra) => !group.extrasToRemove.includes(extra.text));
          const newPrice = newExtras.reduce((total, extra) => total + parseFloat(extra.price), 0);
          setPrice(parseFloat((originalPrice + newPrice + parseFloat(option.price)).toFixed(2))); // add back original price
          return [...newExtras, option];
        });
      }
    });
  } else {
    setPrice(prevPrice => parseFloat((prevPrice - parseFloat(option.price)).toFixed(2)));
    setExtras((prev) => prev.filter((extra) => extra._id !== option._id));
  }
};




const [specialInstructions, setSpecialInstructions] = useState('');

const [isAdded, setIsAdded] = useState(false);


const handleClick = () => {
  const extrasArray = specialInstructions ? [...extras, specialInstructions] : extras;
  const product = { ...pizza, extras: extrasArray, price, quantity };
  dispatch(addProduct(product));
  setSpecialInstructions(''); // clear the input field after adding to cart
  setIsAdded(true);

  setTimeout(() => {
    setIsAdded(false);
  }, 1000);
}

    return (
      <div>
              <Address />

      <div className={styles.mainContainer}>
      <div className={styles.scrollContainer}>
        <div className={styles.pageOne}>
          <div className={styles.container}>
       
            <div className={styles.formContainer}>
              <p className={styles.desc}>{pizza.desc}</p>
              <div className={styles.imgContainer}>
              <Image
  src={pizza.img}
  width={600}
  height={600}
  objectFit="contain"
  alt=""
  style={{ border: '2px solid red', borderRadius: '30px' }}
/>
              </div>
              </div>

              
  {/*checkboxes for the spot*/}
  {pizza.title === "The Spot" && (
              <>
                <h3 className={styles.choose}>Customize Your Order</h3>
                <div className={styles.ingredients}>
                  <div className={styles.options}>
                    <div>
                      <h4 className={styles.choiceOf}>Choice of Meat <span className={styles.required}>(Required)</span>
                      </h4>
                      <div className={styles.optionRow} style={{marginRight: '100px'}}>
                        {pizza.extraOptions.slice(0, 5).map((option) => (
                          <div className={styles.option} key={option._id}>
                            <input
                              type="checkbox"
                              id={option.text}
                              name={option.text}
                              className={styles.checkbox}
                              onChange={(e) => handleChange(e, option)}
                              value={option.price}
                            />
                            <label htmlFor={option.text}>{option.text}</label>
                          </div>
                        ))}
                      </div>
                      <h4 className={styles.choiceOf}>Choice of Rice <span className={styles.required}>(Required)</span>
                      </h4>
                      <div className={styles.optionRow}>
                        {pizza.extraOptions.slice(5, 8).map((option) => (
                          <div className={styles.option} key={option._id}>
                            <input
                              type="checkbox"
                              id={option.text}
                              name={option.text}
                              className={styles.checkbox}
                              onChange={(e) => handleChange(e, option)}
                              value={option.price}
                            />
                            <label htmlFor={option.text}>{option.text}</label>
                          </div>
                        ))}
                      </div>
                      <h4 className={styles.choiceOf}>Choice of Sauce <span className={styles.required}>(Required)</span>
                      </h4>
                      <div className={styles.optionRow}>
                        {pizza.extraOptions.slice(8, 12).map((option) => (
                          <div className={styles.option} key={option._id}>
                            <input
                              type="checkbox"
                              id={option.text}
                              name={option.text}
                              className={styles.checkbox}
                              onChange={(e) => handleChange(e, option)}
                              value={option.price}
                            />
                            <label htmlFor={option.text}>{option.text}</label>
                          </div>
                        ))}
                      </div>
                      <h4 className={styles.choiceOf}>Add-ons <span className={styles.optional}>(Optional)</span></h4>
                      <div className={styles.optionRow}>
                        {pizza.extraOptions.slice(12, 18).map((option) => (
                          <div className={styles.option} key={option._id}>
                            <input
                              type="checkbox"
                              id={option.text}
                              name={option.text}
                              className={styles.checkbox}
                              onChange={(e) => handleChange(e, option)}
                              value={option.price}
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

 {/*checkboxes for the spot*/}
 {pizza.title === "5 Pc Tenders w/ Fries" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Sauce <span className={styles.required}>(Required)</span>
</h4>
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)
</h4>
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

{/*checkboxes for beef patty*/}
{pizza.title === "Beef Patty" && (
  <>{/*For the two rows for the must include options and additional options*/}
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>

    <h4 className={styles.choiceOf} >Cheese Choice <span className={styles.required}>(Required)</span>
</h4>
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
    </div>
  </div>
</div>
</>
)}

 {/*checkboxes for the spot*/}
 {pizza.title === "5 Pc Chicken" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Two Sides  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 4).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(4, 11).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)</h4>
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
      <h4 className={styles.choiceOf} >Recommended Sides and Appetizers (Optional)</h4>
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
      <h4 className={styles.choiceOf} >Recommended Desserts (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(17, 21).map((option) => (
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

 {pizza.title === "5 Pc Chicken w Side" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 2).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(2, 9).map((option) => (
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
     <h4 className={styles.choiceOf} >Recommended Desserts (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(9, 13).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(13, 16).map((option) => (
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


{pizza.title === "3 Pc Tenders w/ Fries" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Sauce <span className={styles.required}>(Required)</span>
</h4>
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)</h4>
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

{pizza.title === "6 Pc Wings" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Sauce  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 4).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(4, 10).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(10, 17).map((option) => (
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

{pizza.title === "9 Pc Tenders w/ Fries" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Sauce - Select at least 1 <span className={styles.required}>(Required)</span>
</h4>
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)</h4>
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

{pizza.title === "Philly Cheese Steak Sub" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Cheese Sub Toppings (Optional)</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 4).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(4, 10).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(10, 17).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(17, 21).map((option) => (
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


{pizza.title === "Cheese Burger" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(0, 6).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(6, 13).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(13, 17).map((option) => (
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

{pizza.title === "Chicken Sub" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Cheese Sub Toppings (Optional)</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 4).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(4, 10).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(10, 17).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(17, 21).map((option) => (
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

{pizza.title === "Double Cheese Burger" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(0, 6).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(6, 13).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(13, 17).map((option) => (
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

{pizza.title === "Crispy Chicken Sandwich" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(0, 6).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(6, 13).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(13, 17).map((option) => (
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

{pizza.title === "Steak & Cheese Sub" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(0, 6).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(6, 13).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(13, 17).map((option) => (
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

{pizza.title === "Beef Gyro" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(0, 6).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(6, 13).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(13, 17).map((option) => (
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

{pizza.title === "Chicken Gyro" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(0, 6).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(6, 13).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(13, 17).map((option) => (
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

{pizza.title === "Grilled Chicken Sandwich" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(0, 6).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(6, 13).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(13, 17).map((option) => (
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

{pizza.title === "Fish Sandwich" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(0, 6).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(6, 13).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(13, 17).map((option) => (
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

{pizza.title === "Italian Cheeseburger Sub" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(0, 6).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(6, 13).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(13, 17).map((option) => (
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

{pizza.title === "The Banger" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(0, 6).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(6, 13).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(13, 17).map((option) => (
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

{pizza.title === "Holy Chuck!" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(0, 6).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(6, 13).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(13, 17).map((option) => (
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


{pizza.title === "Grilled Chicken Sub" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(0, 6).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(6, 13).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(13, 17).map((option) => (
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

{pizza.title === "6 Pc. Wings" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Sauce  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 4).map((option) => (
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

{pizza.title === "9 Pc Wings" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Sauce  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 4).map((option) => (
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

{pizza.title === "12 Pc Wings" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Sauce  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 4).map((option) => (
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


{pizza.title === "15 Pc Wings" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Sauce  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 4).map((option) => (
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

{pizza.title === "20 Pc Wings" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Sauce  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 4).map((option) => (
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

{pizza.title === "30 Pc Wings" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Sauce  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 4).map((option) => (
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

{pizza.title === "50 Pc Wings" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Sauce  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 4).map((option) => (
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

{pizza.title === "Bone-in Fried Chicken" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Preparation Addition  (Optional)</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 4).map((option) => (
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
      <h4 className={styles.choiceOf} >Chicken Size <span className={styles.required}>(Required)</span></h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(4, 10).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(10, 13).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Side  (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(13, 19).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Drink  (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(19, 26).map((option) => (
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
      <h4 className={styles.choiceOf} >Recommended Desserts (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(26, 30).map((option) => (
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

{pizza.title === "By The Piece" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Piece  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 4).map((option) => (
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
      <h4 className={styles.choiceOf} >Choice of Biscuits (Optional)
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(4,7).map((option) => (
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

{pizza.title === "2 Pc Chicken w/ Side" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 2).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(2, 9).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(9, 15).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(15, 18).map((option) => (
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
      <h4 className={styles.choiceOf} >Recommended Desserts (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(18, 22).map((option) => (
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

{pizza.title === "3 Pc Chicken w/ Side" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 2).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(2, 9).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(9, 15).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(15, 18).map((option) => (
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
      <h4 className={styles.choiceOf} >Recommended Desserts (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(18, 22).map((option) => (
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

{pizza.title === "5 Pc Chicken w/ Side" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 2).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(2, 9).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(15, 18).map((option) => (
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
      <h4 className={styles.choiceOf} >Recommended Desserts (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(18, 22).map((option) => (
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

{pizza.title === "8 Pc Chicken w/ Side" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 2).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(2, 9).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(9, 15).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(15, 18).map((option) => (
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
      <h4 className={styles.choiceOf} >Recommended Desserts (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(18, 22).map((option) => (
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

{pizza.title === "10 Pc Chicken w/ Side" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 2).map((option) => (
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
      <h4 className={styles.choiceOf} >Choice of Soda <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(2, 5).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(5, 11).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)</h4>
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
      <h4 className={styles.choiceOf} >Recommended Desserts (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(14, 18).map((option) => (
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


{pizza.title === "15 Pc Chicken w/ Side" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 2).map((option) => (
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
      <h4 className={styles.choiceOf} >Choice of Soda <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(2, 5).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(5, 11).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)</h4>
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
      <h4 className={styles.choiceOf} >Recommended Desserts (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(14, 18).map((option) => (
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

{pizza.title === "21 Pc Chicken w/ Side" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 2).map((option) => (
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
      <h4 className={styles.choiceOf} >Choice of Soda <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(2, 5).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(5, 11).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)</h4>
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
      <h4 className={styles.choiceOf} >Recommended Desserts (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(14, 18).map((option) => (
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

{pizza.title === "35 Pc Chicken w/ Side" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 2).map((option) => (
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
      <h4 className={styles.choiceOf} >Choice of Soda <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(2, 5).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(5, 11).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)</h4>
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
      <h4 className={styles.choiceOf} >Recommended Desserts (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(14, 18).map((option) => (
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

{pizza.title === "2 Pc Chicken Combo" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 4).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Option)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(4, 11).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(11, 15).map((option) => (
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

{pizza.title === "3 Pc Chicken Combo" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 4).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(4, 11).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(11, 15).map((option) => (
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

{pizza.title === "5 Pc Chicken Combo" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of First Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 4).map((option) => (
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
      <h4 className={styles.choiceOf} >Choice of Second Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(4, 8).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(8, 15 ).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(15, 19).map((option) => (
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

{pizza.title === "8 Pc Chicken Combo" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of First Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 4).map((option) => (
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
      <h4 className={styles.choiceOf} >Choice of Second Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(4, 8).map((option) => (
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
      <h4 className={styles.choiceOf} >Choice of Third Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(8, 12).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(12, 19 ).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(19, 23).map((option) => (
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

{pizza.title === "10 Pc Chicken Combo" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of First Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 4).map((option) => (
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
      <h4 className={styles.choiceOf} >Choice of Second Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(4, 8).map((option) => (
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
      <h4 className={styles.choiceOf} >Choice of Third Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(8, 12).map((option) => (
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
      <h4 className={styles.choiceOf} >Choice of Fourth Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(12, 16).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(16, 23 ).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(23, 27).map((option) => (
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

{pizza.title === "15 Pc Chicken Combo" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of First Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 4).map((option) => (
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
      <h4 className={styles.choiceOf} >Choice of Second Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(4, 8).map((option) => (
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
      <h4 className={styles.choiceOf} >Choice of Third Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(8, 12).map((option) => (
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
      <h4 className={styles.choiceOf} >Choice of Fourth Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(12, 16).map((option) => (
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
      <h4 className={styles.choiceOf} >Choice of Fifth Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(16, 20).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(20, 27 ).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(27, 31).map((option) => (
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

{pizza.title === "21 Pc Chicken Combo" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of First Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(0, 4).map((option) => (
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
      <h4 className={styles.choiceOf} >Choice of Second Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(4, 8).map((option) => (
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
      <h4 className={styles.choiceOf} >Choice of Third Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(8, 12).map((option) => (
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
      <h4 className={styles.choiceOf} >Choice of Fourth Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(12, 16).map((option) => (
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
      <h4 className={styles.choiceOf} >Choice of Fifth Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(16, 20).map((option) => (
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
      <h4 className={styles.choiceOf} >Choice of Sixth Side  <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
        {pizza.extraOptions.slice(20, 24).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(24, 31).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(31, 35).map((option) => (
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

{pizza.title === "15 Pc Tenders w/ Fries" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Sauce <span className={styles.required}>(Required)</span>
</h4>
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)</h4>
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

{pizza.title === "3 Pc Tenders Only" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Sauce - Select at least 1 <span className={styles.required}>(Required)</span>
</h4>
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)</h4>
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

{pizza.title === "5 Pc Tenders Only" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Sauce - Select at least 1 <span className={styles.required}>(Required)</span>
</h4>
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)</h4>
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

{pizza.title === "9 Pc Tenders Only" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Sauce - Select at least 1 <span className={styles.required}>(Required)</span>
</h4>
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)</h4>
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

{pizza.title === "15 Pc Tenders Only" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Sauce - Select at least 1 <span className={styles.required}>(Required)</span>
</h4>
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)</h4>
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

{pizza.title === "Popcorn Shrimp w/ fries + coleslaw" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
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
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(7, 13).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(13, 17).map((option) => (
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

{pizza.title === "Popcorn Shrimp (21 Pc) Only" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
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
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(7, 13).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(13, 17).map((option) => (
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

{pizza.title === "6pc Jumbo Shrimp Only" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
    <h4 className={styles.choiceOf} >Jumbo Shrimp Size <span className={styles.required}>(Required)</span></h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(0, 2).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(2, 9).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(9, 15).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(15, 19).map((option) => (
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

{pizza.title === "6pc Jumbo Shrimp w/ fries + coleslaw" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
    <h4 className={styles.choiceOf} >Jumbo Shrimp Size <span className={styles.required}>(Required)</span></h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(0, 2).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(2, 9).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(9, 15).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(15, 19).map((option) => (
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

{pizza.title === "1 Pc Tilapia" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
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
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(7, 13).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(13, 17).map((option) => (
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

{pizza.title === "2 Pc Tilapia" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Side <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(0, 2).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(2, 9).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(9, 15).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(15, 19).map((option) => (
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

{pizza.title === "3 Pc Tilapia" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Side <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(0, 2).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(2, 9).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(9, 15).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(15, 19).map((option) => (
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

{pizza.title === "5 Pc Tilapia" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Side <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(0, 2).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(2, 9).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Side (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(9, 15).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(15, 19).map((option) => (
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

{pizza.title === "Popcorn Chicken Salad" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(13, 17).map((option) => (
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

{pizza.title === "Grilled Chicken Salad" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(13, 17).map((option) => (
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

{pizza.title === "Garden Salad" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(13, 17).map((option) => (
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

{pizza.title === "Shrimp Salad (21 Pc)" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
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
      <h4 className={styles.choiceOf} >Add a Dessert (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(13, 17).map((option) => (
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

{pizza.title === "4 Pc Chicken Nuggets Only" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Sauce <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow}>
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)</h4>
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

{pizza.title === "10 Pc Chicken Nuggets Only" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Sauce <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow}>
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(14, 21).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(21, 24).map((option) => (
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

{pizza.title === "20 Pc Chicken Nuggets Only" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Sauce <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow}>
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
      <h4 className={styles.choiceOf} >Add a Beverage (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(14, 21).map((option) => (
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
      <h4 className={styles.choiceOf} >Add a Biscuit (Optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(21, 24).map((option) => (
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

{pizza.title === "2 Liter Soda" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of 2 Liter Drink <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow}>
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
    </div>
  </div>
</div>
</>
)}

{pizza.title === "Buffalo Wrap" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Meat <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow}>
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
    </div>
  </div>
</div>
</>
)}

{pizza.title === "Ranch Wrap" && (
  <>{/*For the two rows for the must include options and additional options*/}
<h3 className={styles.choose}>Customize Your Order</h3>
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4 className={styles.choiceOf} >Choice of Meat <span className={styles.required}>(Required)</span>
</h4>
      <div className={styles.optionRow}>
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
    </div>
  </div>
</div>
</>
)}


<div className={styles.quantityContainer2}>
<h1 className={styles.title}>{pizza.title}</h1>

      <Link href="/menu">
              <button className={styles.backButton}>X</button>
            </Link>
    </div>
 







 
<div className={styles.quantityContainer}>
  
      <button className={styles.sign} onClick={handleMinusButtonClick}>-</button>
      <input
        value={quantity}
        type="number"
        min={1}
        max={10}
        className={styles.quantity}
        style={{ color: "black" }}
        readOnly
      />
      <button className={styles.signs} onClick={handlePlusButtonClick}>+</button>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleClick}>
          {isAdded ? 'Added!' : 'ADD TO CART'}
          &nbsp;
          <span className={styles.buttonAdd}>+${price}</span>
        </button>
      </div>
 
    </div>
 

    </div>
    </div>

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