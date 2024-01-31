import React, { createContext, useState } from 'react'
export const LoginContext=createContext();
const Context = ({children}) => {
const[loginData,setLoginData]=useState(null);
const [user,setUser]=useState("👨");
const[loading,setLoading]=useState(true)
  return (
    <>
    <LoginContext.Provider value={{loginData,setLoginData,user,setUser,loading,setLoading}}>
        {children}
    </LoginContext.Provider>
    
    </>
  )
}

export default Context