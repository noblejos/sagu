
import axios from "axios";
import baseUrl from "../../config/baseUrl";

const GetAllEvents=async ()=>{
    try {
        // const limitPrefix=limit?`limit=${limit}`:""
        const response=await axios.get(`${baseUrl}/events/list?skip=10&limit=0`)
        // console.log(response)
        const res=response.data.data[0]
        console.log({res})
        return res
    } catch (error) {
        console.log(error.response)
        return null
    }

}
export default GetAllEvents;