import React from 'react'
import styles from "../../styles/auth/Step2.module.css"

export default function Step2() {
    const img=[
        "/image/profile/1.png",
        "/image/profile/2.png",
        "/image/profile/3.png",
        "/image/profile/4.png",
        "/image/profile/5.png",
    ]
  return (
    <div className={styles.container}>
      <h1>Create Profile</h1>


      <div className={styles.avatar}>
        <h2>Pick your identicon</h2>
        <h4>Choose your avatar!</h4>
        <div className={styles.img}>
        {img.map((i, index)=>(
            <img src={i} key={i} />
        ))}
        </div>
        </div>
    </div>
  )
}
