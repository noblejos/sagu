import Link from "next/link"
import styles from "../../styles/dashboard/MyTickets.module.css"

export default function Created({res}) {
console.log({res})
  if(res.length>0){
    return (
     <div className={styles.tickets}>
          {res.map((item, index)=>(
            <Link href={`/tickets/${item.name}`} key={index}>
              <div className={styles.card}>
                  <img src={item.coverImage}/>
                  <h1>{item.name}</h1>
                  <h2>{item.desc}</h2>
                  <h3>{item.category}</h3>
                  {/* <h3>{item.type}</h3> */}
              </div>
              </Link>
          ))}
    </div>
    )}
         

  
  return (
    <div className={styles.created}>
        <img src="/image/noitem.png" />
        <h1>No item to display</h1>


    </div>
  )
  

}