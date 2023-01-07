import { createContext, useReducer } from "react";

// CREATE A FUNCTION TO SERVE AS A UNIVERSAL CHECK FOR other user
export const MessagesContext = createContext()

// FUCTION TO WRAP AROOUND THE APP TO CHECK FOR THE Other user
export const MessagesContextProvider = ({ children }) => {

    const INITIAL_STATE = {
        message: 'null',
    }

    const UserReducer = (state, action) => {
        switch (action.type) {
            case "messages":
                return {
                    message: action.payload,
                }
            default:
                return state;
        }
    }

    const [state, dischargeMessages] = useReducer(UserReducer, INITIAL_STATE)

    return (
        <MessagesContext.Provider value={{ mssg: state, dischargeMessages }}>
            {children}
        </MessagesContext.Provider>
    );
};
