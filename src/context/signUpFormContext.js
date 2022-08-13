import { createContext, useState } from "react";


export const SignUpFormContext = createContext()

export default function SignUpFormProvider({children}){
    const [activeStep, setActiveStep]=useState(1.0)
    const [FormErrors,setFormErrors]=useState({username:"",email:"",comunityName:"",desc:"",profileimage:"",bannerimage:""})
    const [formData, setFormData]= useState({username:"",email:"", communityName:"",desc:"",
                                            faceBook:"",twitter:"", discord:"",profileimage:"",bannerimage:"",    
                                        })

    return(
        <SignUpFormContext.Provider value={{formData,setFormData,activeStep,setActiveStep,
                                            FormErrors,setFormErrors}}>
            {children}
        </SignUpFormContext.Provider>
    )
}