import {TypeUser} from "../../types/types";

export enum UserActionEnum {
  SET_USER = 'SET_USER',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
}

export interface SetUser {
  type: UserActionEnum.SET_USER
  payload: TypeUser
}

export interface changePassword {
  type: UserActionEnum.CHANGE_PASSWORD
  payload: string
}


export type UserAction = SetUser | changePassword