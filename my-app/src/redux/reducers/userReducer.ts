import {TypeUser} from "../../types/types";
import {UserAction, UserActionEnum} from "../types/currentUser";

const initialState = {} as TypeUser

export const userReducer = (state = initialState, action: UserAction): TypeUser => {
  switch (action.type) {
    case UserActionEnum.FETCH_USER:
      return {
        ...state, ...action.payload
      }
    case UserActionEnum.CHANGE_IS_VALID_PASSWORD:
      return {
        ...state, isValidOldPassword: !!action.payload
      }
    case UserActionEnum.SET_USER:
      return action.payload
    case UserActionEnum.PROFILE_CHANGE:
      return {
        ...state, ...action.payload
      }
    case UserActionEnum.UPLOAD_AVATAR:
      return {
        ...state, ...action.payload
      }
    case UserActionEnum.DELETE_AVATAR:
      return {
        ...state, ...action.payload
      }
    default:
      return state
  }
}
