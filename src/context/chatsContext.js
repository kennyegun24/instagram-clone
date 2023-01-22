import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./context";

// CREATE A FUNCTION TO SERVE AS A UNIVERSAL CHECK FOR other user
export const ChatContext = createContext()

// FUCTION TO WRAP AROOUND THE APP TO CHECK FOR THE Other user
export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  }

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId: currentUser.uid > action.payload.uid
            ? currentUser.uid + action.payload.uid
            : action.payload.uid + currentUser.uid
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
