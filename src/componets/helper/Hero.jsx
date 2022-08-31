import styles from "../../styles/componets/helper/Hero.module.css"

import Card from "./Card"
import Link from "next/link"


export default function Hero() {
  return (
    <>
    
    <div className={styles.container}>
        <div className={styles.text}>
            <h1>Connecting Creative communities via NFTs</h1>
            <p>Sagu is an NFT platform empowering communities to create shared memories via NFTs.</p>
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
