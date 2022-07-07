import {TypeUser} from "../../types/types";
import {AuthAction, AuthActionEnum} from "../types/auth";

const initialState: TypeUser = {}

export const authReducer = (state = initialState, action: AuthAction): TypeUser => {
  switch (action.type) {
    case AuthActionEnum.REG_USER:
      return action.payload
    case AuthActionEnum.LOGIN_USER:
      return action.payload
    default:
      return state
  }
}
