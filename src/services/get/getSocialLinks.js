
import axios from "axios";
import baseUrl from "../../config/baseUrl";

const GetSocialLinks=async ({headers})=>{
    try {

        const response=await axios.get(`${baseUrl}/misc/users/socials`,{headers})
        // console.log(response)
        const res=response.data.data[0]
        console.log({res})
        return res
    } catch (error) {
        console.log(error.response)
        return null
    }

}
export default GetSocialLinks;