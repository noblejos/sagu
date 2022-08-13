import styles from "../../styles/componets/helper/Profile.module.css"
export default function Profile({bannerimage,
  profileimage,username,communityName,preview}) {
  return (
    <div className={styles.main}>
        <div className={styles.content}>
            <div className={styles.banner}>
                {!bannerimage?
                <img src="/image/Combanner.png" />
                :<img src={bannerimage} />
            }
            </div>
            <div className={styles.details}>
              {/* {!preview?<img src={profileimage}/>
                :<img src={preview}/>} */}
                <div>
                {preview?<img src={preview}/>:
                profileimage? <img src={profileimage} />:
                <img src="/image/profile/1.png" />}
                </div>
                <div>
                    {!username ?<p className={styles.username}>fkjvsfjfhfew</p>
                    :<p className={styles.username}>{username}</p>}
                   {!communityName? <p className={styles.comname}>fjdfefhebfehb</p>
                   : <p className={styles.comname}>{communityName}</p>}
                </div>
            </div>
        </div>

    </div>
  )
}
