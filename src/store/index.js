import { thunk } from "redux-thunk";
import { devToolsEnhancer } from "redux-devtools-extension";
import { applyMiddleware, compose, createStore } from "redux";
import { UserReducer } from "./reducer/userReducer";

const composeEnhancers = compose(applyMiddleware(thunk), devToolsEnhancer());

export const store = createStore(UserReducer, composeEnhancers);
