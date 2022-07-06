import {ProductAction, ProductActionEnum} from '../types/product'
import {TypeProduct} from "../../types/types";

const initialState: TypeProduct[] = []

export const productReducer = (state = initialState, action: ProductAction): TypeProduct[] => {
  switch (action.type) {
    case ProductActionEnum.SET_PRODUCT:
      return action.payload
    case ProductActionEnum.ADD_PRODUCT:
      return [...state, action.payload]
    case ProductActionEnum.SELL_PRODUCT:
    case ProductActionEnum.EDIT_PRODUCT:
    case ProductActionEnum.DELETE_PRODUCT:
      return action.payload
    default:
      return state
  }
}
