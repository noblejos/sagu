import Footer from "../../componets/helper/Footer"
import Nav from "../../componets/helper/Nav"
import styles from "../../styles/tickets/Tickets.module.css"
import {verify} from "jsonwebtoken"

export default function tickets({loggedUser}) {
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
                <img src="/image/Dticket.png"/>
            </div>
            <div className={styles.ticket_desc}>
                <h1>The Global NFT summit</h1>
                <div className={styles.title}>
                        <h4>Description</h4>
                        <p>Tue, Jun 28, 2022, 9:00 AM WAT</p>
                </div>
                <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. 
                    Velit officia consequat duit. Exercitation veniam consequat sunt, Amet minim mollit 
                    non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duit. 
                    Exercitation veniam consequat sunt amet minim mollit non deserunt ullamco est sit aliqua 
                    dolor do amet sint elit officia consequat duit. Exercitation veniam consequat sunt amet 
                     ullamco ercitation veniam consequat sunt amet minim mollit non deserunt ullamco
                </p>
                <div className={styles.buy}> 
                    <h3>0.042 Eth <span>($346,43)</span></h3>
                    <button>Buy Ticket</button>
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
    // console.log("your secret is" + secret);
    // let loggedUser={}
    let loggedUser;
  
    try {
      loggedUser = verify(jwt, secret);
    } catch (e) {
      console.log(e);
      loggedUser = {};
    }
    // console.log({ loggedUser })
  
  
    return {props:{ loggedUser}};
}