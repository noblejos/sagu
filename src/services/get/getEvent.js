
import axios from "axios";
import baseUrl from "../../config/baseUrl";

const GetEvent=async ({name})=>{
    try {
        // const limitPrefix=limit?`limit=${limit}`:""
        const response=await axios.get(`${baseUrl}/ticket/get/ticket/${name}`)
        // console.log(response)
        const res=response.data.data[0].ticket
        console.log({res})
        return res
    } catch (error) {
        console.log(error.response)
        return null
    }

}
export default GetEvent;