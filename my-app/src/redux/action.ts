import {GET_PRODUCT} from "./actionTypes";
import {typeProduct} from "../types/types";

export type GetProduct = {
  type: typeof GET_PRODUCT,
  payload: typeProduct[]
}

export const getProduct = (payload: typeProduct[]) => ({
  type: GET_PRODUCT,
  payload
})