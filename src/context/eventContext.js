import { createContext } from "react";
import { useState } from "react";

export const  EventContext= createContext()

export default function EventContextProvider({children}){
    const [formData,setFormData]=useState({ticketName:"",ticketType:"",
                                            TransactionFee:"",transactionDescription:"",
                                            TicketCategory:"",TicketPrice:"",ticketImage:""})

    const [formErrors,setFormError]=useState({ticketName:"",ticketType:"",
                                                TransactionFee:"",transactionDescription:"",
                                                TicketCategory:"",TicketPrice:"",ticketImage:""})
    return(
        <EventContext.Provider value={{formData,setFormData,formErrors,setFormError}}>
            {children}
        </EventContext.Provider>
    )
}