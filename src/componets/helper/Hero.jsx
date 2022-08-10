import styles from "../../styles/componets/helper/Hero.module.css"
import Nav from "../helper/Nav"
import Card from "./Card"
import Link from "next/link"


export default function Hero() {
  return (
    <>
    <Nav/>
    <div className={styles.container}>
        <div className={styles.text}>
            <h1>Connecting Creative communities via NFTs</h1>
            <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. 
                Velit officia consequat duit. Exercitation veniam consequat sunt</p>
                <Link href="/auth/connect"><button>Get Started</button></Link>
        </div>
        <div className={styles.cards}>
            {/* <img src="/image/hero1.png" alt="" /> */}
            <Card/>
        </div>
    </div>
    </>
  )
}
