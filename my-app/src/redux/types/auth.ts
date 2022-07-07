import {TypeUser} from "../../types/types";

export enum AuthActionEnum {
  REG_USER = 'REG_USER',
  LOGIN_USER = 'LOGIN_USER'
}

export interface RegUser {
  type: AuthActionEnum.REG_USER
  payload: TypeUser
}

export interface LoginUser {
  type: AuthActionEnum.LOGIN_USER
  payload: TypeUser
}

export type AuthAction = RegUser | LoginUser