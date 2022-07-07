import {TypeUser} from "../../types/types";

export enum UserActionEnum {
  SET_USER = 'SET_USER',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  PROFILE_CHANGE = 'PROFILE_CHANGE',
  UPLOAD_AVATAR = 'UPLOAD_AVATAR',
  DELETE_AVATAR = 'DELETE_AVATAR',
}

export interface SetUser {
  type: UserActionEnum.SET_USER
  payload: TypeUser
}

export interface changePassword {
  type: UserActionEnum.CHANGE_PASSWORD
  payload: string
}

export interface profileChange {
  type: UserActionEnum.PROFILE_CHANGE
  payload: TypeUser
}

export interface uploadAvatar {
  type: UserActionEnum.UPLOAD_AVATAR
  payload: TypeUser
}

export interface deleteAvatar {
  type: UserActionEnum.DELETE_AVATAR
  payload: TypeUser
}

export type UserAction = SetUser | changePassword | profileChange | uploadAvatar | deleteAvatar