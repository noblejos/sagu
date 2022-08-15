import Create from "../../componets/events/Create";
import EventContextProvider from "../../context/eventContext";
import Nav from "../../componets/helper/Nav"
import {useState,useRef} from "react"
import Spinner from "../../componets/helper/spinner"
import uploadImage from "../../services/uploadImage"
import {verify} from "jsonwebtoken"

export default function Event({loggedUser}) {
  const [isPending,setIsPending]=useState(false)
const eventForm=useRef(null)

async function create(){
  setIsPending(true)
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
  ticketName:createForm.get("ticketname"),
  ticketType:createForm.get("tickettype"),
  ticketCategory:createForm.get("ticketcategory"),
  ticketDescription:createForm.get("ticketdescription"),
  transactionFee:createForm.get("transactionfee"),
  ticketPrice:createForm.get("ticketprice"),
  ticketImage:res.img
 }
 console.log({formData})
 alert("event minting sucessfull")
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
  // const events = usersEvent.events
  // // console.log({events})

  // // console.log({socialLinks})
  return { props: { loggedUser} };

}