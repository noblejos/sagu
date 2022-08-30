import { createContext } from "react";
import { useState } from "react";

export const  EventContext= createContext()

export default function EventContextProvider({children}){
    const [formData,setFormData]=useState({ticketName:"",ticketType:"",
                                            transactionFee:"10",transactionDescription:"",
                                            ticketCategory:"",ticketPrice:"",ticketImage:""})

    const [formError,setFormError]=useState({ticketName:"",ticketType:"",
                                                transactionFee:"",transactionDescription:"",
                                                ticketCategory:"",ticketPrice:"",ticketImage:""})
    return(
        <EventContext.Provider value={{formData,setFormData,formError,setFormError}}>
            {children}
        </EventContext.Provider>
    )
}