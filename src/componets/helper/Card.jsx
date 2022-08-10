import styles from "../../styles/componets/helper/Card.module.css"

import { useState, useEffect } from "react";

export default function Card() {
  const [index, setIndex] =useState(0)
  const cards=[
    {id:'1', img:"/image/hero1.png"},
    {id:'2', img:"/image/hero2.png"},
    {id:'3', img:"/image/hero3.png"}
  ]

  const mod = (n, m) => {
    let result = n % m;

    // Return a positive value
    return result >= 0 ? result : result + m;
  };
  useEffect(() => {
    setTimeout(() => {
      setIndex((index + 1) % cards.length);
      console.log(index);
    }, 3000);
  }, [index]);
  return (
    <div className={styles.App}>
      <div className={styles.carousel}>
        {/* <img className={`${styles.card} ${styles["card--active"]}`} src="/image/hero1.png" alt="" />
        <img className={`${styles.card} ${styles["card--left"]}`} src="/image/hero2.png" alt="" />
        <img className={`${styles.card} ${styles["card--right"]}`} src="/image/hero3.png" alt="" /> */}
        

        {cards.map((item, i) => {
          const indexLeft = mod(index - 1, cards.length);
          const indexRight = mod(index + 1, cards.length);

          let className = "card";

          if (i === index) {
            className = `${styles.card} ${styles["card--active"]}`;
          } else if (i === indexRight) {
            className = `${styles.card} ${styles["card--right"]}`;
          } else if (i === indexLeft) {
            className = `${styles.card} ${styles["card--left"]}`;
          } else className = "card";

          return (
            <img
              key={item.id}
              className={className}
              src={item.img}
              alt="Comic"
            ></img>
          );
        })}
        </div>
    </div>
  )
}
