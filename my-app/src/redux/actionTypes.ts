import {typeProduct, typeUser} from "../types/types";

export const GET_PRODUCT = 'GET_PRODUCT'
export const GET_SELL_PRODUCT = 'GET_SELL_PRODUCT'
export const GET_USER = 'GET_USER'

export type ActionTypes = ActionMapTypes[keyof ActionMapTypes];

export type ActionMapTypes = {
  [GET_PRODUCT]: {
    type: typeof GET_PRODUCT
    payload: typeProduct[]
  }
  [GET_SELL_PRODUCT]: {
    type: typeof GET_SELL_PRODUCT
    payload: typeProduct[]
  }
  [GET_USER]: {
    type: typeof GET_USER
    payload: typeUser[]
  }
}