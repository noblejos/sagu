import styles from "../../styles/componets/helper/Card.module.css"

export default function Card() {
  return (
    <div>
        <div className={styles.slider}>
            <div className={styles.slides}>
                <input type="radio" name="radio-btn" id="radio1" />
                <input type="radio" name="radio-btn" id="radio1" />
                <input type="radio" name="radio-btn" id="radio1" />
            </div>
        </div>
    </div>
  )
}
