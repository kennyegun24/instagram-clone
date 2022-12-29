import { createContext, useReducer } from "react";

// CREATE A FUNCTION TO SERVE AS A UNIVERSAL CHECK FOR other user
export const UserContext = createContext()

// FUCTION TO WRAP AROOUND THE APP TO CHECK FOR THE Other user
export const UserContextProvider = ({children}) => {

  const INITIAL_STATE = {
    // chatId:"null",
    user:"null",
  }

  const UserReducer = (state, action) => {
    switch(action.type){
      case "Switch_User":
        return{
          user: action.payload,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE)

  return (
      <UserContext.Provider value={{ data:state, dispatch}}>
      {children}
  </UserContext.Provider>
  );
};
