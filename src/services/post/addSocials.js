import axios from "axios"
import baseUrl from "../../config/baseUrl"

// https://nftickets-v1.herokuapp.com/api/auth/misc/add-socials
const addSocial=async ({socialData, headers})=>{
    try {
        const {instagram}= socialData
        if (!instagram){ delete socialData.instagram}
        const response=await axios.post(`${baseUrl}/auth/misc/add-socials`, socialData, headers)
        console.log('addsocials')
        console.log({response})

        return {...response}

    } catch (error) {
      console.log('errro on social data')
        console.log(error);

        const errorMsg = error.response.data.message || "something went wrong";
        const lowerCaseMsg= errorMsg.toLowerCase()
        let field=""
        if (lowerCaseMsg.includes('facebook')){
          field="facebook"
        }
        if (lowerCaseMsg.includes('linkedln')){
          field="linkedln"
        }
        if (lowerCaseMsg.includes('twitter')){
          field="twitter"
        }
        if (lowerCaseMsg.includes('social')){
          field="facebook"
        }
        console.log(errorMsg);
        console.log({lowerCaseMsg, field})
        return { status: "error", msg: errorMsg, field:field || 'facebook'};
    }
   
}

export default addSocial