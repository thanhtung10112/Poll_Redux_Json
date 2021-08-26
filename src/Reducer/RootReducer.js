import { combineReducers } from "redux";
import PollReducer from "./PollReducer";


const RootReducer = combineReducers({
    data: PollReducer,
});

export default RootReducer;