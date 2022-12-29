import { createContext, useReducer } from "react";

// CREATE A FUNCTION TO SERVE AS A UNIVERSAL CHECK FOR other user
export const DischargeContext = createContext()

// FUCTION TO WRAP AROOUND THE APP TO CHECK FOR THE Other user
export const DischargeContextProvider = ({ children }) => {

  const INITIAL_STATE = {
    user: "null",
  }

  const UserReducer = (state, action) => {
    switch (action.type) {
      case "discharge":
        return {
          user: action.payload,
        }
      default:
        return state;
    }
  }

  const [state, discharge] = useReducer(UserReducer, INITIAL_STATE)

  return (
    <DischargeContext.Provider value={{ datas: state, discharge }}>
      {children}
    </DischargeContext.Provider>
  );
};
