import styles from "../../styles/componets/helper/Nav.module.css"
import Link from "next/link"

export default function Nav() {
  return (
    <div className={styles.container}>
        <div>
            <Link href='/'><h1>Sagu</h1></Link>
        </div>
        <div>
            <ul className={styles.links}>
                <li>Community</li>
                <li>blog</li>
            </ul>
        </div>
        <div>
            <Link href="/auth/connect"><button>Connect Wallet</button></Link>
        </div>
    </div>
  )
}
