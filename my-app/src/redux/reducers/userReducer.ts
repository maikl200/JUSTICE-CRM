import {TypeUser} from "../../types/types";
import {UserAction, UserActionEnum} from "../types/currentUser";

type State = {
  user: TypeUser;
  isEditLoading: boolean;
}

const initialState: State = {
  user: {},
  isEditLoading: false
}

export const userReducer = (state = initialState, action: UserAction): State => {
  switch (action.type) {
    case UserActionEnum.FETCH_USER:
      return {
        ...state, ...action.payload
      }
    case UserActionEnum.CHANGE_IS_VALID_PASSWORD:
      return {
        ...state, user: {
          ...state.user,
          isValidOldPassword: !!action.payload
        }
      }
    case UserActionEnum.SET_EDIT_LOAD:
      return {
        ...state, isEditLoading: action.payload
      }
    case UserActionEnum.SET_USER:
      return {
        ...state,
        user: action.payload,
      }
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
