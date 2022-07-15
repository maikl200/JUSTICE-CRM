import {TypeProduct} from "../../types/types";
import {ProductAction, ProductActionEnum} from "../types/product";

export const fetchProducts = () => {
  return {
    type: ProductActionEnum.FETCH_PRODUCT,
  }
}

export const setProducts = (payload: TypeProduct) => {
  return {
    type: ProductActionEnum.SET_PRODUCT,
    payload
  }
}

export const addProduct = (payload: TypeProduct) => {
  return {
    type: ProductActionEnum.ADD_PRODUCT,
    payload
  }
}

export const deleteProduct = (payload: string) => {
  return {
    type: ProductActionEnum.DELETE_PRODUCT,
    payload
  }
}

export const deleteProductSaga = (id: string) => {
  return {
    type: ProductActionEnum.DELETE_ASYNC_PRODUCT,
    id
  }
}

export const addProductSaga = (payload: TypeProduct) => {
  return {
    type: ProductActionEnum.ADD_ASYNC_PRODUCT,
    payload
  }
}
