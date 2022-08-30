import styles from "../../styles/events/MintModal.module.css";

export default function Successful({ close }) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img
          src="/image/closemodal.svg"
          onClick={close}
          className={styles.close}
        />

        <div className={styles.main}>
          <div>
            <img src="/image/clarity_success-standard-line bbbb.png" />
          </div>
          <h1>Successful!!</h1>
        </div>
      </div>
    </div>
  );
}
