import Link from "next/link"
import styles from "../../styles/dashboard/MyTickets.module.css"

 const data={
    img:"/image/ticket.png",
    title:"The Global NFT summit Ticket",
    venue:"Stadium3000",
    date:"August 08, 2022"
}

export default function MyTickets({myEvents}) {
  const res= myEvents.map(each=> each.ticket)
  // console.log({res})
  const real = res.splice(1)
  console.log({res})
  console.log({real})
  

    const items=[data,data,data,data,data,data,data,data]
    if(real.length>0){
  return (
    <div className={styles.tickets}>
        {real.map((item, index)=>(
          <Link href={`/tickets/${item.name}`} key={index}>
            <div key={index} className={styles.card}>
                <img src={item.coverImage}/>
                <h1>{item.name}</h1>
                 <h2>{item.desc}</h2>
                <h3>{item.category}</h3> 
            </div>
            </Link>
        ))}
        
    </div>
  )
              }


  return (
    <div className={styles.created}>
        <img src="/image/noitem.png" />
        <h1>No item to display</h1>


    </div>
  )
}
