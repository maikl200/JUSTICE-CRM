import {TypeUser} from "../../types/types";

export enum AuthActionEnum {
  LOG_IN_ERROR = 'LOG_IN_ERROR',
  REG_USER = 'REG_USER',
  LOGIN_USER = 'LOGIN_USER',
  REG_ERROR = 'REG_ERROR'
}

export interface RegUser {
  type: AuthActionEnum.REG_USER
  payload: TypeUser
}

export interface LoginUser {
  type: AuthActionEnum.LOGIN_USER
  payload: TypeUser
}

export interface RegError {
  type: AuthActionEnum.REG_ERROR
  payload: boolean
}

export interface LogInError {
  type: AuthActionEnum.LOG_IN_ERROR
  payload: boolean
}

export type AuthAction = RegUser | LoginUser | RegError | LogInError