import {TypeProduct} from "../../types/types";

export enum SellProductActionEnum {
  FETCH_SELL_PRODUCT = 'FETCH_SELL_PRODUCT',
  SET_SELL_PRODUCT = 'SET_SELL_PRODUCT'
}

export interface FetchSellProduct {
  type: SellProductActionEnum.FETCH_SELL_PRODUCT
  payload: TypeProduct[]
}

export interface SetSellProduct {
  type: SellProductActionEnum.SET_SELL_PRODUCT
  payload: TypeProduct[]
}

export type SellProductAction =
  FetchSellProduct
  | SetSellProduct