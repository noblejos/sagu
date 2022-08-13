import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import signinUser from "../../services/post/signinUser";

const secret= process.env.SECRET||"no hacking here"

export default async function apiSigninUser(req,res){
    // console.log({secret})
    const response= await signinUser(req.body)
    // console.log({response})
    // console.log('THIS IS RESPONSE')
    if(response.status!=="error"){
        console.log('signed in')
        const token = sign(
        {
            exp: Math.floor(Date.now()/1000)*60*60*24*30, //30 days
            ...response
        }, secret
        );
        const serialised=serialize("UserJWT", token,{
            httpOnly:true,
            secure:process.env.NODE_ENV !=="development",
            sameSite:"strict",
            maxAge:60* 60 * 24 *30,
            path:"/",
        })
        res.setHeader('Set-Cookie', serialised)
        // res.setHeader('Authorization', "Bearer "+response.access_token)
        res.status(200).json({message:"success",...response})
        console.log(response)
        return 
    }
    console.log("met an error")
    return res.json(response)
}
