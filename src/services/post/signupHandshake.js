import axios from "axios";
import baseUrl from "../../config/baseUrl";
import consolelog from "../../config/consolelog";

const signupHandshake = async ({ walletAddress }) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/handshake/signup`, {
      walletAddress,
    });
    consolelog(response);

    return { status: "success" };
  } catch (error) {
    console.log({ error });

    console.log(error.response.data);
    console.log("error is here ddd");
    // const errorErr = error.response.data.error || "email something went wrong";
    const errorMsg =
      error.response.data.message || "email something went wrong";

    // const lowerCaseMsg= errorMsg.toLowerCase()
    // const lowerCaseErr= errorErr.toLowerCase()
    // let field=""
    // if (lowerCaseMsg.includes('email')){
    //   field="email"
    // }
    // if (lowerCaseMsg.includes('password')){
    //   field="password"
    // }
    return { status: "error", msg: errorMsg.split("!")[1] };
  }
};
export default signupHandshake;
