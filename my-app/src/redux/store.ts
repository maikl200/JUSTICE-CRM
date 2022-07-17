import {createStore, applyMiddleware, combineReducers} from 'redux'
import {all} from 'redux-saga/effects'
import {composeWithDevTools} from "redux-devtools-extension";
import {productReducer} from "./reducers/productReducer";
import {sellProductReducer} from "./reducers/sellProductReducer";
import {authReducer} from "./reducers/authReducer";
import {userReducer} from "./reducers/userReducer";
import createSagaMiddleware from 'redux-saga'
import {regUserWatcher} from "./saga/auth";
import {UserWatcher} from "./saga/user";
import {ProductsWatcher} from "./saga/products";
import {sellProductsWatcher} from "./saga/sellProducts";

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers(
  {
    product: productReducer,
    sellProduct: sellProductReducer,
    user: userReducer,
    auth: authReducer
  })

export default function* rootSaga() {
  yield all(
    [
      regUserWatcher(),
      UserWatcher(),
      ProductsWatcher(),
      sellProductsWatcher()
    ])
}


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

export type RootState = ReturnType<typeof rootReducer>
sagaMiddleware.run(rootSaga)
