import styles from "../../styles/dashboard/Profile.module.css"

export default function Profile({loggedUser}){
    const {username, orgName,images,communityName}=loggedUser
    // console.log(username,orgName,images,communityName)
  return (
    <div className={styles.main}>
        <div className={styles.content}>
            <div className={styles.banner}>
                 <img src={images.banner} />
            </div>
            <div className={styles.details}>
                <div>
                     <img src={images.profile} />
                </div>
                <div>
                    <p className={styles.username}>{username}</p>
                    <p className={styles.comname}>{orgName}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
