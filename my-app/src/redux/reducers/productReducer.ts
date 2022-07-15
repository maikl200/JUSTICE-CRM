import {ProductAction, ProductActionEnum} from '../types/product'
import {TypeProduct} from "../../types/types";

const initialState = [] as TypeProduct[]

export const productReducer = (state = initialState, action: ProductAction): TypeProduct[] => {
  switch (action.type) {
    case ProductActionEnum.SET_PRODUCT:
      return action.payload
    case ProductActionEnum.FETCH_PRODUCT:
      return state
    case ProductActionEnum.ADD_PRODUCT:
      return [...state, action.payload]
    case ProductActionEnum.SELL_PRODUCT:
    case ProductActionEnum.EDIT_PRODUCT:
    case ProductActionEnum.DELETE_PRODUCT:
      return state.filter(obj => obj._id !== action.payload)

    default:
      return state
  }
}
