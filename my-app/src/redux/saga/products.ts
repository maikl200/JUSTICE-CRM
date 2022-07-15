import {call, takeEvery, put, select} from "redux-saga/effects";
import axios from "axios";
import {ProductActionEnum} from "../types/product";
import Cookies from "js-cookie";
import {addProduct, deleteProduct, setProducts} from "../action/products";
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
      ...product.payload
    }, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    })
    yield put(addProduct(data))
  } catch (e) {
    console.error(e)
  }
}

export function* deleteProductWorker(payload: { id: string, type: string }) {
  try {
    const {data} = yield call(
      axios.delete, `http://localhost:5100/product/deleteProduct`, {
        headers: {
          Authorization: `${Cookies.get("token")}`,
        },
        params: {
          id: payload.id
        }
      }
    )
    yield put(deleteProduct(data._id))
  } catch (e) {
    console.error(e)
  }
}

export function* ProductsWatcher() {
  yield takeEvery(ProductActionEnum.FETCH_PRODUCT, FetchProductsWorker)
  // @ts-ignore
  yield takeEvery(ProductActionEnum.ADD_ASYNC_PRODUCT, addProductWorker)
  // @ts-ignore
  yield takeEvery(ProductActionEnum.DELETE_ASYNC_PRODUCT, deleteProductWorker)
}