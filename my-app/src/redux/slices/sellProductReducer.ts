import {TypeProduct} from "../../types/types";
import {SellProductAction, SellProductActionEnum} from "../types/sellProduct";

const initialState: TypeProduct[] = []

export const sellProductReducer = (state = initialState, action: SellProductAction): TypeProduct[] => {
  switch (action.type) {
    case SellProductActionEnum.FETCH_SELL_PRODUCT:
      return state
    case SellProductActionEnum.SET_SELL_PRODUCT:
      return action.payload
    default:
      return state
  }
}
