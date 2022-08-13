import { serialize } from "cookie";

const secret= process.env.SECRET||"no hacking here"

export default async function apiSignoutUser(req,res){
    console.log('you have logged out')
    const {cookies} =req;
    const jwt= cookies.UserJWT;
    console.log('you have logged out')
    // console.log(jwt)
    if(!jwt){
        return res.json({message:"You are not logged in"})
    }
    const serialised=serialize("UserJWT", null,{
        httpOnly:true,
        secure:process.env.NODE_ENV !=="development",
        sameSite:"strict",
        maxAge:-1,
        path:"/",
    })
    res.setHeader('Set-Cookie', serialised)
    res.status(200).json({message:"successful logout"})
    return 

}
