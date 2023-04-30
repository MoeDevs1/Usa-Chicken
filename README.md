This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.




  if(pizza.title === "Beef Patty "){
    
    //Meat choice if one checked then the others uncheck
    if (option.text === "No Cheese") {
      document.getElementById("Add Cheese +$0.50").checked = false;
      document.getElementById("With Coco Bread and Cheese +$2.00").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Add Cheese +$0.50" && extra.text !== "With Coco Bread and Cheese +$2.00"));
    } else if (option.text === "With Coco Bread and Cheese +$2.00") {
      document.getElementById("Add Cheese +$0.50").checked = false;
      document.getElementById("No Cheese").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "No Cheese" && extra.text !== "Add Cheese +$0.50"));
    } else if (option.text === "Add Cheese +$0.50") {
      document.getElementById("No Cheese").checked = false;
      document.getElementById("With Coco Bread and Cheese +$2.00").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "No Cheese" && extra.text !== "With Coco Bread and Cheese +$2.00"));
    }
  } 

  if(pizza.title === "3 Pc Tenders Fries"){


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


    else if (option.text === "One Biscuit $0.99") {
      document.getElementById("Two Biscuits $1.99").checked = false;
      document.getElementById("Four Biscuits $3.50").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Two Biscuits +$1.99" && extra.text !== "Four Biscuits +$3.50"));
    }else if (option.text === "Two Biscuits $1.99") {
      document.getElementById("One Biscuit $0.99").checked = false;
      document.getElementById("Four Biscuits $3.50").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "One Biscuit +$0.99" && extra.text !== "Four Biscuits +$3.50"));
    } else if (option.text === "Four Biscuits $3.50") {
      document.getElementById("One Biscuit $0.99").checked = false;
      document.getElementById("Two Biscuits $1.99").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "One Biscuit +$0.99" && extra.text !== "Two Biscuits +$1.99"));
    }

  
    else if (option.text === "Coke +$3.50") {
      //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;


  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      } else if (option.text === "Diet Coke +$3.50") {
        //unchecking all drinks that are not "Diet Coke +$3.50 "
        document.getElementById("Coke +$3.50").checked = false; 
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Coke +$3.50 +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Sprite +$3.50") {
        //unchecking all drinks that are not "Sprite +$3.50 "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Smart Water +$3.50" ) {
        //unchecking all drinks that are not "Smart Water +$3.50" Water +$3.50 Water "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Orange Fanta +$3.50") {
        //unchecking all drinks that are not "Orange Fanta +$3.50 Fanta "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Powerrade +$3.50") {
        //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }
      else if (option.text === "Sweet Tea +$3.50") {
        //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
      document.getElementById("Diet Coke +$3.50").checked = false;
      document.getElementById("Sprite +$3.50").checked = false;
      document.getElementById("Smart Water +$3.50").checked = false;
      document.getElementById("Orange Fanta +$3.50").checked = false;
      document.getElementById("Powerrade +$3.50").checked = false;
      document.getElementById("Coke +$3.50").checked = false;

      setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"));
    }

   
  }
  
  if(pizza.title === "5 Pc Chicken "){

    // 4 side choices and can only pick 2 (required)
    let count = 0;
    if (document.getElementById("Coleslaw +3.50").checked) count++;
    if (document.getElementById("Corn +3.50").checked) count++;
    if (document.getElementById("Mac N Cheese +3.50").checked) count++;
    if (document.getElementById("Mashed Potatoes").checked) count++;

    // Uncheck the other checkboxes if two are already checked
    if (count >= 3) {
      document.getElementById("Coleslaw +3.50").checked = false;
      document.getElementById("Corn +3.50").checked = false;
      document.getElementById("Mac N Cheese +3.50").checked = false;
      document.getElementById("Mashed Potatoes").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Coleslaw +3.50" && extra.text !== "Corn +3.50" && extra.text !== "Mac N Cheese +3.50" && extra.text !== "Mashed Potatoes"));
    }


    

    else if (option.text === "Coke +$3.50") {
      //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;


  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      } else if (option.text === "Diet Coke +$3.50") {
        //unchecking all drinks that are not "Diet Coke +$3.50 "
        document.getElementById("Coke +$3.50").checked = false; 
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Coke +$3.50 +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Sprite +$3.50") {
        //unchecking all drinks that are not "Sprite +$3.50 "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Smart Water +$3.50" ) {
        //unchecking all drinks that are not "Smart Water +$3.50" Water +$3.50 Water "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Orange Fanta +$3.50") {
        //unchecking all drinks that are not "Orange Fanta +$3.50 Fanta "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Powerrade +$3.50") {
        //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }
      else if (option.text === "Sweet Tea +$3.50") {
        //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
      document.getElementById("Diet Coke +$3.50").checked = false;
      document.getElementById("Sprite +$3.50").checked = false;
      document.getElementById("Smart Water +$3.50").checked = false;
      document.getElementById("Orange Fanta +$3.50").checked = false;
      document.getElementById("Powerrade +$3.50").checked = false;
      document.getElementById("Coke +$3.50").checked = false;

      setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"));
    }  

      

    //Biscuits choice unchecking and checking
    else if (option.text === "One Biscuit +$0.99") {
      document.getElementById("Two Biscuits +$1.99").checked = false;
      document.getElementById("Four Biscuits +$3.50").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Two Biscuits +$1.99" && extra.text !== "Four Biscuits +$3.50"));
    }else if (option.text === "Two Biscuits +$1.99") {
      document.getElementById("One Biscuit +$0.99").checked = false;
      document.getElementById("Four Biscuits +$3.50").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "One Biscuit +$0.99" && extra.text !== "Four Biscuits +$3.50"));
    } else if (option.text === "Four Biscuits +$3.50") {
      document.getElementById("One Biscuit +$0.99").checked = false;
      document.getElementById("Two Biscuits +$1.99").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "One Biscuit +$0.99" && extra.text !== "Two Biscuits +$1.99"));
    }

     //Recommended side choice unchecking and checking
     else if (option.text === "Small Fries +3.50") {
      document.getElementById("Mozzarella Sticks (6pc.) +6.99").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Mozzarella Sticks (6pc.) +6.99"));
    }else if (option.text === "Mozzarella Sticks (6pc.) +6.99") {
      document.getElementById("Small Fries +3.50").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Small Fries +3.50"));
    }

    //Biscuits choice unchecking and checking
    else if (option.text === "Tres Leches Cake +$5.00") {
      document.getElementById("Oreo Cake +$5.00").checked = false;
      document.getElementById("Carrot Cake +$5.00").checked = false;
      document.getElementById("Chocolate Cake +$5.00").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Oreo Cake +$5.00" && extra.text !== "Carrot Cake +$5.00 " && extra.text !== "Chocolate Cake +$5.00"));
    } else if (option.text === "Oreo Cake +$5.00") {
      document.getElementById("Tres Leches Cake +$5.00").checked = false;
      document.getElementById("Carrot Cake +$5.00").checked = false;
      document.getElementById("Chocolate Cake +$5.00").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Tres Leches Cake +$5.00" && extra.text !== "Carrot Cake +$5.00" && extra.text !== "Chocolate Cake +$5.00"));
    }  else if (option.text === "Carrot Cake +$5.00") {
      document.getElementById("Oreo Cake +$5.00").checked = false;
      document.getElementById("Tres Leches Cake +$5.00").checked = false;
      document.getElementById("Chocolate Cake +$5.00").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Oreo Cake +$5.00" && extra.text !== "Tres Leches Cake +$5.00" && extra.text !== "Chocolate Cake +$5.00"));
    } else if (option.text === "Chocolate Cake +$5.00") {
      document.getElementById("Oreo Cake +$5.00").checked = false;
      document.getElementById("Carrot Cake +$5.00").checked = false;
      document.getElementById("Tres Leches Cake +$5.00").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Oreo Cake +$5.00" && extra.text !== "Carrot Cake +$5.00 " && extra.text !== "Tres Leches Cake +$5.00"));
    }

  }
  
 if(pizza.title === "5 Pc Chicken w/ Side"){

    // 4 side choices and can only pick 2 (required)
    if (option.text === "French Fries") {
      document.getElementById("Rice").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Rice"));
    } else if (option.text === "Rice") {
      document.getElementById("French Fries").checked = false;
      setExtras((prev) => prev.filter((extra) =>  extra.text !== "French Fries"));
    } 


 
    else if (option.text === "Coke +$3.50") {
      //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      } else if (option.text === "Diet Coke +$3.50") {
        //unchecking all drinks that are not "Diet Coke +$3.50 "
        document.getElementById("Coke +$3.50").checked = false; 
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Coke +$3.50 +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Sprite +$3.50") {
        //unchecking all drinks that are not "Sprite +$3.50 "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Smart Water +$3.50" ) {
        //unchecking all drinks that are not "Smart Water +$3.50" Water +$3.50 Water "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Orange Fanta +$3.50") {
        //unchecking all drinks that are not "Orange Fanta +$3.50 Fanta "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Powerrade +$3.50") {
        //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }
      else if (option.text === "Sweet Tea +$3.50") {
        //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
      document.getElementById("Diet Coke +$3.50").checked = false;
      document.getElementById("Sprite +$3.50").checked = false;
      document.getElementById("Smart Water +$3.50").checked = false;
      document.getElementById("Orange Fanta +$3.50").checked = false;
      document.getElementById("Powerrade +$3.50").checked = false;
      document.getElementById("Coke +$3.50").checked = false;

      setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"));
    }


    //choosing extra side
    else if (option.text === "French Fries +3.50") {
      //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
        document.getElementById("Mashed Potatoes & Gravy +3.50").checked = false;
        document.getElementById("Mac N Cheese +3.50").checked = false;
        document.getElementById("Coleslaw +3.50").checked = false;
        document.getElementById("Corn +3.50").checked = false;
        document.getElementById("Beef Patty +3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Mashed Potatoes & Gravy +3.50"  && extra.text !== "Mac N Cheese +3.50"  && extra.text !== "Coleslaw +3.50"  && extra.text !== "Corn +3.50"  && extra.text !== "Beef Patty +3.50"));
      }  else if (option.text === "Coleslaw +3.50") {
        //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
          document.getElementById("Mashed Potatoes & Gravy +3.50").checked = false;
          document.getElementById("Mac N Cheese +3.50").checked = false;
          document.getElementById("French Fries +3.50").checked = false;
          document.getElementById("Corn +3.50").checked = false;
          document.getElementById("Beef Patty +3.50").checked = false;
    
          setExtras((prev) => prev.filter((extra) => extra.text !== "Mashed Potatoes & Gravy +3.50"  && extra.text !== "Mac N Cheese +3.50"  && extra.text !== "French Fries +3.50"  && extra.text !== "Corn +3.50"  && extra.text !== "Beef Patty +3.50"));
        }  else if (option.text === "Mashed Potatoes & Gravy +3.50") {
          //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
            document.getElementById("Coleslaw +3.50").checked = false;
            document.getElementById("Mac N Cheese +3.50").checked = false;
            document.getElementById("French Fries +3.50").checked = false;
            document.getElementById("Corn +3.50").checked = false;
            document.getElementById("Beef Patty +3.50").checked = false;
      
          setExtras((prev) => prev.filter((extra) => extra.text !== "Coleslaw +3.50"  && extra.text !== "Mac N Cheese +3.50"  && extra.text !== "French Fries +3.50"  && extra.text !== "Corn +3.50"  && extra.text !== "Beef Patty +3.50"));
        }else if (option.text === "Corn +3.50") {
            //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
              document.getElementById("Mashed Potatoes & Gravy +3.50").checked = false;
              document.getElementById("Mac N Cheese +3.50").checked = false;
              document.getElementById("French Fries +3.50").checked = false;
              document.getElementById("Coleslaw +3.50").checked = false;
              document.getElementById("Beef Patty +3.50").checked = false;
        
          setExtras((prev) => prev.filter((extra) => extra.text !== "Mashed Potatoes & Gravy +3.50"  && extra.text !== "Mac N Cheese +3.50"  && extra.text !== "French Fries +3.50"  && extra.text !== "Coleslaw +3.50"  && extra.text !== "Beef Patty +3.50"));
        } else if (option.text === "Mac N Cheese +3.50") {
          //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
            document.getElementById("Mashed Potatoes & Gravy +3.50").checked = false;
            document.getElementById("Corn +3.50").checked = false;
            document.getElementById("French Fries +3.50").checked = false;
            document.getElementById("Coleslaw +3.50").checked = false;
            document.getElementById("Beef Patty +3.50").checked = false;
      
        setExtras((prev) => prev.filter((extra) => extra.text !== "Mashed Potatoes & Gravy +3.50"  && extra.text !== "Corn +3.50"  && extra.text !== "French Fries +3.50"  && extra.text !== "Coleslaw +3.50"  && extra.text !== "Beef Patty +3.50"));
      } else if (option.text === "Beef Patty +3.50") {
        //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
          document.getElementById("Mashed Potatoes & Gravy +3.50").checked = false;
          document.getElementById("Corn +3.50").checked = false;
          document.getElementById("French Fries +3.50").checked = false;
          document.getElementById("Coleslaw +3.50").checked = false;
          document.getElementById("Mac N Cheese +3.50").checked = false;
    
      setExtras((prev) => prev.filter((extra) => extra.text !== "Mashed Potatoes & Gravy +3.50"  && extra.text !== "Corn +3.50"  && extra.text !== "French Fries +3.50"  && extra.text !== "Coleslaw +3.50"  && extra.text !== "Mac N Cheese +3.50"));
    }




    //Biscuits choice unchecking and checking
    else if (option.text === "One Biscuit +$0.99") {
      document.getElementById("Two Biscuits +$1.99").checked = false;
      document.getElementById("Four Biscuits +$3.50").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Two Biscuits +$1.99" && extra.text !== "Four Biscuits +$3.50"));
    }else if (option.text === "Two Biscuits +$1.99") {
      document.getElementById("One Biscuit +$0.99").checked = false;
      document.getElementById("Four Biscuits +$3.50").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "One Biscuit +$0.99" && extra.text !== "Four Biscuits +$3.50"));
    } else if (option.text === "Four Biscuits +$3.50") {
      document.getElementById("One Biscuit +$0.99").checked = false;
      document.getElementById("Two Biscuits +$1.99").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "One Biscuit +$0.99" && extra.text !== "Two Biscuits +$1.99"));
    }

     //Recommended side choice unchecking and checking
     else if (option.text === "Small Fries +3.50") {
      document.getElementById("Mozzarella Sticks (6pc.) +6.99").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Mozzarella Sticks (6pc.) +6.99"));
    }else if (option.text === "Mozzarella Sticks (6pc.) +6.99") {
      document.getElementById("Small Fries +3.50").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Small Fries +3.50"));
    }

    //Biscuits choice unchecking and checking
    else if (option.text === "Tres Leches Cake +$5.00") {
      document.getElementById("Oreo Cake +$5.00").checked = false;
      document.getElementById("Carrot Cake +$5.00").checked = false;
      document.getElementById("Chocolate Cake +$5.00").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Oreo Cake +$5.00" && extra.text !== "Carrot Cake +$5.00 " && extra.text !== "Chocolate Cake +$5.00"));
    } else if (option.text === "Oreo Cake +$5.00") {
      document.getElementById("Tres Leches Cake +$5.00").checked = false;
      document.getElementById("Carrot Cake +$5.00").checked = false;
      document.getElementById("Chocolate Cake +$5.00").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Tres Leches Cake +$5.00" && extra.text !== "Carrot Cake +$5.00" && extra.text !== "Chocolate Cake +$5.00"));
    }  else if (option.text === "Carrot Cake +$5.00") {
      document.getElementById("Oreo Cake +$5.00").checked = false;
      document.getElementById("Tres Leches Cake +$5.00").checked = false;
      document.getElementById("Chocolate Cake +$5.00").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Oreo Cake +$5.00" && extra.text !== "Tres Leches Cake +$5.00" && extra.text !== "Chocolate Cake +$5.00"));
    } else if (option.text === "Chocolate Cake +$5.00") {
      document.getElementById("Oreo Cake +$5.00").checked = false;
      document.getElementById("Carrot Cake +$5.00").checked = false;
      document.getElementById("Tres Leches Cake +$5.00").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Oreo Cake +$5.00" && extra.text !== "Carrot Cake +$5.00 " && extra.text !== "Tres Leches Cake +$5.00"));
    }

  }
  
  if(pizza.title === "6 Pc Wings "){

    if (option.text === "BBQ") {
    document.getElementById("Bone in Spice").checked = false;
    document.getElementById("Buffalo").checked = false;
    document.getElementById("Traditional").checked = false;

    setExtras((prev) => prev.filter((extra) => extra.text !== "Buffalo"  &&  extra.text !== "Bone in Spice"  && extra.text !== "Traditional"));
  }else if (option.text === "Buffalo") {
    document.getElementById("Bone in Spice").checked = false;
    document.getElementById("BBQ").checked = false;
    document.getElementById("Traditional").checked = false;

    setExtras((prev) => prev.filter((extra) => extra.text !== "BBQ"  &&  extra.text !== "Bone in Spice"  && extra.text !== "Traditional"));
  } else if (option.text === "Bone in Spice") {
    document.getElementById("BBQ").checked = false;
    document.getElementById("Buffalo").checked = false;
    document.getElementById("Traditional").checked = false;

    setExtras((prev) => prev.filter((extra) => extra.text !== "Buffalo"  &&  extra.text !== "BBQ"  && extra.text !== "Traditional"));
  }else if (option.text === "Traditional") {
    document.getElementById("BBQ").checked = false;
    document.getElementById("Buffalo").checked = false;
    document.getElementById("Bone in Spice").checked = false;

    setExtras((prev) => prev.filter((extra) => extra.text !== "Buffalo"  &&  extra.text !== "BBQ"  && extra.text !== "Bone in Spice"));
  }
    //choosing extra side 
    else if (option.text === "French Fries +3.50") {
      //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
        document.getElementById("Mashed Potatoes & Gravy +3.50").checked = false;
        document.getElementById("Mac N Cheese +3.50").checked = false;
        document.getElementById("Coleslaw +3.50").checked = false;
        document.getElementById("Corn +3.50").checked = false;
        document.getElementById("Beef Patty +3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Mashed Potatoes & Gravy +3.50"  && extra.text !== "Mac N Cheese +3.50"  && extra.text !== "Coleslaw +3.50"  && extra.text !== "Corn +3.50"  && extra.text !== "Beef Patty +3.50"));
      }  else if (option.text === "Coleslaw +3.50") {
        //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
          document.getElementById("Mashed Potatoes & Gravy +3.50").checked = false;
          document.getElementById("Mac N Cheese +3.50").checked = false;
          document.getElementById("French Fries +3.50").checked = false;
          document.getElementById("Corn +3.50").checked = false;
          document.getElementById("Beef Patty +3.50").checked = false;
    
          setExtras((prev) => prev.filter((extra) => extra.text !== "Mashed Potatoes & Gravy +3.50"  && extra.text !== "Mac N Cheese +3.50"  && extra.text !== "French Fries +3.50"  && extra.text !== "Corn +3.50"  && extra.text !== "Beef Patty +3.50"));
        }  else if (option.text === "Mashed Potatoes & Gravy +3.50") {
          //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
            document.getElementById("Coleslaw +3.50").checked = false;
            document.getElementById("Mac N Cheese +3.50").checked = false;
            document.getElementById("French Fries +3.50").checked = false;
            document.getElementById("Corn +3.50").checked = false;
            document.getElementById("Beef Patty +3.50").checked = false;
      
          setExtras((prev) => prev.filter((extra) => extra.text !== "Coleslaw +3.50"  && extra.text !== "Mac N Cheese +3.50"  && extra.text !== "French Fries +3.50"  && extra.text !== "Corn +3.50"  && extra.text !== "Beef Patty +3.50"));
        }else if (option.text === "Corn +3.50") {
            //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
              document.getElementById("Mashed Potatoes & Gravy +3.50").checked = false;
              document.getElementById("Mac N Cheese +3.50").checked = false;
              document.getElementById("French Fries +3.50").checked = false;
              document.getElementById("Coleslaw +3.50").checked = false;
              document.getElementById("Beef Patty +3.50").checked = false;
        
          setExtras((prev) => prev.filter((extra) => extra.text !== "Mashed Potatoes & Gravy +3.50"  && extra.text !== "Mac N Cheese +3.50"  && extra.text !== "French Fries +3.50"  && extra.text !== "Coleslaw +3.50"  && extra.text !== "Beef Patty +3.50"));
        } else if (option.text === "Mac N Cheese +3.50") {
          //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
            document.getElementById("Mashed Potatoes & Gravy +3.50").checked = false;
            document.getElementById("Corn +3.50").checked = false;
            document.getElementById("French Fries +3.50").checked = false;
            document.getElementById("Coleslaw +3.50").checked = false;
            document.getElementById("Beef Patty +3.50").checked = false;
      
        setExtras((prev) => prev.filter((extra) => extra.text !== "Mashed Potatoes & Gravy +3.50"  && extra.text !== "Corn +3.50"  && extra.text !== "French Fries +3.50"  && extra.text !== "Coleslaw +3.50"  && extra.text !== "Beef Patty +3.50"));
      } else if (option.text === "Beef Patty +3.50") {
        //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
          document.getElementById("Mashed Potatoes & Gravy +3.50").checked = false;
          document.getElementById("Corn +3.50").checked = false;
          document.getElementById("French Fries +3.50").checked = false;
          document.getElementById("Coleslaw +3.50").checked = false;
          document.getElementById("Mac N Cheese +3.50").checked = false;
    
      setExtras((prev) => prev.filter((extra) => extra.text !== "Mashed Potatoes & Gravy +3.50"  && extra.text !== "Corn +3.50"  && extra.text !== "French Fries +3.50"  && extra.text !== "Coleslaw +3.50"  && extra.text !== "Mac N Cheese +3.50"));
    }




 
    else if (option.text === "Coke +$3.50") {
      //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;


  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      } else if (option.text === "Diet Coke +$3.50") {
        //unchecking all drinks that are not "Diet Coke +$3.50 "
        document.getElementById("Coke +$3.50").checked = false; 
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Coke +$3.50 +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Sprite +$3.50") {
        //unchecking all drinks that are not "Sprite +$3.50 "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Smart Water +$3.50" ) {
        //unchecking all drinks that are not "Smart Water +$3.50" Water +$3.50 Water "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Orange Fanta +$3.50") {
        //unchecking all drinks that are not "Orange Fanta +$3.50 Fanta "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Powerrade +$3.50") {
        //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }
      else if (option.text === "Sweet Tea +$3.50") {
        //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
      document.getElementById("Diet Coke +$3.50").checked = false;
      document.getElementById("Sprite +$3.50").checked = false;
      document.getElementById("Smart Water +$3.50").checked = false;
      document.getElementById("Orange Fanta +$3.50").checked = false;
      document.getElementById("Powerrade +$3.50").checked = false;
      document.getElementById("Coke +$3.50").checked = false;

      setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"));
    }
    

    
  }
  
  if(pizza.title === "Cheese Burger "){

    if (option.text === "Tres Leches Cake +$5.00") {
      document.getElementById("Oreo Cake +$5.00").checked = false;
      document.getElementById("Carrot Cake +$5.00").checked = false;
      document.getElementById("Chocolate Cake +$5.00").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Oreo Cake +$5.00" && extra.text !== "Carrot Cake +$5.00 " && extra.text !== "Chocolate Cake +$5.00"));
    } else if (option.text === "Oreo Cake +$5.00") {
      document.getElementById("Tres Leches Cake +$5.00").checked = false;
      document.getElementById("Carrot Cake +$5.00").checked = false;
      document.getElementById("Chocolate Cake +$5.00").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Tres Leches Cake +$5.00" && extra.text !== "Carrot Cake +$5.00" && extra.text !== "Chocolate Cake +$5.00"));
    }  else if (option.text === "Carrot Cake +$5.00") {
      document.getElementById("Oreo Cake +$5.00").checked = false;
      document.getElementById("Tres Leches Cake +$5.00").checked = false;
      document.getElementById("Chocolate Cake +$5.00").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Oreo Cake +$5.00" && extra.text !== "Tres Leches Cake +$5.00" && extra.text !== "Chocolate Cake +$5.00"));
    } else if (option.text === "Chocolate Cake +$5.00") {
      document.getElementById("Oreo Cake +$5.00").checked = false;
      document.getElementById("Carrot Cake +$5.00").checked = false;
      document.getElementById("Tres Leches Cake +$5.00").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Oreo Cake +$5.00" && extra.text !== "Carrot Cake +$5.00 " && extra.text !== "Tres Leches Cake +$5.00"));
    }
    //choosing extra side 
    else if (option.text === "French Fries +3.50") {
      //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
        document.getElementById("Mashed Potatoes & Gravy +3.50").checked = false;
        document.getElementById("Mac N Cheese +3.50").checked = false;
        document.getElementById("Coleslaw +3.50").checked = false;
        document.getElementById("Corn +3.50").checked = false;
        document.getElementById("Beef Patty +3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Mashed Potatoes & Gravy +3.50"  && extra.text !== "Mac N Cheese +3.50"  && extra.text !== "Coleslaw +3.50"  && extra.text !== "Corn +3.50"  && extra.text !== "Beef Patty +3.50"));
      }  else if (option.text === "Coleslaw +3.50") {
        //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
          document.getElementById("Mashed Potatoes & Gravy +3.50").checked = false;
          document.getElementById("Mac N Cheese +3.50").checked = false;
          document.getElementById("French Fries +3.50").checked = false;
          document.getElementById("Corn +3.50").checked = false;
          document.getElementById("Beef Patty +3.50").checked = false;
    
          setExtras((prev) => prev.filter((extra) => extra.text !== "Mashed Potatoes & Gravy +3.50"  && extra.text !== "Mac N Cheese +3.50"  && extra.text !== "French Fries +3.50"  && extra.text !== "Corn +3.50"  && extra.text !== "Beef Patty +3.50"));
        }  else if (option.text === "Mashed Potatoes & Gravy +3.50") {
          //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
            document.getElementById("Coleslaw +3.50").checked = false;
            document.getElementById("Mac N Cheese +3.50").checked = false;
            document.getElementById("French Fries +3.50").checked = false;
            document.getElementById("Corn +3.50").checked = false;
            document.getElementById("Beef Patty +3.50").checked = false;
      
          setExtras((prev) => prev.filter((extra) => extra.text !== "Coleslaw +3.50"  && extra.text !== "Mac N Cheese +3.50"  && extra.text !== "French Fries +3.50"  && extra.text !== "Corn +3.50"  && extra.text !== "Beef Patty +3.50"));
        }else if (option.text === "Corn +3.50") {
            //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
              document.getElementById("Mashed Potatoes & Gravy +3.50").checked = false;
              document.getElementById("Mac N Cheese +3.50").checked = false;
              document.getElementById("French Fries +3.50").checked = false;
              document.getElementById("Coleslaw +3.50").checked = false;
              document.getElementById("Beef Patty +3.50").checked = false;
        
          setExtras((prev) => prev.filter((extra) => extra.text !== "Mashed Potatoes & Gravy +3.50"  && extra.text !== "Mac N Cheese +3.50"  && extra.text !== "French Fries +3.50"  && extra.text !== "Coleslaw +3.50"  && extra.text !== "Beef Patty +3.50"));
        } else if (option.text === "Mac N Cheese +3.50") {
          //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
            document.getElementById("Mashed Potatoes & Gravy +3.50").checked = false;
            document.getElementById("Corn +3.50").checked = false;
            document.getElementById("French Fries +3.50").checked = false;
            document.getElementById("Coleslaw +3.50").checked = false;
            document.getElementById("Beef Patty +3.50").checked = false;
      
        setExtras((prev) => prev.filter((extra) => extra.text !== "Mashed Potatoes & Gravy +3.50"  && extra.text !== "Corn +3.50"  && extra.text !== "French Fries +3.50"  && extra.text !== "Coleslaw +3.50"  && extra.text !== "Beef Patty +3.50"));
      } else if (option.text === "Beef Patty +3.50") {
        //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
          document.getElementById("Mashed Potatoes & Gravy +3.50").checked = false;
          document.getElementById("Corn +3.50").checked = false;
          document.getElementById("French Fries +3.50").checked = false;
          document.getElementById("Coleslaw +3.50").checked = false;
          document.getElementById("Mac N Cheese +3.50").checked = false;
    
      setExtras((prev) => prev.filter((extra) => extra.text !== "Mashed Potatoes & Gravy +3.50"  && extra.text !== "Corn +3.50"  && extra.text !== "French Fries +3.50"  && extra.text !== "Coleslaw +3.50"  && extra.text !== "Mac N Cheese +3.50"));
    }




  



    else if (option.text === "Coke +$3.50") {
      //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;


  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      } else if (option.text === "Diet Coke +$3.50") {
        //unchecking all drinks that are not "Diet Coke +$3.50 "
        document.getElementById("Coke +$3.50").checked = false; 
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Coke +$3.50 +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Sprite +$3.50") {
        //unchecking all drinks that are not "Sprite +$3.50 "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Smart Water +$3.50" ) {
        //unchecking all drinks that are not "Smart Water +$3.50" Water +$3.50 Water "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Orange Fanta +$3.50") {
        //unchecking all drinks that are not "Orange Fanta +$3.50 Fanta "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Powerrade +$3.50") {
        //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }
      else if (option.text === "Sweet Tea +$3.50") {
        //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
      document.getElementById("Diet Coke +$3.50").checked = false;
      document.getElementById("Sprite +$3.50").checked = false;
      document.getElementById("Smart Water +$3.50").checked = false;
      document.getElementById("Orange Fanta +$3.50").checked = false;
      document.getElementById("Powerrade +$3.50").checked = false;
      document.getElementById("Coke +$3.50").checked = false;

      setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"));
    }  
    
  }

  if(pizza.title === "Philly Cheese Steak Sub"){

    if (option.text === "Tres Leches Cake +$5.00") {
      document.getElementById("Oreo Cake +$5.00").checked = false;
      document.getElementById("Carrot Cake +$5.00").checked = false;
      document.getElementById("Chocolate Cake +$5.00").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Oreo Cake +$5.00" && extra.text !== "Carrot Cake +$5.00 " && extra.text !== "Chocolate Cake +$5.00"));
    } else if (option.text === "Oreo Cake +$5.00") {
      document.getElementById("Tres Leches Cake +$5.00").checked = false;
      document.getElementById("Carrot Cake +$5.00").checked = false;
      document.getElementById("Chocolate Cake +$5.00").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Tres Leches Cake +$5.00" && extra.text !== "Carrot Cake +$5.00" && extra.text !== "Chocolate Cake +$5.00"));
    }  else if (option.text === "Carrot Cake +$5.00") {
      document.getElementById("Oreo Cake +$5.00").checked = false;
      document.getElementById("Tres Leches Cake +$5.00").checked = false;
      document.getElementById("Chocolate Cake +$5.00").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Oreo Cake +$5.00" && extra.text !== "Tres Leches Cake +$5.00" && extra.text !== "Chocolate Cake +$5.00"));
    } else if (option.text === "Chocolate Cake +$5.00") {
      document.getElementById("Oreo Cake +$5.00").checked = false;
      document.getElementById("Carrot Cake +$5.00").checked = false;
      document.getElementById("Tres Leches Cake +$5.00").checked = false;
      setExtras((prev) => prev.filter((extra) => extra.text !== "Oreo Cake +$5.00" && extra.text !== "Carrot Cake +$5.00 " && extra.text !== "Tres Leches Cake +$5.00"));
    }
    //choosing extra side 
    else if (option.text === "French Fries +3.50 +$3.50") {
      //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
        document.getElementById("Mashed Potatoes & Gravy +3.50 +$3.50").checked = false;
        document.getElementById("Mac N Cheese +3.50 +$3.50").checked = false;
        document.getElementById("Coleslaw +3.50 +$3.50").checked = false;
        document.getElementById("Corn +3.50 +$3.50").checked = false;
        document.getElementById("Beef Patty +3.50 +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Mashed Potatoes & Gravy +3.50 +$3.50"  && extra.text !== "Mac N Cheese +3.50 +$3.50"  && extra.text !== "Coleslaw +3.50 +$3.50"  && extra.text !== "Corn +3.50 +$3.50"  && extra.text !== "Beef Patty +3.50 +$3.50"));
      }  else if (option.text === "Coleslaw +3.50 +$3.50") {
        //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
          document.getElementById("Mashed Potatoes & Gravy +3.50 +$3.50").checked = false;
          document.getElementById("Mac N Cheese +3.50 +$3.50").checked = false;
          document.getElementById("French Fries +3.50 +$3.50").checked = false;
          document.getElementById("Corn +3.50 +$3.50").checked = false;
          document.getElementById("Beef Patty +3.50 +$3.50").checked = false;
    
          setExtras((prev) => prev.filter((extra) => extra.text !== "Mashed Potatoes & Gravy +3.50 +$3.50"  && extra.text !== "Mac N Cheese +3.50 +$3.50"  && extra.text !== "French Fries +3.50 +$3.50"  && extra.text !== "Corn +3.50 +$3.50"  && extra.text !== "Beef Patty +3.50 +$3.50"));
        }  else if (option.text === "Mashed Potatoes & Gravy +3.50 +$3.50") {
          //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
            document.getElementById("Coleslaw +3.50 +$3.50").checked = false;
            document.getElementById("Mac N Cheese +3.50 +$3.50").checked = false;
            document.getElementById("French Fries +3.50 +$3.50").checked = false;
            document.getElementById("Corn +3.50 +$3.50").checked = false;
            document.getElementById("Beef Patty +3.50 +$3.50").checked = false;
      
          setExtras((prev) => prev.filter((extra) => extra.text !== "Coleslaw +3.50 +$3.50"  && extra.text !== "Mac N Cheese +3.50 +$3.50"  && extra.text !== "French Fries +3.50 +$3.50"  && extra.text !== "Corn +3.50 +$3.50"  && extra.text !== "Beef Patty +3.50 +$3.50"));
        }else if (option.text === "Corn +3.50 +$3.50") {
            //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
              document.getElementById("Mashed Potatoes & Gravy +3.50 +$3.50").checked = false;
              document.getElementById("Mac N Cheese +3.50 +$3.50").checked = false;
              document.getElementById("French Fries +3.50 +$3.50").checked = false;
              document.getElementById("Coleslaw +3.50 +$3.50").checked = false;
              document.getElementById("Beef Patty +3.50 +$3.50").checked = false;
        
          setExtras((prev) => prev.filter((extra) => extra.text !== "Mashed Potatoes & Gravy +3.50 +$3.50"  && extra.text !== "Mac N Cheese +3.50 +$3.50"  && extra.text !== "French Fries +3.50 +$3.50"  && extra.text !== "Coleslaw +3.50 +$3.50"  && extra.text !== "Beef Patty +3.50 +$3.50"));
        } else if (option.text === "Mac N Cheese +3.50 +$3.50") {
          //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
            document.getElementById("Mashed Potatoes & Gravy +3.50 +$3.50").checked = false;
            document.getElementById("Corn +3.50 +$3.50").checked = false;
            document.getElementById("French Fries +3.50 +$3.50").checked = false;
            document.getElementById("Coleslaw +3.50 +$3.50").checked = false;
            document.getElementById("Beef Patty +3.50 +$3.50").checked = false;
      
        setExtras((prev) => prev.filter((extra) => extra.text !== "Mashed Potatoes & Gravy +3.50 +$3.50"  && extra.text !== "Corn +3.50 +$3.50"  && extra.text !== "French Fries +3.50 +$3.50"  && extra.text !== "Coleslaw +3.50 +$3.50"  && extra.text !== "Beef Patty +3.50 +$3.50"));
      } else if (option.text === "Beef Patty +3.50 +$3.50") {
        //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
          document.getElementById("Mashed Potatoes & Gravy +3.50 +$3.50").checked = false;
          document.getElementById("Corn +3.50 +$3.50").checked = false;
          document.getElementById("French Fries +3.50 +$3.50").checked = false;
          document.getElementById("Coleslaw +3.50 +$3.50").checked = false;
          document.getElementById("Mac N Cheese +3.50 +$3.50").checked = false;
    
      setExtras((prev) => prev.filter((extra) => extra.text !== "Mashed Potatoes & Gravy +3.50 +$3.50"  && extra.text !== "Corn +3.50 +$3.50"  && extra.text !== "French Fries +3.50 +$3.50"  && extra.text !== "Coleslaw +3.50 +$3.50"  && extra.text !== "Mac N Cheese +3.50 +$3.50"));
    }




    else if (option.text === "Coke +$3.50") {
      //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;


  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      } else if (option.text === "Diet Coke +$3.50") {
        //unchecking all drinks that are not "Diet Coke +$3.50 "
        document.getElementById("Coke +$3.50").checked = false; 
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Coke +$3.50 +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Sprite +$3.50") {
        //unchecking all drinks that are not "Sprite +$3.50 "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Smart Water +$3.50" ) {
        //unchecking all drinks that are not "Smart Water +$3.50" Water +$3.50 Water "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Orange Fanta +$3.50") {
        //unchecking all drinks that are not "Orange Fanta +$3.50 Fanta "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Powerrade +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }else if (option.text === "Powerrade +$3.50") {
        //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
        document.getElementById("Diet Coke +$3.50").checked = false;
        document.getElementById("Sprite +$3.50").checked = false;
        document.getElementById("Smart Water +$3.50").checked = false;
        document.getElementById("Orange Fanta +$3.50").checked = false;
        document.getElementById("Coke +$3.50").checked = false;
        document.getElementById("Sweet Tea +$3.50").checked = false;
  
        setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
      }
      else if (option.text === "Sweet Tea +$3.50") {
        //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
      document.getElementById("Diet Coke +$3.50").checked = false;
      document.getElementById("Sprite +$3.50").checked = false;
      document.getElementById("Smart Water +$3.50").checked = false;
      document.getElementById("Orange Fanta +$3.50").checked = false;
      document.getElementById("Powerrade +$3.50").checked = false;
      document.getElementById("Coke +$3.50").checked = false;

      setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Coke +$3.50 +$3.50"));
    }
    
  }
 
  


  //asfa




