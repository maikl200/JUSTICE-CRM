import {ProductAction, ProductActionTypes} from '../types/product'
import {TypeProduct} from "../../types/types";

const initialState: TypeProduct[] = []

export const productReducer = (state = initialState, action: ProductAction): TypeProduct[] => {
  switch (action.type) {
    case ProductActionTypes.SET_PRODUCT:
      return action.payload
    default:
      return state
  }
}