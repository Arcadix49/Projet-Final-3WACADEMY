import { combineReducers } from "redux";
import userSlice from "./slice/userSlice.js";

const rootReducer = combineReducers({
    user: userSlice
})


export default rootReducer