{/*checkboxes for 5 pc tenders w fries*/}
{pizza.title === "5 Pc Tenders w/ Fries " && (
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
      <h4>Choose a Drink (Optional)</h4>
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
      <h4>Add a Biscuit (Optional)</h4>
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
 {pizza.title === "Beef Patty " && (
  <>{/*For the two rows for the must include options and additional options*/}
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>

    <h4>Choose 1 Option (Required)</h4>
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

{/*checkboxes for 5 pc chicken*/}
{pizza.title === "5 Pc Chicken " && (
  <>{/*For the two rows for the must include options and additional options*/}
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4>Select 2 Side Choices (Required)</h4>
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
      <h4>Add a Beverage (optional)</h4>
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
      <h4>Add a Biscuit (optional)</h4>
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
      <h4>Add a side (optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(14, 16).map((option) => (
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
      <h4>Recommended Desserts (optional)</h4>
      <div className={styles.optionRow}>
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
    </div>
  </div>
</div>
</>
)}

{/*checkboxes for 3 pc tenders w fries*/}
{pizza.title === "3 Pc Tenders Fries" && (
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


{/*checkboxes for 5 pc chicken with Side*/}
{pizza.title === "5 Pc Chicken w/ Side" && (
  <>{/*For the two rows for the must include options and additional options*/}
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4>Select a Side Choice (Required)</h4>
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
      <h4>Add a Side (optional)</h4>
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
      <h4>Add a Beverage  (optional)</h4>
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
      <h4>Add a Biscuit (optional)</h4>
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
      <h4>Recommended Sides And Apps (optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(18, 20).map((option) => (
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
      <h4>Recommended Desserts (optional)</h4>
      <div className={styles.optionRow}>
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
    </div>
  </div>
</div>
</>
)}

{/*checkboxes for 6 pc wings*/}
{pizza.title === "6 Pc Wings " && (
  <>{/*For the two rows for the must include options and additional options*/}
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4>Preparation Choice Select 1 (Required)</h4>
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
      <h4>Add a Side (optional)</h4>
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
      <h4>Add a Beverage (optional)</h4>
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

{/*checkboxes for cheese burger*/}
{pizza.title === "Cheese Burger " && (
  <>{/*For the two rows for the must include options and additional options*/}
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4>Add a Side (optional)</h4>
      <div className={styles.optionRow} style={{marginRight: '100px'}}>
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
      <h4>Add a Beverage (optional)</h4>
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
      <h4>Recommended Desserts (optional)</h4>
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

{/*checkboxes for philly cheese steak*/}
{pizza.title === "Philly Cheese Steak Sub" && (
  <>{/*For the two rows for the must include options and additional options*/}
<div className={styles.ingredients}>
  <div className={styles.options}>
    <div>
      <h4>Cheese Sub Toppings (optional)</h4>
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
      <h4>Add a Side (optional)</h4>
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
      <h4>Add a Beverage (optional)</h4>
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
      <h4>Recommended Desserts (optional)</h4>
      <div className={styles.optionRow}>
        {pizza.extraOptions.slice(17, 22).map((option) => (
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


// if(pizza.title === "5 Pc Tenders w/ Fries"){

//   //Chicken choice if one checked then the others uncheck
//   if (option.text === "Honey Mustard") {
//   //unchecking all sauces that are "honey mustard"
//     document.getElementById("BBQ").checked = false;
//     document.getElementById("Buffalo").checked = false;
//     document.getElementById("White Sauce").checked = false;
//     document.getElementById("Ranch").checked = false;
//     document.getElementById("Sweet & Sour").checked = false;
//     document.getElementById("Blue Cheese").checked = false;

//     setExtras((prev) => prev.filter((extra) => extra.text !== "BBQ" && extra.text !== "Buffalo"  && extra.text !== "White Sauce"  && extra.text !== "Ranch"  && extra.text !== "Sweet & Sour"  && extra.text !== "Blue Cheese"));
//   } else if (option.text === "BBQ") {
//     document.getElementById("Honey Mustard").checked = false;
//     document.getElementById("Buffalo").checked = false;
//     document.getElementById("White Sauce").checked = false;
//     document.getElementById("Ranch").checked = false;
//     document.getElementById("Sweet & Sour").checked = false;
//     document.getElementById("Blue Cheese").checked = false;

//     setExtras((prev) => prev.filter((extra) => extra.text !== "Honey Mustard" && extra.text !== "Buffalo"  && extra.text !== "White Sauce"  && extra.text !== "Ranch"  && extra.text !== "Sweet & Sour"  && extra.text !== "Blue Cheese"));
//   }else if (option.text === "Buffalo") {
//     document.getElementById("BBQ").checked = false;
//     document.getElementById("Honey Mustard").checked = false;
//     document.getElementById("White Sauce").checked = false;
//     document.getElementById("Ranch").checked = false;
//     document.getElementById("Sweet & Sour").checked = false;
//     document.getElementById("Blue Cheese").checked = false;

//     setExtras((prev) => prev.filter((extra) => extra.text !== "BBQ" && extra.text !== "Honey Mustard"  && extra.text !== "White Sauce"  && extra.text !== "Ranch"  && extra.text !== "Sweet & Sour"  && extra.text !== "Blue Cheese"));
//   } else if (option.text === "White Sauce") {
//     document.getElementById("Honey Mustard").checked = false;
//     document.getElementById("Buffalo").checked = false;
//     document.getElementById("BBQ").checked = false;
//     document.getElementById("Ranch").checked = false;
//     document.getElementById("Sweet & Sour").checked = false;
//     document.getElementById("Blue Cheese").checked = false;

//     setExtras((prev) => prev.filter((extra) => extra.text !== "Honey Mustard" && extra.text !== "Buffalo"  && extra.text !== "BBQ"  && extra.text !== "Ranch"  && extra.text !== "Sweet & Sour"  && extra.text !== "Blue Cheese"));
//   }else if (option.text === "Ranch") {
//     document.getElementById("Honey Mustard").checked = false;
//     document.getElementById("Buffalo").checked = false;
//     document.getElementById("White Sauce").checked = false;
//     document.getElementById("BBQ").checked = false;
//     document.getElementById("Sweet & Sour").checked = false;
//     document.getElementById("Blue Cheese").checked = false;

//     setExtras((prev) => prev.filter((extra) => extra.text !== "Honey Mustard" && extra.text !== "Buffalo"  && extra.text !== "White Sauce"  && extra.text !== "BBQ"  && extra.text !== "Sweet & Sour"  && extra.text !== "Blue Cheese"));
//   }else if (option.text === "Sweet & Sour") {
//     document.getElementById("Honey Mustard").checked = false;
//     document.getElementById("Buffalo").checked = false;
//     document.getElementById("White Sauce").checked = false;
//     document.getElementById("Ranch").checked = false;
//     document.getElementById("BBQ").checked = false;
//     document.getElementById("Blue Cheese").checked = false;

//     setExtras((prev) => prev.filter((extra) => extra.text !== "Honey Mustard" && extra.text !== "Buffalo"  && extra.text !== "White Sauce"  && extra.text !== "Ranch"  && extra.text !== "BBQ"  && extra.text !== "Blue Cheese"));
//   }else if (option.text === "Blue Cheese") {
//     document.getElementById("Honey Mustard").checked = false;
//     document.getElementById("Buffalo").checked = false;
//     document.getElementById("White Sauce").checked = false;
//     document.getElementById("Ranch").checked = false;
//     document.getElementById("BBQ").checked = false;
//     document.getElementById("Sweet & Sour").checked = false;

//     setExtras((prev) => prev.filter((extra) => extra.text !== "Honey Mustard" && extra.text !== "Buffalo"  && extra.text !== "White Sauce"  && extra.text !== "Ranch"  && extra.text !== "BBQ"  && extra.text !== "Sweet & Sour"));
//   }




//   else if (option.text === "Coke +$3.50") {
//     //unchecking all drinks that are not "Coke&nbsp; +$3.50"
//     document.getElementById("Diet Coke +$3.50").checked = false; 
//     document.getElementById("Sprite +$3.50").checked = false;
//     document.getElementById("Smart Water +$3.50").checked = false;
//     document.getElementById("Orange Fanta +$3.50").checked = false;
//     document.getElementById("Powerrade +$3.50").checked = false;
//     document.getElementById("Sweet Tea +$3.50").checked = false;
  
//     setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50" && extra.text !== "Sweet Tea +$3.50" && extra.text !== "Orange Fanta +$3.50" && extra.text !== "Powerrade +$3.50" && extra.text !== "Smart Water +$3.50"));
//   } else if (option.text === "Diet Coke +$3.50") {
//       //unchecking all drinks that are not "Diet Coke +$3.50 "
//       document.getElementById("Coke +$3.50").checked = false; 
//       document.getElementById("Sprite +$3.50").checked = false;
//       document.getElementById("Smart Water +$3.50").checked = false;
//       document.getElementById("Orange Fanta +$3.50").checked = false;
//       document.getElementById("Powerrade +$3.50").checked = false;
//       document.getElementById("Sweet Tea +$3.50").checked = false;

//       setExtras((prev) => prev.filter((extra) => extra.text !== "Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
//     }else if (option.text === "Sprite +$3.50") {
//       //unchecking all drinks that are not "Sprite +$3.50 "
//       document.getElementById("Coke +$3.50").checked = false;
//       document.getElementById("Smart Water +$3.50").checked = false;
//       document.getElementById("Orange Fanta +$3.50").checked = false;
//       document.getElementById("Powerrade +$3.50").checked = false;
//       document.getElementById("Sweet Tea +$3.50").checked = false;
//       document.getElementById("Diet Coke +$3.50").checked = false;

//       setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Coke +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
//     }else if (option.text === "Smart Water +$3.50") {
//       document.getElementById("Sprite +$3.50").checked = false;
//       document.getElementById("Coke +$3.50").checked = false;
//       document.getElementById("Orange Fanta +$3.50").checked = false;
//       document.getElementById("Powerrade +$3.50").checked = false;
//       document.getElementById("Sweet Tea +$3.50").checked = false;
//       document.getElementById("Diet Coke +$3.50").checked = false;

//       setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Coke +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
//     }else if (option.text === "Orange Fanta +$3.50") {
//       //unchecking all drinks that are not "Orange Fanta +$3.50 Fanta "
//       document.getElementById("Diet Coke +$3.50").checked = false;
//       document.getElementById("Sprite +$3.50").checked = false;
//       document.getElementById("Smart Water +$3.50").checked = false;
//       document.getElementById("Coke +$3.50").checked = false;
//       document.getElementById("Powerrade +$3.50").checked = false;
//       document.getElementById("Sweet Tea +$3.50").checked = false;

//       setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Coke +$3.50"  && extra.text !== "Powerrade +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
//     }else if (option.text === "Powerrade +$3.50") {
//       //unchecking all drinks that are not "Coke +$3.50 +$3.50 "
//       document.getElementById("Sprite +$3.50").checked = false;
//       document.getElementById("Smart Water +$3.50").checked = false;
//       document.getElementById("Orange Fanta +$3.50").checked = false;
//       document.getElementById("Coke +$3.50").checked = false;
//       document.getElementById("Sweet Tea +$3.50").checked = false;
//       document.getElementById("Diet Coke +$3.50").checked = false;

//       setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50"  && extra.text !== "Smart Water +$3.50"  && extra.text !== "Orange Fanta +$3.50"  && extra.text !== "Coke +$3.50"  && extra.text !== "Sweet Tea +$3.50"));
//     }
//     else if (option.text === "Sweet Tea +$3.50") {
//       //unchecking all drinks that are not "Smart Water  +$3.50"
//       document.getElementById("Sprite +$3.50").checked = false;
//       document.getElementById("Smart Water +$3.50").checked = false;
//       document.getElementById("Orange Fanta +$3.50").checked = false;
//       document.getElementById("Powerrade +$3.50").checked = false;
//       document.getElementById("Coke +$3.50").checked = false;
//       document.getElementById("Diet Coke +$3.50").checked = false;
    
//       setExtras((prev) => prev.filter((extra) => extra.text !== "Diet Coke +$3.50" && extra.text !== "Sprite +$3.50" && extra.text !== "Sweet Tea +$3.50" && extra.text !== "Orange Fanta +$3.50" && extra.text !== "Powerrade +$3.50" && extra.text !== "Coke +$3.50"));
//     }




//   //Sauce choice if one checked then the others uncheck
//   else if (option.text === "1 Biscuit +$0.99") {
//     document.getElementById("2 Biscuits +$1.99").checked = false;
//     document.getElementById("4 Biscuits +$3.50").checked = false;
//     setExtras((prev) => prev.filter((extra) => extra.text !== "2 Biscuits +$1.99" && extra.text !== "4 Biscuits +$3.50"));
//   }else if (option.text === "2 Biscuits +$1.99") {
//     document.getElementById("1 Biscuit +$0.99").checked = false;
//     document.getElementById("4 Biscuits +$3.50").checked = false;
//     setExtras((prev) => prev.filter((extra) => extra.text !== "1 Biscuit +$0.99" && extra.text !== "4 Biscuits +$3.50"));
//   } else if (option.text === "4 Biscuits +$3.50") {
//     document.getElementById("1 Biscuit +$0.99").checked = false;
//     document.getElementById("2 Biscuits +$1.99").checked = false;
//     setExtras((prev) => prev.filter((extra) => extra.text !== "1 Biscuit +$0.99" && extra.text !== "2 Biscuits +$1.99"));
//   }
// }

// if(pizza.title === "Beef Patty"){

//   //Meat choice if one checked then the others uncheck
//   if (option.text === "No Cheese") {
//     document.getElementById("Add Cheese +$0.50").checked = false;
//     document.getElementById("With Coco Bread and Cheese +$2.00").checked = false;
//     setExtras((prev) => prev.filter((extra) => extra.text !== "Add Cheese +$0.50" && extra.text !== "With Coco Bread and Cheese +$2.00"));
//   } else if (option.text === "With Coco Bread and Cheese +$2.00") {
//     document.getElementById("Add Cheese +$0.50").checked = false;
//     document.getElementById("No Cheese").checked = false;
//     setExtras((prev) => prev.filter((extra) => extra.text !== "No Cheese" && extra.text !== "Add Cheese +$0.50"));
//   } else if (option.text === "Add Cheese +$0.50") {
//     document.getElementById("No Cheese").checked = false;
//     document.getElementById("With Coco Bread and Cheese +$2.00").checked = false;
//     setExtras((prev) => prev.filter((extra) => extra.text !== "No Cheese" && extra.text !== "With Coco Bread and Cheese +$2.00"));
//   }
// } 
