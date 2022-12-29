import { createContext, useReducer } from "react";

// CREATE A FUNCTION TO SERVE AS A UNIVERSAL CHECK FOR other user
export const followingContext = createContext()

// FUCTION TO WRAP AROOUND THE APP TO CHECK FOR THE Other user
export const UpdateFollowing = ({ children }) => {

    const INITIAL_STATE = {
        myFollow: "null",
    }

    const UserReducer = (state, action) => {
        switch (action.type) {
            case "follows":
                return {
                    myFollow: action.payload,
                }
            default:
                return state;
        }
    }

    const [state, display] = useReducer(UserReducer, INITIAL_STATE)

    return (
        <followingContext.Provider value={{ following: state, display }}>
            {children}
        </followingContext.Provider>
    );
};
