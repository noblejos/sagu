import axios from "axios"
import baseUrl from "../../config/baseUrl"


const createTicket=async ({formData, headers})=>{
    try {
        const response=await axios.post(`${baseUrl}/ticket/create`, formData, {headers})
        console.log({formData, headers})
        return {...response}

    } catch (error) {
        console.log(error);
        const errorMsg = error.response.data.message || "something went wrong";
        console.log(errorMsg)
        return { status: "error", msg: errorMsg};
    }
}
export default createTicket