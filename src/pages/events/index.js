import Create from "../../componets/events/Create";
import EventContextProvider from "../../context/eventContext";
import Nav from "../../componets/helper/Nav"
import {useState,useRef, useContext} from "react"
import Spinner from "../../componets/helper/spinner"
import uploadImage from "../../services/uploadImage"
import {verify} from "jsonwebtoken"
import createTicket from "../../services/post/createTickets";
import { LSPFactory } from '@lukso/lsp-factory.js';
import { AuthContext } from "../../context/authContext";
import { startProcess } from "../../Data/data";
import { useRouter } from "next/router";
// import { AuthContext } from "../../context/authContext";

export default function Event({loggedUser, headers}) {
  const [isPending,setIsPending]=useState(false)
  const eventForm=useRef(null)
  const router= useRouter()

async function create(){
  // setIsPending(true)
 const createForm= new FormData(eventForm.current)

 const profileImg=new FormData()
 profileImg.append("file", createForm.get("ticketimage"))
 profileImg.append("upload_preset","eifhxurctheuhwuqqyqsuanhquhwu" )
 const res = await uploadImage(profileImg, "greyhairedgallery");
 

 if (res.status == "error") {
   setIsPending(false);
   return setFormErrors({
     image:
       "Something is wrong with the image upload. Please try again later",
   });
 }


  const formData={
  name:createForm.get("ticketname"),
  type:createForm.get("tickettype"),
  category:createForm.get("ticketcategory"),
  desc:createForm.get("ticketdescription"),
  fee:parseInt(createForm.get("transactionfee")),
  price:parseInt(createForm.get("ticketprice")),
  coverImage:res.img
 }
 console.log({formData})

const response = await createTicket({formData, headers})
console.log(response)
if (response.status == "error") {
  // console.log("create event error");
  alert(response.msg || "Something went wrong");
  setIsPending(false);
  return;
}

 alert("event minting sucessfull")
 router.push("/dashboard")
//  console.log({response: response.data.data[0].pinataStuff})
//  const myC=response.data.data[0].pinataStuff.IpfsHash;
// const myLSP3MetaData = `ipfs://${myC}`;

// const contract= startProcess(myLSP3MetaData);
// // console.log({contract})
}

  return (
    <>
    <Nav loggedUser={loggedUser}/>
    
    <div>
        <EventContextProvider>
          <form 
          ref={eventForm}
          >
        <Create create={()=>create()}/>
        </form>
        {isPending&&<Spinner/>}
        </EventContextProvider>
    </div>
    </>
  )
}

export async function getServerSideProps({req}) {
  const {cookies} =req
  console.log('where are you')
  const jwt= cookies.UserJWT;

  if(!jwt){

    return {
      redirect:{
        permanent:false,
        destination:"/auth/connect"
      }
    }
  }
  const secret= process.env.SECRET||"no hacking here"
  let loggedUser=verify(jwt,secret)

  // console.log(loggedUser)
  // console.log({loggedUser})  

  const headers ={
    "Content-type": "application/json",
    "Authorization": "Bearer "+loggedUser.access_token
  }
  // const username=loggedUser.username
  // const usersEvent= await  GetUsersEvents({username})

  return { props: { loggedUser,headers} };

}