import styles from "../../styles/componets/helper/Communities.module.css"
import Link from "next/link"

export default function Communities() {
   
    const item={
            banner:'/image/Combanner.png',
            profile:'/image/Comprofile.png',
            name:'Seven Roses',
            volume:"13,14.88",
            price:'23.70'
        }
    
const data=[item,item,item,]

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h1>Communities</h1>
        <Link href="/communities"><h3>More</h3></Link>
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
  )
}
