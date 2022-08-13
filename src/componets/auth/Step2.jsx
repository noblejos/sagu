import {useContext, useState, useRef} from 'react'
import { AuthContext } from '../../context/authContext';
import { SignUpFormContext } from '../../context/signUpFormContext'
import signinHandshake from '../../services/post/signinHandshake';
import signupUser from '../../services/post/signupUser';
import uploadImage from '../../services/uploadImage';
import styles from "../../styles/auth/Step2.module.css"
import Profile from '../helper/Profile';


const img=[
  "/image/profile/1.png",
  "/image/profile/2.png",
  "/image/profile/3.png",
  "/image/profile/4.png",
  "/image/profile/5.png",
]
export default function Step2({submitForm}) {
  const imageDiv = useRef(null);
  const ImageForm =useRef(null)
  const bannerImageDiv = useRef(null);
    const {address}=useContext(AuthContext)
  const [selected,setSelected]=useState(null)
  const [preview, setPreview] =useState("")
  const [previewBanner,setPreviewBanner]=useState("")

  const {formData,setFormData,activestep,setActiveStep,
    FormErrors,setFormErrors}=useContext(SignUpFormContext)
      const {profileimage, bannerimage}=formData
  async function forward(e){
    let errorObj={}
    e.preventDefault()
    !profileimage ? (errorObj.profileimage = "Field is required") : null;
    !bannerimage ? (errorObj.bannerimage = "Field is required") : null;
    if(Object.keys(errorObj).length == 0){;
      return submitForm();
    } 
    setFormErrors(errorObj);
  }
  function handleChange(e) {
    setSelected(null)
    setFormData({...formData,profileimage:e.target.files[0]})
    // console.log(e.target.files[0])
    const selected = e.target.files[0];
    // onchange(selected)
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setPreview(onLoadEvent.target.result);
      setPreview
      // console.log(onLoadEvent.target.result)
    };
    
    reader.readAsDataURL(e.target.files[0]);
  }

  function handleBannerChange(e) {
    setFormData({...formData,bannerimage:e.target.files[0]})
    const selected = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setPreviewBanner(onLoadEvent.target.result);
    };
    
    reader.readAsDataURL(e.target.files[0]);
  }
  return (
    <div className={styles.container}>
      <h1>Create Profile</h1>
  <form 
  ref={ImageForm}
  id="form"
  encType="multipart/form-data"
  >
      <div className={styles.main}>
      <div className={styles.avatar}>
        <h2>Pick your identicon</h2>
        <h4>Choose your avatar!</h4>
        <div className={styles.img}>
        {img.map((i, index)=>(
          <div key={i} 
          
          onClick={()=>{setSelected(index)}}
          style={{border:selected==index?"4px solid purple":""}}>
            <img src={i} 
            onClick={()=>{setFormData({...formData,profileimage:i})
           
            setPreview(null)
            }}
             />
            </div>
        ))}
        <div>
            <div className={styles.profile}>
              {preview? 
              <img src={preview} 
              className={styles.preview}
              onClick={()=>{setPreview("")
              setFormData({...formData,profileimage:""})}
            }

              />
                :
                <div className={styles.profileBtn}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      imageDiv.current.click();
                    }}
                  >
                    <img src="/image/plus.png" />
                    
                    
                  </button>
                  <input
                    onChange={handleChange}
                    // value={profileimage}
                    ref={imageDiv}
                    name={"image"}
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    style={{ display: "none" }}
                  />
                </div>
                }
            </div>
        </div>
        </div>
        {FormErrors.profileimage ? (
              <div className={styles.errorI}>{FormErrors.profileimage}</div>
            ) : (
              ""
            )}
        {/* BANNER IMAGE */}
        <div className={styles.banner}>
        <div className={styles.upload_container}>
              <div className={styles.uploads}>
                <div >
                  <h4>Upload Banner Image</h4>
                  <h3>JPEG, PNG, GIF, WEBP, or MP4. Max 20mb</h3>
                  <div className={styles.upBtn}>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        bannerImageDiv.current.click();
                      }}
                    >
                      <img src="/image/cloud-upload 1.svg" />
                      <span>upload</span>
                    </button>
                    <input
                      onChange={handleBannerChange}
                      // value={bannerimage}
                      ref={bannerImageDiv}
                      name={"banner"}
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      style={{ display: "none" }}
                      
                    />
                  </div>
                </div>
              </div>
              
            </div>
            <div className={styles.errorI}>{FormErrors.bannerimage}</div>
            </div>
      </div>
        </div>
        </form>
        <div className={styles.profilediv}>
        <Profile profileimage={formData.profileimage} username={formData.username}
         preview={preview} bannerimage={previewBanner} communityName={formData.communityName}/>
          </div>
          <div className={styles.submitBtn}>
        <button onClick={forward}>confirm</button>
        </div>
    </div>
  )
}
