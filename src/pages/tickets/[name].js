import React, { useState } from 'react'
import GetEvent from '../../services/get/getEvent';
import Footer from "../../componets/helper/Footer"
import Nav from "../../componets/helper/Nav"
import styles from "../../styles/tickets/Tickets.module.css"
import {verify} from "jsonwebtoken"
import buyTicket from '../../services/post/buyTicket';
import Successful from '../../componets/events/successfulModal';


export default function SingleEvent({ticket,loggedUser,headers}) {
  const [complete, setComplete] = useState(false)
    console.log({ticket:ticket._id})
   let ticketId= ticket._id

    const formData={
      price: 20,
      ticket: ticketId
    }

    async function confirmTicketBuy(){
    const response = await buyTicket({formData, headers})
    setComplete(true)

  }



    const item1={
        img:'/image/top1.png',
        title: "Awesome Rock music Live concert @Wariwick 2022",
        date:'08/08/2022',
        venue:"Stadium3000",
        TicketsLeft:3,
    }

    const item2={
        img:'/image/top2.png',
        title:'The Global NFT summit @Wariwick 2022',
        date:'21/09/2022',
        venue:'360 lounge',
        TicketsLeft:5,
    }
        const data=[item1, item2,item1,item2]
  return (
    <>
    <Nav loggedUser={loggedUser}/>
    <div className={styles.container}>
        <div className={styles.content}>
            <div>
                <img src={ticket.coverImage}/>
            </div>
            <div className={styles.ticket_desc}>
                <h1>{ticket.name}</h1>
                <div className={styles.title}>
                        <h4>Description</h4>
                        <p>Tue, Jun 28, 2022, 9:00 AM WAT</p>
                </div>
                <p>{ticket.desc}
                </p>
                <div className={styles.buy}> 
                    <h3>0.042 Eth <span>($346,43)</span></h3>
                    <button onClick={confirmTicketBuy}>Buy Ticket</button>
                </div>
            </div>
        </div>
        <div className={styles.other}>
            <h1>Other Tickets You may like</h1>
            <div className={styles.main}>
              {data.map((item, index)=>(
                <div className={styles.card} key={index}>
                    <div className={styles.image}>
                    <img src={item.img}/>
                    <span>Tickets Left: <p>{item.TicketsLeft}</p>
                    </span>
                    </div>
                    <div className={styles.text}>
                    <h3>{item.title}</h3>
                    <p>{item.date}</p>
                    <p>{item.venue}</p>
                    </div>
                </div>
              ))}
            </div>
        </div>
    </div>
    {complete &&<Successful close={()=> setComplete(!complete)}/>}
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
    let loggedUser={}
    try {
      loggedUser = verify(jwt, secret);
    } catch (e) {
      console.log(e);
      loggedUser = {};
    }
    const headers ={
      "Content-type": "application/json",
      "Authorization": "Bearer "+loggedUser.access_token
    }
      const ticket = await GetEvent({
        name: context.params.name,
      })
      console.log({ticket})
    //   const singleEvent = response.event
    //   console.log(singleEvent)
    
    return {
      props: {
        headers,
        loggedUser,
        ticket,
      },
    };
  }