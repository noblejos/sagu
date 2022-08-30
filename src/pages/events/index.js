import Create from "../../componets/events/Create";
import EventContextProvider  from "../../context/eventContext";
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
// import Moralis from "moralis";
// import {mint} from "react-moralis"
import {contractABI, contractAddress} from "../../Data/data"
import Info from "../../componets/events/Info";
import MintModal from "../../componets/events/MintModal";
import mintedTicket from "../../services/post/mintedTicket";
// import { AuthContext } from "../../context/authContext";


const web3 = new Web3(Web3.givenProvider);

export default function Event({loggedUser, headers}) {
  // const {address} = useContext(AuthContext)
  const [isPending,setIsPending]=useState(false)
  const [metaData,setMetaData] = useState("")
  const eventForm=useRef(null)
  const router= useRouter()
  const [mintModal, setMintModal] = useState(false);
  const [ticketInfo, setTicketInfo] = useState(false);
  const [address, setAddress] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [formErrors,setFormErrors]=useState({ticketImage:""})
  const [ticketimage, setTicketimage]=useState("")
  const [ticketname, setTicketname]=useState("")
  


async function create(){
  setIsPending(true)
 const createForm= new FormData(eventForm.current)
 const accounts=  await ethereum.request({ method: 'eth_requestAccounts', params: [] });
 const account=accounts[0];
 setAddress(account)

 const profileImg=new FormData()
 profileImg.append("file", createForm.get("ticketimage"))
 profileImg.append("upload_preset","eifhxurctheuhwuqqyqsuanhquhwu" )
 const res = await uploadImage(profileImg, "greyhairedgallery");
 

 if (res.status == "error") {
   setIsPending(false);
  //  return console.log("error")
   return setFormErrors({
    ticketImage:
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
 setTicketimage(formData.coverImage)
 setTicketname(formData.name)

const response = await createTicket({formData, headers})
console.log(response)
if (response.status == "error") {
  // console.log("create event error");
  alert(response.msg || "Something went wrong");
  setIsPending(false);
  return;
}

// console.log({response})
// console.log(response.id)
 console.log({response: response.data.data[0].ticket._id})
 setTicketId(response.data.data[0].ticket._id)
 const myC=response.data.data[0].pinataStuff.IpfsHash;
 setMetaData(`ipfs://${myC}`);
  // setMetaData("ipfs://bafkreica3mqdef7bahxbuyg3qssfhe7u7vls4n6s7innf3i77j55r47xby");
  // console.log(metadataURI)
  console.log("creating")
  setIsPending(false)
  setTicketInfo(!ticketInfo)
}

 async function mint(){
  // setTicketInfo(!ticketInfo)
  setMintModal(true)
  // e.preventDefalut()
  console.log(metaData)
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      try {
        var _mintAmount=1
        var _tokenURI=metaData
        var mintRate=Number(await contract.methods.cost().call())
        var totalAmount = mintRate * _mintAmount;
        const response = await contract.methods.mint(_mintAmount, _tokenURI).send({ from: address, value:String(totalAmount)})
       const  txHash = response.transactionHash;
       console.log(txHash)
      const receipt = await web3.eth.getTransactionReceipt(txHash)
      const mintAmountRange = Array.from({length: _mintAmount}, (v, i) => i)
      const mintAmountRangeToToken = mintAmountRange.map(index => Web3.utils.hexToNumber(receipt.logs[index].topics[3]) )
      console.log({mintAmountRangeToToken})
      // const tokenId = response.events.Transfer.returnValues.tokenId;
      const formData={
        tokenId:mintAmountRange,
        transactionHash:txHash.toString(),
        creatorWallet:address.toString(),
        ticketId:ticketId.toString(),
      }
      const res= await mintedTicket({headers,formData})
      if (res.status == "error") {
        // console.log("create event error");
        
        setIsPending(false);
        return alert(response.msg || "Something went wrong");
      }
      console.log(res)
      setMintModal(false)
      alert("sucessfull")
      return router.push("/dashboard")

      } catch (error) {
        console.log(error)
         setTicketInfo(!ticketInfo)
        setMintModal(!mintModal)
      }
      
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
        {ticketInfo?<Info mintTicket={()=>mint()} image={ticketimage} name={ticketname}/>:""}
        {mintModal&& <MintModal close={()=>setMintModal(!mintModal)}/>}
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

  const headers ={
    "Content-type": "application/json",
    "Authorization": "Bearer "+loggedUser.access_token
  }
  return { props: { loggedUser,headers} };

}