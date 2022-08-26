import styles from "../../styles/events/MintModal.module.css";

export default function MintModal({ close }) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* <img
          src="/image/closemodal.svg"
          onClick={close}
          className={styles.close}
        /> */}

        <div className={styles.main}>
          <div>
            <img src="/image/lf30_XwEQ0V.json].png" />
          </div>
          <p>
            Please hold on while we mint your amazing ticket into an awesome
            blockchain.
          </p>
        </div>
      </div>
    </div>
  );
}
