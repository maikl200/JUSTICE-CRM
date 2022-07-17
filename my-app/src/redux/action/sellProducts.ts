import {SellProductActionEnum} from "../types/sellProduct";
import {TypeProduct} from "../../types/types";


export const fetchSellProduct = () => {
  return {
    type: SellProductActionEnum.FETCH_SELL_PRODUCT
  }
}

export const setSellProduct = (payload: TypeProduct) => {
  return {
    type: SellProductActionEnum.SET_SELL_PRODUCT,
    payload
  }
}