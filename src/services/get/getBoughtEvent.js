
import axios from "axios";
import baseUrl from "../../config/baseUrl";

const GetBoughtEvent=async ({username})=>{
    try {
        // const limitPrefix=limit?`limit=${limit}`:""
        const response=await axios.get(`https://nftickets-v1.herokuapp.com/api/ticket/get/bought/minted-ticket?username=${username}`)
        // console.log(response)
        const res=response.data.data[0].tickets
        console.log({res})
        return res
    } catch (error) {
        console.log(error.response)
        return null
    }
}
export default GetBoughtEvent;