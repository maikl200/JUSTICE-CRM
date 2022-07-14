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
