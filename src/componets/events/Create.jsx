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
    {value:"fundraiser",label:"Fundraiser"},
]

export default function Create({create}) {
    const profileImageDiv = useRef(null);
    const [imageUrl, setImageUrl] = useState("");
    const {formData,setFormData, formError,setFormError}=useContext(EventContext)
    const {ticketName,ticketType,transactionFee,ticketDescription,
    ticketCategory,ticketPrice,ticketImage}=formData
    
    
    function Validate(e){
        e.preventDefault()
        console.log(formData)
        let  errorObj={}

        !ticketName?errorObj.ticketName="Field is required":null
        !ticketType?errorObj.ticketType="Field is required":null
      {!formData.ticketType=="free" && !transactionFee?errorObj.transactionFee="Field is required":null}
        !ticketDescription?errorObj.ticketDescription="Field is required":null
        !ticketCategory?errorObj.ticketCategory="Field is required":null
        {!formData.ticketType=="free" && !ticketPrice?errorObj.ticketPrice="Field is required":null}
        !ticketImage?errorObj.ticketImage="Field is required":null
        !ticketPrice?errorObj.ticketPrice="Field is required":null
        if(Object.keys(errorObj).length===0){
            console.log("cleared")
        }
        if (Object.keys(errorObj).length===0){
          console.log("next")
         
          setFormError(errorObj)
          return create()
        }
       setFormError(errorObj)
      console.log("err")
      return 
    }

    function handleChange(e) {
        setFormData({...formData,ticketImage:e.target.value})
        const reader = new FileReader();
        reader.onload = function (onLoadEvent) {
          setImageUrl(onLoadEvent.target.result);
          // console.log(onLoadEvent.target.result)
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
                   {formError.ticketName && <div className={styles.error}>{formError.ticketName}</div>}
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
                   {formError.ticketType&& <div className={styles.error}>{formError.ticketType}</div>}
                </div>
                {formData.ticketType=="free"?"":
                <div className={styles.inp}>
                    <p>Transaction Fee</p>
                    <input type="number" 
                    name={"transactionfee"}
                    value={transactionFee}
                    onChange={(e)=>setFormData({...formData,transactionFee:e.target.value})}
                    />
                    {formError.transactionFee&&<div className={styles.error}>{formError.transactionFee}</div>}
                     </div>}
                   
                    <div className={styles.inp}>
                        <p>Transaction Description</p>
                        <textarea 
                        name="ticketdescription" 
                        placeholder="Ticket Description"
                        value={ticketDescription}
                        onChange={(e)=>setFormData({...formData,ticketDescription:e.target.value})}

                        ></textarea>
                        {formError.ticketDescription&&<div className={styles.error}>{formError.ticketDescription}</div>}
                    </div>
               
            </div>
            <div className={styles.right}>
                <div className={styles.inp}>
                    <p>Ticket Category</p>
                <Select
                name="ticketcategory"
                defaultValue={ticketCategory}
                onChange={(category)=>setFormData({...formData,ticketCategory:category.value})}
                options={category}
                ></Select>
                {formError.ticketCategory&&<div className={styles.error}>{formError.ticketCategory}</div>}
                </div>
               {formData.ticketType=="free"?"":
               <div className={styles.inp}>
                    <p>Ticket Price</p>
                    <input type="number" 
                    name={"ticketprice"}
                    placeholder="Ticket price"
                    value={ticketPrice}
                    onChange={(e)=>setFormData({...formData,ticketPrice:e.target.value})}
                    />
                   {formError.ticketPrice&& <div className={styles.error}>{formError.ticketPrice}</div>}
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
                      <img src="/image/cloud-upload 1.svg" />
                      <span>upload</span>
                    </button>
                    <input
                      onChange={handleChange}
                      value={ticketImage}
                      ref={profileImageDiv}
                      name={"ticketimage"}
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      style={{ display: "none" }}
                      
                    />
                  </div>
                </div>
              </div>
              {formError && <div className={styles.error}>{formError.ticketImage}</div>}
                </div>
            </div>
        </div>
        <button onClick={Validate}>Create Ticket</button>
    </div>
  )
}
