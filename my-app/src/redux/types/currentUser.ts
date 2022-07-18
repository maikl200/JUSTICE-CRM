import {TypeUser} from "../../types/types";

export enum UserActionEnum {
  SET_EDIT_LOAD = 'SET_EDIT_LOAD',
  FETCH_USER = 'FETCH_USER',
  SET_USER = 'SET_USER',
  CHANGE_IS_VALID_PASSWORD = 'CHANGE_IS_VALID_PASSWORD',
  PROFILE_CHANGE = 'PROFILE_CHANGE',
  UPLOAD_AVATAR = 'UPLOAD_AVATAR',
  DELETE_AVATAR = 'DELETE_AVATAR',
}

export interface SetUser {
  type: UserActionEnum.SET_USER
  payload: TypeUser
}

export interface SetEditLoad {
  type: UserActionEnum.SET_EDIT_LOAD
  payload: boolean
}

export interface FetchUser {
  type: UserActionEnum.FETCH_USER
  payload: TypeUser
}

export interface ChangePassword {
  type: UserActionEnum.CHANGE_IS_VALID_PASSWORD
  payload: string
}

export interface ProfileChange {
  type: UserActionEnum.PROFILE_CHANGE
  payload: TypeUser
}

export interface UploadAvatar {
  type: UserActionEnum.UPLOAD_AVATAR
  payload: TypeUser
}

export interface DeleteAvatar {
  type: UserActionEnum.DELETE_AVATAR
  payload: TypeUser
}

export type UserAction =
  FetchUser
  | ChangePassword
  | ProfileChange
  | UploadAvatar
  | DeleteAvatar
  | SetUser
  | SetEditLoad