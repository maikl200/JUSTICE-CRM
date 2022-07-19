import {createStore, applyMiddleware, combineReducers} from 'redux'
import {all} from 'redux-saga/effects'
import {composeWithDevTools} from "redux-devtools-extension";
import product from "./slices/productSlice";
import {sellProductReducer} from "./slices/sellProductReducer";
import auth from "./slices/authSlice";
import {userReducer} from "./slices/userReducer";
import createSagaMiddleware from 'redux-saga'
import {regUserWatcher} from "./saga/auth";
import {UserWatcher} from "./saga/user";
import {ProductsWatcher} from "./saga/products";
import {sellProductsWatcher} from "./saga/sellProducts";
import {modalWindowReducer} from "./slices/modalWindow";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

export const store = configureStore({
  reducer: {
    product,
    auth
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

const sagaMiddleware = createSagaMiddleware()

// const rootReducer = combineReducers(
//   {
//     // product: productReducer,
//     sellProduct: sellProductReducer,
//     user: userReducer,
//     auth: authSlice,
//     modalWindow: modalWindowReducer
//   })
//
// export default function* rootSaga() {
//   yield all(
//     [
//       regUserWatcher(),
//       UserWatcher(),
//       ProductsWatcher(),
//       sellProductsWatcher()
//     ])
// }
//
//
// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))
//

// sagaMiddleware.run(rootSaga)
