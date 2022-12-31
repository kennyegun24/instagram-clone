import { createContext, useReducer } from "react";
// CREATE A FUNCTION TO SERVE AS A UNIVERSAL CHECK FOR other user
export const StatusContext = createContext()

// FUCTION TO WRAP AROOUND THE APP TO CHECK FOR THE Other user
export const StatusContextProvider = ({ children }) => {

    const INITIAL_STATE = {
        status: false,
    }

    const UserReducer = (state, action) => {
        switch (action.type) {
            case "SWITCH_STATUS":
                return {
                    status: action.payload,
                }
            default:
                return state
        }
    }

    const [state, dispatchStatus] = useReducer(UserReducer, INITIAL_STATE)

    return (
        <StatusContext.Provider value={{ progress: state, dispatchStatus }}>
            {children}
        </StatusContext.Provider>
    );
};
