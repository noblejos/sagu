// import styles from '../../styles/helper/Spinner.module.css'
import styles from "../../styles/componets/helper/Spinner.module.css"

export default function Spinner() {
    
    return (
        <div className={styles.spinnerparent}>
            {/* <p>loading</p> */}
            <svg className={styles.spinner} viewBox="0 0 50 50">
                
            <circle className={styles.path} cx="25" cy="25" r="20" fill="none" strokeWidth="9"></circle>
            </svg>
        </div>

    )
}