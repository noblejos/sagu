import styles from "../../styles/events/TicketInfo.module.css"

export default function Info() {
  return (
    <div className={styles.info}>
        <div className={styles.bg}>
            <div className={styles.card}>
            <div className={styles.main}>
                <img src="/image/Dticket.png"  />
                <div className={styles.details}>
                <h3>TechUp Port Harcourt</h3>
                <div>
                    <span>Price</span>
                    <span>$400</span>
                </div>
                <div>
                    <span>Gross fee</span>
                    <span>$400</span>
                </div>
                </div>
            </div>
            <div className={styles.side}>
            <div className={styles.rotate}>
            <div className={styles.detail}>
                <h3>TechUp Port Harcourt</h3>
                <div>
                    <span>Price</span>
                    <span>$400</span>
                </div>
                <div>
                    <span>Gross fee</span>
                    <span>$400</span>
                </div>
                </div>
            </div>
            </div>
            </div>
        </div>
            <div className={styles.mint}>
                <button>MINT</button>
            </div>
    </div>
  )
}
