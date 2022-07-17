import {TypeUser} from "../../types/types";
import {UserActionEnum} from "../types/currentUser";

export const fetchUsers = () => {
  return {
    type: UserActionEnum.FETCH_USER
  }
}

export const setUser = (payload: TypeUser) => {
  return {
    type: UserActionEnum.SET_USER,
    payload
  }
}

export const changeProfile = (payload: TypeUser) => {
  return {
    type: UserActionEnum.PROFILE_CHANGE,
    payload
  }
}

export const changeCurrentPassword = (payload: { validateError: (field: string, message: (string | undefined)) => void, valueOldPassword: string }) => {
  return {
    type: UserActionEnum.CHANGE_IS_VALID_PASSWORD,
    payload
  }
}

export const uploadAvatar = (payload: { image: File }) => {
  return {
    type: UserActionEnum.UPLOAD_AVATAR,
    payload
  }
}

export const deleteAvatar = () => {
  return {
    type: UserActionEnum.DELETE_AVATAR,
  }
}

