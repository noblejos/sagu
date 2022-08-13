import { useContext, useState } from "react"
import { SignUpFormContext } from "../../context/signUpFormContext"
import styles from "../../styles/auth/SignUp.module.css"

export default function Step1() {
  const {formData,setFormData, FormErrors,setFormErrors, activeStep, setActiveStep}=useContext(SignUpFormContext)
  

    const {username, email,communityName,facebook,twitter,discord,desc } = formData
        const validate=(e)=>{
          e.preventDefault()
          let  errorObj={}

          // for Username
          let regexUsername=/^[a-z][a-z0-9]*$/;
          !username?errorObj.username="Field is required":
          username.length>30 || username.length<3?errorObj.username="Field must be within 3-to-30 letters":
          regexUsername.test(username)== false
          ? (errorObj.username = "username must contain only lowercase letters and numbers and must start with a letter"):
          null

          // for Email
          let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          !email
            ? (errorObj.email = "Field is required")
            : regexEmail.test(email) == false
            ? (errorObj.email = "Field is not a valid email address")
            : null;

          !communityName?errorObj.communityName="Field is required":
          communityName.length>30 || communityName.length<3?errorObj.communityName="Field must be within 3-to-30 letters":""
         
          !desc?errorObj.desc="Field is required":
          desc.length>30 || desc.length<3?errorObj.desc="Field must be within 3-to-30 letters":""
         
          desc.length>100?errorObj.desc="Field must be less than 100 characters":null
          

          let regexPlink = /^(ftp|http|https):\/\/[^ "]+$/;
          !facebook
          ? (errorObj.facebook = "Facebook link is required")
          : regexPlink.test(facebook) == false
          ? (errorObj.facebook =
              "Field is not a valid url link(e.g https://www.facebook.com/)")
          : !facebook.includes("facebook")
          ? (errorObj.facebook =
              "Field is not a valid url facebook link(e.g https://www.facebook.com/)")
          : null;

          !twitter
          ? (errorObj.twitter = "Twitter link is required")
          : regexPlink.test(twitter) == false
          ? (errorObj.twitter =
              "Field is not a valid url link(e.g https://www.twitter.com/)")
          : !twitter.includes("twitter")
          ? (errorObj.twitter =
              "Field is not a valid url facebook link(e.g https://www.twitter.com/)")
          : null;

          !discord
          ? (errorObj.discord = "discord link is required")
          : regexPlink.test(discord) == false
          ? (errorObj.discord =
              "Field is not a valid url link(e.g https://www.discord.com/)")
          : !discord.includes("discord")
          ? (errorObj.discord =
              "Field is not a valid url fdiscord link(e.g https://www.discord.com/)")
          : null;


          if (Object.keys(errorObj).length===0){
            console.log("next")
            return setActiveStep(2.0)  
          }
          
          return setFormErrors(errorObj)
          
        }
  
  return (
    <div className={styles.container}>
        <div className={styles.main}>
            <h1>Enter your details</h1>
            <form>
                <div className={styles.input}>
                <div className={styles.inp}>
                <span>Username</span>
                <input type="text" 
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={(e)=>setFormData({...formData,username:e.target.value})}
                />
                {FormErrors.username  && <div className={styles.error}>{FormErrors.username}</div>}
                </div>

                <div className={styles.inp}>
                <span>Email address</span>
                <input type="email"
                name="email"
                placeholder="email address"
                value={formData.email}
                onChange={(e)=>setFormData({...formData,email:e.target.value})}
                />
                {FormErrors.email  && <div className={styles.error}>{FormErrors.email}</div>}
                </div>
                <div className={styles.inpSocials}>
                <span>Community Social Links</span>
                  <input type="text" 
                  value={formData.facebook} 
                  onChange={(e)=>setFormData({...formData,facebook:e.target.value})}
                  placeholder="facebook"
                  />
                  {FormErrors.facebook  && <div className={styles.error}>{FormErrors.facebook}</div>}
                  <input type="text" 
                  value={formData.twitter} 
                  onChange={(e)=>setFormData({...formData,twitter:e.target.value})}
                  placeholder="twitter"
                  />
                  {FormErrors.twitter  && <div className={styles.error}>{FormErrors.twitter}</div>}
                  <input type="text" 
                  value={formData.discord} 
                  onChange={(e)=>setFormData({...formData,discord:e.target.value})}
                  placeholder="Discord"
                  />
                  {FormErrors.discord && <div className={styles.error}>{FormErrors.discord}</div>}
                </div>
                <div className={styles.inp}>
                <span>Community name</span>
                <input type="text" 
                name="community"
                placeholder="community name"
                value={formData.communityName}
                onChange={(e)=>setFormData({...formData,communityName:e.target.value})}
                />
                {FormErrors.communityName  && <div className={styles.error}>{FormErrors.communityName}</div>}
                </div>
                <div className={styles.inp}>
                <span>About your community</span>
                <textarea name="desc"
                value={formData.desc}
                onChange={(e)=>setFormData({...formData,desc:e.target.value})}
                ></textarea>
                {FormErrors.desc  && <div className={styles.error}>{FormErrors.desc}</div>}
                </div>
                </div>
                <div className={styles.btn} onClick={validate}><button>Continue</button></div> 
            </form>
        </div>
    </div>
  )
}
