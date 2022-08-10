import styles from "../../styles/componets/helper/Nav.module.css"

export default function Nav() {
  return (
    <div className={styles.container}>
        <div>
            <h1>Sagu</h1>
        </div>
        <div>
            <ul className={styles.links}>
                <li>Community</li>
                <li>blog</li>
            </ul>
        </div>
        <div>
            <button>Connect Wallet</button>
        </div>
    </div>
  )
}
