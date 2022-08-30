import Footer from "../../componets/helper/Footer"
import Nav from "../../componets/helper/Nav"
import styles from "../../styles/componets/helper/Top.module.css"
import {verify} from "jsonwebtoken"
import GetAllEvents from "../../services/get/getAllEvents"
import Link from "next/link"


export default function tickets({loggedUser, tickets}) {
    const res= tickets.map(each=> each.ticketId)
    console.log(res)
  return (
    <>
    <Nav loggedUser={loggedUser}/>
    <div className={styles.container}>
    <div className={styles.main}>
            {res.map((ticket, index)=>(
               <Link href={`/tickets/${ticket.name}`} key={index}><div className={styles.card} >
                    <div className={styles.image}>
                    <img src={ticket.coverImage}  />
                     <span>Tickets Left: <p>{index+1}</p>
                    </span> 
                    </div>
                    <div className={styles.text}>
                    <h3>{ticket.name}</h3> 
                    <p>{ticket.desc}</p> 
                    <p>{ticket.type}</p> 
                    </div>
                </div>
                </Link>
            ))}
        </div>
        
    </div>
    <Footer/>
    </>
  )
}

export async function getServerSideProps(context) {
    const { req } = context;
    const { cookies } = req;
  
    console.log("where are you");
    const jwt = cookies.UserJWT;
    const secret = process.env.SECRET || "no hacking here";
  
    let loggedUser;
  
    try {
      loggedUser = verify(jwt, secret);
    } catch (e) {
      console.log(e);
      loggedUser = {};
    }
    console.log({ loggedUser });
    let limit = 0
   const response =await GetAllEvents({limit})
   const tickets = response
  
    return {props:{ loggedUser,tickets}} ;
  }