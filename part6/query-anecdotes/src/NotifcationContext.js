import {createContext} from "react";
import {useReducer} from "react";


const NotificationContext = createContext();

const messageReducer = (state, action) => {
    switch (action.type) {
        case "SET_MESSAGE":
            return action.payload;
        case "CLEAR_MESSAGE":
            return null;
        default:
            return state;
    }
}


export const NotificationContextProvider = (props) => {
    const [message, messageDispatch]=useReducer(messageReducer, null)
    return (
        <NotificationContext.Provider value={[message, messageDispatch]}>
        {props.children}
        </NotificationContext.Provider>
    );
}

export default NotificationContext