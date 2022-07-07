import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productReducer} from "./reducers/productReducer";
import {sellProductReducer} from "./reducers/sellProductReducer";
import {authReducer} from "./reducers/authReducer";
import {userReducer} from "./reducers/userReducer";

const rootReducer = combineReducers(
  {
    product: productReducer,
    sellProduct: sellProductReducer,
    user: userReducer,
    auth: authReducer
  })


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof rootReducer>
