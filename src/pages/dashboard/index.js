import Profile from "../../componets/dashboard/Profile";
import {verify} from "jsonwebtoken"
import EventPorfolio from "../../componets/dashboard/EventPorfolio";
import Nav from "../../componets/helper/Nav";
import styles from "../../styles/dashboard/Dashboard.module.css"


export default function dashboard({loggedUser}) {
  return (
    <>
    <Nav/>
    <div  className={styles.container}>
        <h1 className={styles.head}>Dashboard</h1>
        <Profile loggedUser={loggedUser} />
        <EventPorfolio/>
    </div>
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