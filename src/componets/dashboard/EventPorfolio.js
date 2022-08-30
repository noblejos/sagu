import styles from "../../styles/dashboard/EventPortfolio.module.css"
import {useState} from "react"
import MyTickets from "./MyTickets"
import Created from "./Created"
export default function EventPorfolio({res, myEvents}) {
  const  navs=["Created", "My Tickets", "Wishlist"]
  const [selected,setSelected]=useState(0)


  return (
    <div className={styles.eventPortfolio} >
        <div className={styles.nav}>
            <div>
                {navs.map((nav,index)=>(
                    <p 
                    key={nav}
                    onClick={()=> setSelected(index)}
                    className={`${styles.navLinks} ${selected == index? styles.active:''}`}
                    >{nav}</p>
                ))}
            </div>
                <div>
                <div className={styles.inp}>
                    <img src="/image/serach.png" alt="" />
                <input type="text" placeholder="Search by name"/>
                </div>
                </div>
        </div>

        <div>
            {selected ==0 &&<Created  res={res}/>}
            {selected == 1 &&<MyTickets myEvents={myEvents}/>}
            {selected ==2 &&<Created/>}
        </div>

    </div>
  )
}
