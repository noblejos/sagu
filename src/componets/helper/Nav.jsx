import styles from "../../styles/componets/helper/Nav.module.css"
import Link from "next/link"
import axios from "axios"
import { useEffect } from "react"
import { useRouter } from "next/router"

export default function Nav({loggedUser}) {
    const router = useRouter()
    const Logout= async()=>{
        const response = await axios.post('/api/apiSignoutUser')
        console.log(response)
       
            router.push("/auth/connect")
        
       }
       useEffect(()=>{
        
       },[loggedUser])

    console.log(loggedUser)
  return (
    <div className={styles.container}>
        <div>
            <Link href='/'><h1>Sagu</h1></Link>
        </div>
        <div>
            {/* <ul className={styles.links}>
                <li>Community</li>
                <li>blog</li>
            </ul> */}
        </div>
        {loggedUser._id&&
        <div className={styles. authlinks}>
            <Link href="/events"><p>Create ticket</p></Link>
            <Link href="/dashboard"><img src="/image/user.svg"/></Link>
            <div>
                <img src="/image/logout.svg" onClick={Logout} 
                // style={{invert:"100%"}}
                style={{ filter: "invert(100%)"}}
                />
            </div>
        </div>}
        {!loggedUser._id&& <div>
            <Link href="/auth/connect"><button>Connect Wallet</button></Link>
        </div>}
    </div>
  )
}
