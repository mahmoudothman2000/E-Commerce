import { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props){

  const[userToken , setUserToken] = useState(null);
  const[userName , setUserName] = useState(null);
  const[userEmail , setUserEmail] = useState(null);


  return <UserContext.Provider value = {{userToken , setUserToken , userName , setUserName , userEmail , setUserEmail}}>

          {props.children}
  </UserContext.Provider>
}

