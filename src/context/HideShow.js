import { createContext, useReducer } from "react";

// CREATE A FUNCTION TO SERVE AS A UNIVERSAL CHECK FOR other user
export const HideAndShow = createContext()

// FUCTION TO WRAP AROOUND THE APP TO CHECK FOR THE Other user
export const HideAndShowContextProvider = ({ children }) => {

    const INITIAL_STATE = {
        prop: false,
    }

    const HideShowReducer = (state, action) => {
        switch (action.type) {
            case "hide":
                return {
                    prop: action.payload,
                }
            default:
                return state;
        }
    }

    const [state, hideShow] = useReducer(HideShowReducer, INITIAL_STATE)

    return (
        <HideAndShow.Provider value={{ hide: state, hideShow }}>
            {children}
        </HideAndShow.Provider>
    );
};
