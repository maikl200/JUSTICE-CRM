import {call, put, takeEvery} from "redux-saga/effects";
import axios from "axios";
import Cookies from "js-cookie";
import {SellProductActionEnum} from "../types/sellProduct";
import {setSellProduct} from "../action/sellProducts";

export function* fetchSellProductWorker() {
  try {
    const {data} = yield call(axios.get, 'http://localhost:5100/sellProduct/mySellProduct', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    })
    yield put(setSellProduct(data))
  } catch (e) {
    console.error(e)
  }
}


export function* sellProductsWatcher() {
  yield takeEvery(SellProductActionEnum.FETCH_SELL_PRODUCT, fetchSellProductWorker)
}