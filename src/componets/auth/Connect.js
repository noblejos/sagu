import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import SignIn from './SignIn'
import SignUp from './SignUp'

export default function Connect() {

  const {address,setAddress,show,setShow}= useContext(AuthContext)
  return (
    <div>
     {!show? 
     <SignUp/>
     :<SignIn/>
    }
    </div>
  )
}
