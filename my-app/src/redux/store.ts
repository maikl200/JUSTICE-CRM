import {createStore, applyMiddleware} from "redux";
import {combineReducers} from "redux";
import {getProduct} from './reducers/getProductReducer'
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({getProduct})

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))