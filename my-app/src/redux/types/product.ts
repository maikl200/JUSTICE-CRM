import {TypeProduct} from "../../types/types";

export enum ProductActionTypes {
  SET_PRODUCT = 'SET_PRODUCT'
}

export interface SetProduct {
  type: ProductActionTypes.SET_PRODUCT
  payload: TypeProduct[]
}

export type ProductAction = SetProduct