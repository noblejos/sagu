import styles from "../../styles/componets/helper/Footer.module.css"

export default function Footer() {
  return (
    <div className={styles.container}>
        <div className={styles.main}>
            <div className={styles.first}>
                <h1>Sagu</h1>
                <p>Your best Nft event community.</p>
                <div>
                    <img src="/image/facebook.png" />
                    <img src="/image/innsta.png" />
                    <img src="/image/linkdin.png" />
                </div>
            </div>
            <div className={styles.second}>
            <h1>Quick Links</h1>
            <div className={styles.links}>
            <ul>
                <li> Buy/Sell</li>
                <li>Trade Now</li>
                <li>Pricing</li>
            </ul>
            <ul>
                <li>Wallet</li>
                <li>Company</li>
            </ul>
            </div>
            </div>
            <div className={styles.third}>
            <h1>Submit for Updates</h1>
            <p>Subscribe to get update and notify our exchange and products</p>
            <div className={styles.mail}>
                <input type="email"/>
                <button>Send</button>
            </div>
            </div>
        </div>
        <footer className={styles.footer}>
            <div>
            <p>Cryptolly ©. All rights reserved.</p>
            </div>
            <div className={styles.policy}>
                <div className={styles.terms}>
                    <p>Term of Service</p>
                </div>
                <div>
                    <p>Privacy Policy</p>
                </div>
            </div>
            
        </footer>
    </div>
  )
}
