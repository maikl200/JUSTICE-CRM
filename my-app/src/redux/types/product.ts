import {TypeProduct} from "../../types/types";

export enum ProductActionEnum {
  FETCH_PRODUCT = 'FETCH_PRODUCT',
  SET_PRODUCT = 'SET_PRODUCT',
  ADD_PRODUCT = 'ADD_PRODUCT',
  SELL_PRODUCT = 'SELL_PRODUCT',
  EDIT_PRODUCT = 'EDIT_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT'
}

export interface FetchProduct {
  type: ProductActionEnum.FETCH_PRODUCT
  payload: TypeProduct[]
}

export interface setProduct {
  type: ProductActionEnum.SET_PRODUCT
  payload: TypeProduct[]
}

export interface AddProduct {
  type: ProductActionEnum.ADD_PRODUCT
  payload: TypeProduct[]
}

export interface sellProduct {
  type: ProductActionEnum.SELL_PRODUCT
  payload: TypeProduct[]
}

export interface editProduct {
  type: ProductActionEnum.EDIT_PRODUCT
  payload: TypeProduct[]
}

export interface deleteProduct {
  type: ProductActionEnum.DELETE_PRODUCT
  payload: TypeProduct[]
}

export type ProductAction = FetchProduct | AddProduct | sellProduct | editProduct | deleteProduct | setProduct