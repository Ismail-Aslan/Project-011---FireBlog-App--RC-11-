import { createContext, useState, useEffect } from "react";
import { userObserver } from "../helpers/firebase"; 
export const AuthContext = createContext();



export function AuthContextProvider(props) {

  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    userObserver(setCurrentUser,setPending);
    
  }, []);

  if(pending){
    console.log("pending");
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}


