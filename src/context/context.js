import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

// CREATE A FUNCTION TO SERVE AS A UNIVERSAL CHECK FOR CURRENT USER LOGGED IN
export const AuthContext = createContext()

// FUCTION TO WRAP AROOUND THE APP TO CHECK FOR THE CURRENT USER
export const AuthContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({})

    // USEEFFECT HOOK TO CHECK FOR UPDATES ON THE USER STATUS CHANGE
  useEffect(() => {
    const log = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    });

    return () => {
      log(); 
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
