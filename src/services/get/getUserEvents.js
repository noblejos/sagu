
import axios from "axios";
import baseUrl from "../../config/baseUrl";

const GetUsersEvents=async ({username})=>{
    try {

        const response=await axios.get(`${baseUrl}/ticket/get/minted-data?username=${username}`)
        // console.log(response)
        const res=response.data.data[0]
        
        // console.log({res})
        return res
    } catch (error) {
        console.log(error.response)
        return null
    }

}
export default GetUsersEvents;