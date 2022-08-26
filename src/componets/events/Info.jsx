import Link from "next/link";
import styles from "../../styles/events/TicketInfo.module.css";
import { useState } from "react";
import MintModal from "./MintModal";
import Successful from "./successfulModal";

export default function Info() {
  const [mintModal, setMintModal] = useState(false);
  const [Successful, setSuccessful] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    setMintModal(!mintModal);
  }

  return (
    <div className={styles.info}>
      <div className={styles.edit}>
        <img src="/image/icons_edit.svg" />
        <Link href="/event">
          <h2>Edit Ticket info</h2>
        </Link>
      </div>
      <div className={styles.bg}>
        <div className={styles.card}>
          <div className={styles.main}>
            <img src="/image/Dticket.png" />
            <div className={styles.details}>
              <h3>TechUp Port Harcourt</h3>
              <div>
                <span>Price:</span>
                <span>$400</span>
              </div>
              <div>
                <span>Gross fee:</span>
                <span>$400</span>
              </div>
            </div>
          </div>
          <div className={styles.side}>
            <div className={styles.rotate}>
              <div className={styles.detail}>
                <h3>TechUp Port Harcourt</h3>
                <div>
                  <span>Price:</span>
                  <span>$400</span>
                </div>
                <div>
                  <span>Gross fee:</span>
                  <span>$400</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mint}>
        <button onClick={handleClick}>Mint Ticket</button>
      </div>
      {mintModal && <MintModal close={() => setMintModal(!mintModal)} />}
    </div>
  );
}
