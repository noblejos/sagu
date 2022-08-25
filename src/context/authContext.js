import React, { createContext, useState } from "react";
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);

  return (
    <AuthContext.Provider value={{ address, setAddress, show, setShow }}>
      {children}
    </AuthContext.Provider>
  );
}
