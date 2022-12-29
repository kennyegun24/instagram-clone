import { createContext, useReducer } from "react";

// CREATE A FUNCTION TO SERVE AS A UNIVERSAL CHECK FOR other user
export const PostCountContext = createContext()

// FUCTION TO WRAP AROOUND THE APP TO CHECK FOR THE Other user
export const PostCountContextProvider = ({ children }) => {

    const INITIAL_STATE = {
        post: "null",
    }

    const UserReducer = (state, action) => {
        switch (action.type) {
            case "countposts":
                return {
                    post: action.payload,
                }
            default:
                return state;
        }
    }

    const [state, dischargePosts] = useReducer(UserReducer, INITIAL_STATE)

    return (
        <PostCountContext.Provider value={{ count: state, dischargePosts }}>
            {children}
        </PostCountContext.Provider>
    );
};
