import {call, takeEvery, put} from "redux-saga/effects";
import axios from "axios";
import {ProductActionEnum} from "../types/product";
import Cookies from "js-cookie";
import {setProducts} from "../action/products";
import {TypeProduct} from "../../types/types";

export function* FetchProductsWorker() {
  try {
    const {data} = yield call(axios.get, 'http://localhost:5100/product/myProducts', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    })
    yield put(setProducts(data))
  } catch (e) {
    console.error(e)
  }
}

export function* addProductWorker(product: { payload: TypeProduct }) {
  try {
    const {data} = yield call(axios.post, 'http://localhost:5100/product/addProduct', {
      store: product?.payload,
      price: product?.payload,
      productName: product?.payload,
      productCategory: product?.payload,
      quantityGoods: product?.payload,
      weightVolumeOneItem: product?.payload
    }, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    })
    console.log(data)
    yield put(setProducts(data))
  } catch (e) {
    console.error(e)
  }
}

export function* ProductsWatcher() {
  yield takeEvery(ProductActionEnum.FETCH_PRODUCT, FetchProductsWorker)
  // @ts-ignore
  yield takeEvery(ProductActionEnum.ADD_PRODUCT, addProductWorker)
}