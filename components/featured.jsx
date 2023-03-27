import styles from "../styles/Featured.module.css";
import Image from "next/legacy/image";
import { useState, useEffect } from "react";

const Featured = () => {
    const [index, setIndex] = useState(0)
    const images = [
        "/img/store.png",
        "/img/fullmeal.jpeg",
        "/img/store.png"
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex(index !== 2 ? index+1 : 0)
        }, 10000);
        return () => clearInterval(intervalId);
    }, [index]);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
                {images.map((img, i) => (
                <div className={styles.imgContainer} key={i}>
                    <Image src={img} alt="" layout='fill' objectFit='cover' />
                    <div className={styles.title}>USA Chicken & Biscuits</div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button}>Order Now</button>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}; 

export default Featured;