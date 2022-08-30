
import axios from "axios";
import baseUrl from "../../config/baseUrl";

const GetAllEvents=async ({limit})=>{
    try {
        // const limitPrefix=limit?`limit=${limit}`:""
        const response=await axios.get(`https://nftickets-v1.herokuapp.com/api/ticket/list/minted-data?skip=1&limit=${limit}`)
        // console.log(response)
        const res=response.data.data[0].tickets
        console.log({res})
        return res
    } catch (error) {
        console.log(error.response)
        return null
    }

}
export default GetAllEvents;