import Link from "next/link";
import styles from "../../styles/events/TicketInfo.module.css";
import { useState } from "react";
import MintModal from "./MintModal";
import Successful from "./successfulModal";

export default function Info({ mintTicket, name, image }) {
  //   function handleClick(e) {
  //     e.preventDefault();
  //     setMintModal(!mintModal);
  //   }

  return (
    <div className={styles.info}>
      <div className={styles.edit}>
        <img src="/image/icons_edit.svg" />
        {/* <Link href="/event"> */}
        <h2>Edit Ticket info</h2>
        {/* </Link> */}
      </div>
      <div className={styles.bg}>
        <div className={styles.card}>
          <div className={styles.main}>
            {!image ? <img src="/image/Dticket.png" /> : <img src={image} />}
            <div className={styles.details}>
              {name ? <h3>TechUp Port Harcourt</h3> : <h3>{name}</h3>}
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
                {!name ? <h3>TechUp Port Harcourt</h3> : <h3>{name}</h3>}
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
        <button onClick={mintTicket}>Mint Ticket</button>
      </div>
      {/* {mintModal && <MintModal close={() => setMintModal(!mintModal)} />} */}
    </div>
  );
}
