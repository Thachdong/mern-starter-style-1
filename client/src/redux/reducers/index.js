import { combineReducers } from "redux";
import { user } from "./userReducers";

export const rootReducer = combineReducers({
  user,
});
