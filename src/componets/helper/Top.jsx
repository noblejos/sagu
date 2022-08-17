import Link from "next/link"
import styles from "../../styles/componets/helper/Top.module.css"

export default function Top() {

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
        const data=[item1, item2,item1,item2,item1,item1,item2,item1]

  return (
    <div className={styles.container}>
        <div className={styles.head}>
        <h1> Top Selling Tickets</h1>
        <span>More</span>
        </div>
        <div className={styles.main}>
            {data.map((item, index)=>(
               <Link href='/tickets' key={index}><div className={styles.card} >
                    <div className={styles.image}>
                    <img src={item.img}  />
                    <span>Tickets Left: <p>{item.TicketsLeft}</p>
                    </span>
                    </div>
                    <div className={styles.text}>
                    <h3>{item.title}</h3>
                    <p>{item.date}</p>
                    <p>{item.venue}</p>
                    </div>
                </div></Link>
            ))}
        </div>
        
    </div>
  )
}
