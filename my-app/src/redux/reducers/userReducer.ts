import {TypeUser} from "../../types/types";
import {UserActionEnum} from "../types/currentUser";
import {UserAction} from "../types/currentUser";

const initialState = {} as TypeUser

export const userReducer = (state = initialState, action: UserAction): TypeUser => {
  switch (action.type) {
    case UserActionEnum.SET_USER:
      return {
        ...state, ...action.payload
      }
    case UserActionEnum.CHANGE_PASSWORD:
      return {
        ...state, oldPassword: action.payload
      }
    default:
      return state
  }
}
