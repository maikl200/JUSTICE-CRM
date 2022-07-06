import {TypeProduct} from "../../types/types";

export enum SellProductActionEnum {
  SET_SELL_PRODUCT = 'SET_SELL_PRODUCT',
}

export interface SetSellProduct {
  type: SellProductActionEnum.SET_SELL_PRODUCT
  payload: TypeProduct[]
}

export type SellProductAction = SetSellProduct