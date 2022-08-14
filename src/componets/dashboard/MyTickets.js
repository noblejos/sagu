import styles from "../../styles/dashboard/MyTickets.module.css"

 const data={
    img:"/image/ticket.png",
    title:"The Global NFT summit Ticket",
    venue:"Stadium3000",
    date:"August 08, 2022"
}

export default function MyTickets() {
    const items=[data,data,data,data,data,data,data,data]
  return (
    <div className={styles.tickets}>
        {items.map((item, index)=>(
            <div key={index} className={styles.card}>
                <img src={item.img}/>
                <h1>{item.title}</h1>
                <h2>{item.venue}</h2>
                <h3>{item.date}</h3>
            </div>
        ))}
    </div>
  )
}
