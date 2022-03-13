import { combineReducers } from "redux";
import memberReducer from "./memberReducer"

const rootReducer = combineReducers({
    memberRed:memberReducer
});

export default rootReducer;
