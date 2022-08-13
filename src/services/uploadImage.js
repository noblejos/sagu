import axios from "axios";


const uploadImage=async (formImage, cloudName)=>{
    try {
        console.log("formImg")
        console.log({formImage})
        
        const response=await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formImage)
        console.log(response)
        const cloudinaRes=response.data
        return {img:cloudinaRes.secure_url}
    } catch (error) {
        console.log(error)
        return {status:'error', msg:"something went wrong"}
    }

}
export default  uploadImage