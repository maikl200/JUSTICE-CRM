import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from "redux-thunk";
import {productReducer} from "./reducers/productReducer";

const rootReducer = combineReducers({productReducer})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch