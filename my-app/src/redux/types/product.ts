import {TypeProduct} from "../../types/types";

export enum ProductActionEnum {
  FETCH_PRODUCT = 'FETCH_PRODUCT',
  SET_PRODUCT = 'SET_PRODUCT',
  ADD_PRODUCT = 'ADD_PRODUCT',
  ADD_ASYNC_PRODUCT = 'ADD_ASYNC_PRODUCT',
  SELL_PRODUCT = 'SELL_PRODUCT',
  EDIT_PRODUCT = 'EDIT_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  FETCH_SELL_PRODUCT = 'FETCH_SELL_PRODUCT',
  DELETE_ASYNC_PRODUCT = 'DELETE_ASYNC_PRODUCT'

}

export interface FetchProduct {
  type: ProductActionEnum.FETCH_PRODUCT
  payload: TypeProduct[]
}

export interface SetProduct {
  type: ProductActionEnum.SET_PRODUCT
  payload: TypeProduct[]
}

export interface AddProduct {
  type: ProductActionEnum.ADD_PRODUCT
  payload: TypeProduct
}

export interface SellProduct {
  type: ProductActionEnum.SELL_PRODUCT
  payload: TypeProduct[]
}

export interface EditProduct {
  type: ProductActionEnum.EDIT_PRODUCT
  payload: TypeProduct[]
}

export interface DeleteProduct {
  type: ProductActionEnum.DELETE_PRODUCT
  payload: string
}

export type ProductAction =
  FetchProduct
  | AddProduct
  | SellProduct
  | EditProduct
  | DeleteProduct
  | SetProduct

