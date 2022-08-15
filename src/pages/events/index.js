import Create from "../../componets/events/Create";
import EventContextProvider from "../../context/eventContext";
import Nav from "../../componets/helper/Nav"

export default function index() {

  return (
    <>
    <Nav/>
    
    <div>
        <EventContextProvider>
        <Create/>
        </EventContextProvider>
    </div>
    </>
  )
}
