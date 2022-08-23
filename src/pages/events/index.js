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
import Web3 from "web3"
import Moralis from "moralis";
// import {mint} from "react-moralis"
import {contractABI, contractAddress} from "../../Data/data"
// import { AuthContext } from "../../context/authContext";


const web3 = new Web3(Web3.givenProvider);

export default function Event({loggedUser, headers}) {
  // const {address} = useContext(AuthContext)
  const [isPending,setIsPending]=useState(false)
  const eventForm=useRef(null)
  const router= useRouter()
  // console.log(address)
  // const accounts= web3.eth.getAccounts();
  // console.log(accounts)
  // console.log(contractABI)


async function create(){
  // setIsPending(true)
 const createForm= new FormData(eventForm.current)
 const accounts=  await ethereum.request({ method: 'eth_requestAccounts', params: [] });
 const account=accounts[0];

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
//  alert("event minting sucessfull")
//  router.push("/dashboard")
 console.log({response: response.data.data[0].pinataStuff})
 const myC=response.data.data[0].pinataStuff.IpfsHash;
const metadataURI = `ipfs://${myC}`;
  // const metadataURI = "ipfs://bafkreica3mqdef7bahxbuyg3qssfhe7u7vls4n6s7innf3i77j55r47xby";
  console.log(metadataURI)

  const contract = new web3.eth.Contract(contractABI, contractAddress);
      try {
        var _mintAmount=3
        var _tokenURI=metadataURI
        var mintRate=Number(await contract.methods.cost().call())
        var totalAmount = mintRate * _mintAmount
        const response = await contract.methods.mint( _mintAmount,account).send({ from: account, value:String(totalAmount)})
        const tokenId = response.events.Transfer.returnValues.tokenId;
        alert(
          `NFT successfully minted. Contract address - ${contractAddress} and Token ID - ${tokenId}`
        )

      } catch (error) {
        console.log(error)
      }
 
      // const response = await contract.methods
      //   .mint(metadataURI,account)
      //   .send({ from: user.get("ethAddress") });
      // Get token id
      // const tokenId = response.events.Transfer.returnValues.tokenId;
      // // Display alert
      // alert(
      //   `NFT successfully minted. Contract address - ${contractAddress} and Token ID - ${tokenId}`
      // );
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