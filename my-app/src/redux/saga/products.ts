import {call, takeEvery, put} from "redux-saga/effects";
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

export function* addProductWorker(action: { payload: { close: () => void, data: TypeProduct } }) {
  try {
    const {data} = yield call(axios.post, 'http://localhost:5100/product/addProduct', {
      ...action.payload.data
    }, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    })
    action.payload.close()
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

export function* editProductWorker(action: { payload: { close: () => void, data: TypeProduct, editId: string } }) {
  try {
    const {data} = yield call(axios.patch, 'http://localhost:5100/product/editProduct',
      {
        ...action.payload.data
      }, {
        headers: {
          Authorization: `${Cookies.get("token")}`,
        },
        params: {
          id: action.payload.editId
        }
      })
    action.payload.close()
    yield put(setProducts(data))
  } catch (e) {
    console.error(e)
  }
}

export function* sellProductWorker(action: { payload: { close: () => void, newProduct: TypeProduct, sellId: string } }) {
  try {
    const {data} = yield call(axios.post, 'http://localhost:5100/sellProduct/sellProduct', {
      ...action.payload.newProduct
    }, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
      params: {
        id: action.payload.sellId
      }
    })
    action.payload.close()
    yield put(setProducts(data))
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
  // @ts-ignore
  yield takeEvery(ProductActionEnum.EDIT_PRODUCT, editProductWorker)
  // @ts-ignore
  yield takeEvery(ProductActionEnum.SELL_PRODUCT, sellProductWorker)
}