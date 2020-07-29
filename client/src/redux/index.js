import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { rootReducer } from "./reducers";
import { getUserAction } from "../redux/actions/userActions";

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));
store.dispatch(getUserAction());
