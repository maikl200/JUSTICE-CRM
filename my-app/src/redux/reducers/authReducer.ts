import {TypeUser} from "../../types/types";
import {AuthAction, AuthActionEnum} from "../types/auth";

const initialState: TypeUser = {}

export const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionEnum.REG_USER:
      return action.payload
    case AuthActionEnum.LOGIN_USER:
      return action.payload
    case AuthActionEnum.REG_ERROR:
      return {
        ...state, RegError: action.payload
      }
    case AuthActionEnum.LOG_IN_ERROR:
      return {
        ...state, LogInError: action.payload
      }
    default:
      return state
  }
}