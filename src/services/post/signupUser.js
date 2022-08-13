import baseUrl from "../../config/baseUrl";
import axios from "axios";
import consolelog from "../../config/consolelog";

const signupUser = async (formData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/signup/generic`,
      formData
    );
    console.log(response.data);
    const successdata = response.data.data[0];
    const {user}=successdata
    consolelog(user);
    return { 
        walletAddress:user.walletAddress,
        orgName:user.orgName,
        username:user.username,
        id:user.id
    };
  } catch (error) {
    console.log(error);
    const errorMsg = error.response.data.message || "something went wrong";
    console.log({errorMsg})
    const lowerCaseMsg= errorMsg.toLowerCase()
    let field="unknown"
    if (lowerCaseMsg.includes('email')){
      field="email"
    }

    if (lowerCaseMsg.includes('orgName')){
      field="orgName"
    }
    if (lowerCaseMsg.includes('walletAddress')){
      field="walletAddress"
    }
    if (lowerCaseMsg.includes('username')){
      field="username"
    }
    // console.log(errorMsg);
    console.log({status: "error", msg: errorMsg.split('!')[1] || errorMsg, field:field || 'unknown'})
    return { status: "error", msg: errorMsg.split('!')[1], field:field || 'unknown'};
  }
};
export default signupUser;