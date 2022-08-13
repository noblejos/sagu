import axios from "axios";
import baseUrl from "../../config/baseUrl";
import consolelog from "../../config/consolelog";

const signinUser=async (formData)=>{
    try {
        const response = await axios.post(
          `${baseUrl}/auth/signin/web3`,
        formData
        );
        console.log(response.data);
        const successdata = response.data.data[0];
        const {user,accessToken}=successdata
        
        if(user._v){
          delete user._v
        }
        // consolelog(user);
        console.log(user)
        return { 
            ...user,access_token:accessToken
        };
      } catch (error) {
        console.log(error);
        const errorMsg = error.response.data.message || "a!something went wrong";
        const lowerCaseMsg= errorMsg.toLowerCase()
        let field=""
        if (lowerCaseMsg.includes('walletAddress')){
          field="walletAddress"
        }
    
        if (lowerCaseMsg.includes('signature')){
          field="signature"
        }
        console.log(errorMsg);
        console.log({lowerCaseMsg, field})
        return { status: "error", msg: errorMsg.split('!')[1], field:field || 'unknown'};
      }

}
export default signinUser;