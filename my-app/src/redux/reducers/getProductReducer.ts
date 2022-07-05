import {GET_PRODUCT} from '../actionTypes'
import {typeProduct, TypesAction} from "../../types/types";

const defaultState: typeProduct[] = []

export const getProduct = (state = defaultState, action: TypesAction) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.payload
    default:
      return state
  }
}