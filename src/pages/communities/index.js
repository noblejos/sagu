import styles from "../../styles/communities/communities.module.css"
import Nav from "../../componets/helper/Nav"
import Footer from "../../componets/helper/Footer"
import { verify } from "jsonwebtoken"

export default function Communities({loggedUser}) {

    const item={
        banner:'/image/Combanner.png',
        profile:'/image/Comprofile.png',
        name:'Seven Roses',
        volume:"13,14.88",
        price:'23.70'
    }

const data=[item,item,item,item,item,item,item,item,item,item,item,item]
  return (
    <>
    <Nav loggedUser={loggedUser}/>
    <div className={styles.container}>

        <div className={styles.head}>
            
                <h1>Communities</h1>
                <div className={styles.search}>
                <div>
                    <img src="/image/serach.png" alt="" />
                <input type="text" placeholder="Search by name"/>
                </div>
                </div>
            </div>  
                <div className={styles.content}>
                {data.map((item,index)=> (
                    <div key={index} className={styles.card}>
                        <div className={styles.banner}>
                            <img src={item.banner}/>
                        </div>
                        <div className={styles.profile}>
                            <img src={item.profile} />
                        </div>
                        <div className={styles.name}>
                            <p>{item.name}</p>
                        </div>
                        <div className={styles.pricediv}>
                            <p>Volume:<span> {item.volume}</span></p>
                            <p>Floor price:<span>{item.price}</span></p>
                        </div>
                    </div>
                ))}
            </div>
    </div>
    <Footer/>
    </>
  )
}

export async function getServerSideProps({req}) {
    const {cookies} =req
    console.log('where are you')
    const jwt= cookies.UserJWT;
  
    if(!jwt){
  
      return {
        redirect:{
          permanent:false,
          destination:"/auth/connect"
        }
      }
    }
    const secret= process.env.SECRET||"no hacking here"
    let loggedUser=verify(jwt,secret)
  
    // console.log(loggedUser)
    // console.log({loggedUser})  
  
    const headers ={
      "Content-type": "application/json",
      "Authorization": "Bearer "+loggedUser.access_token
    }
    // const username=loggedUser.username
    // const usersEvent= await  GetUsersEvents({username})
    // const events = usersEvent.events
    // // console.log({events})
  
    // // console.log({socialLinks})
    return { props: { loggedUser} };
  
  }