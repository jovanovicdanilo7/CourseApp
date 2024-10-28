import { combineReducers } from "redux";
import { coursesReducer } from "./courses/reducer";
import { authorsReducer } from "./authors/reducer";
import { userReducer } from "./user/reducer";

export const rootReducer = combineReducers({
    courses: coursesReducer,
    authors: authorsReducer,
    user: userReducer
})