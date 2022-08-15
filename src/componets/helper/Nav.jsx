import styles from "../../styles/componets/helper/Nav.module.css"
import Link from "next/link"

export default function Nav({loggedUser}) {
    console.log(loggedUser)
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
        {loggedUser?(
        <div className={styles. authlinks}>
            <Link href="/events"><p>Create ticket</p></Link>
            <Link href="/dashboard"><img src="/image/user.svg"/></Link>
        </div>)
       : <div>
            <Link href="/auth/connect"><button>Connect Wallet</button></Link>
        </div>}
    </div>
  )
}
