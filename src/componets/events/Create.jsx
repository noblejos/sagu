import styles from "../../styles/events/Create.module.css"
import Select from 'react-select'
import { EventContext } from "../../context/eventContext"
import { useContext,useRef,useState, useEffect } from "react"

const type=[
    {value:"free", label:"Free"},
    {value:"paid", label:"Paid"},
]
const category = [
    {value:"single",label:"Single"},
    {value:"membership",label:"Membership"},
    {value:"donation",label:"Donation"},
    {value:"fundriser",label:"Fundriser"},
]

export default function Create() {
    const profileImageDiv = useRef(null);
    const [imageUrl, setImageUrl] = useState("");
    const {formData,setFormData, formErrors,setFormErrors}=useContext(EventContext)
    const {ticketName,ticketType,transactionFee,ticketDescription,
    ticketCategory,ticketPrice,ticketImage}=formData
    console.log(formData)
    
    function Validate(e){
        e.preventDefault()
        let  errorObj={}

        !ticketName?errorObj.ticketName="Field is required":null
        !ticketType?errorObj.ticketType="Field is required":null
        !transactionFee?errorObj.transactionFee="Field is required":null
        !ticketDescription?errorObj.ticketDescription="Field is required":null
        !ticketCategory?errorObj.ticketCategory="Field is required":null
        !ticketPrice?errorObj.ticketPrice="Field is required":null
        !ticketImage?errorObj.ticketImage="Field is required":null
        if(Object.keys(errorObj).lenght==0){
            console.log(cleared)
        }
        return setFormErrors(errorObj)
    }

    function handleChange(e) {
        setFormData({...formData,ticketImage:e.target.value})
        const reader = new FileReader();
        reader.onload = function (onLoadEvent) {
          setImageUrl(onLoadEvent.target.result);
          console.log(onLoadEvent.target.result)
        };
        reader.readAsDataURL(e.target.files[0]);
      }
  return (
    <div className={styles.content}>
        <h1>Create Ticket</h1>
        <h3>This section contains the basic details of your ticket.</h3>
        <div className={styles.main}>
            <div className={styles.left}>
                <div className={styles.inp}>
                    <p>Ticket Name</p>
                    <input type="text"
                    name={"ticketname"}
                    value={ticketName}
                    placeholder="Ticket name"
                    onChange={(e)=>setFormData({...formData,ticketName:e.target.value})}
                    />
                    <div className={styles.error}>{formErrors.ticketName}</div>
                </div>
                <div className={styles.inp}>
                    <p>Ticket Type</p>
                    <Select
                    name="tickettype"
                defaultValue={ticketType}
                    onChange={(options)=>setFormData({...formData,ticketType:options.value})}
                    options={type}
                    >
                    </Select>
                    <div className={styles.error}>{formErrors.ticketType}</div>
                </div>
                {formData.ticketType=="free"?"":
                <div className={styles.inp}>
                    <p>Transaction Fee</p>
                    <input type="number" 
                    name="transactionfee"
                    value={transactionFee}
                    onChange={(e)=>setFormData({...formData,transactionFee:e.target.value})}
                    />
                    <div className={styles.error}>{formErrors.transactionFee}</div>
                     </div>}
                    <div className={styles.inp}>
                        <p>Transaction Description</p>
                        <textarea name="ticketdescription" 
                        value={ticketDescription}
                        onChange={(e)=>setFormData({...formData,transactionDescription:e.target.value})}

                        ></textarea>
                        <div className={styles.error}>{formErrors.transactionDescription}</div>
                    </div>
               
            </div>
            <div className={styles.right}>
                <div className={styles.inp}>
                    <p>Ticket Category</p>
                <Select
                name="ticketcategory"
                defaultValue={ticketCategory}
                onChange={(options)=>setFormData({...formData,ticketCategory:options.value})}
                options={category}
                ></Select>
                <div className={styles.error}>{formErrors.ticketCategory}</div>
                </div>
               {formData.ticketType=="free"?"":
               <div className={styles.inp}>
                    <p>Ticket Price</p>
                    <input type="text" 
                    placeholder="Ticket price"
                    value={ticketPrice}
                    onChange={(e)=>setFormData({...formData,ticketPrice:e.target.value})}
                    />
                    <div className={styles.error}>{formErrors.ticketPrice}</div>
                </div>}
                <div className={styles.inp}>
                <div className={styles.uploads}>
                {ticketImage ? (
                  <img
                    className={styles.previewimg}
                    src={imageUrl}
                    style={{ objectFit: "cover" }}
                    alt=""
                    onClick={() => {
                      setImageUrl(null);
                      setFormData({...formData,ticketImage:""});
                    }}
                  />
                ) : (
                  ""
                )}
                <div style={ticketImage ? { display: "none" } : {}}>
                  <h4 >Upload Ticket Image</h4>
                  <h3>JPEG, PNG, WEBP. Max 20mb</h3>
                  <div className={styles.upBtn}>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        profileImageDiv.current.click();
                      }}
                    >
                      <img src="/svg/cloud-upload 1.svg" />
                      <span>upload</span>
                    </button>
                    <input
                      onChange={handleChange}
                      value={ticketImage}
                      ref={profileImageDiv}
                      name={"profile"}
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      style={{ display: "none" }}
                      
                    />
                  </div>
                </div>
              </div>
              <div className={styles.error}>{formErrors.ticketImage}</div>
                </div>
            </div>
        </div>
        <button onClick={Validate}>Create Ticket</button>
    </div>
  )
}
