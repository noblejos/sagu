import styles from "../../styles/componets/helper/Hero.module.css"
import Nav from "../helper/Nav"


export default function Hero() {
  return (
    <>
    <Nav/>
    <div className={styles.container}>
        <div className={styles.text}>
            <h1>Connecting Creative communities via NFTs</h1>
            <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. 
                Velit officia consequat duit. Exercitation veniam consequat sunt</p>
                <button>Get Started</button>
        </div>
        <div className={styles.cards}>
            <img src="/image/hero1.png" alt="" />
        </div>
    </div>
    </>
  )
}
