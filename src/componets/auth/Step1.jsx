import styles from "../../styles/auth/SignUp.module.css"

export default function Step1() {
  return (
    <div className={styles.container}>
        <div className={styles.main}>
            <h1>Enter your details</h1>
            <form>
                <div className={styles.input}>
                <div className={styles.inp}>
                <span>Username</span>
                <input type="text" 
                name="username"/>
                </div>
                <div className={styles.inp}>
                <span>Email address</span>
                <input type="email" 
                name="email"/>
                </div>
                <div className={styles.inp}>
                <span>Community name</span>
                <input type="text" 
                name="community"/>
                </div>
                <div className={styles.inp}>
                <span>About your community</span>
                <textarea name="desc"></textarea>
                </div>
                </div>
                <div className={styles.btn}><button>Send</button></div>
                
            </form>
        </div>
    </div>
  )
}
