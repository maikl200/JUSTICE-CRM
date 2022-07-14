import {TypeUser} from "../../types/types";
import {AuthActionEnum} from "../types/auth";
import {NavigateFunction} from "react-router-dom";

export const regUser = (payload: TypeUser) => {
  return {
    type: AuthActionEnum.REG_USER,
    payload
  }
}

export const logInUser = (payload: TypeUser) => {
  return {
    type: AuthActionEnum.LOGIN_USER,
    payload
  }
}

export const RegError = (payload: boolean) => {
  return {
    type: AuthActionEnum.REG_ERROR,
    payload
  }
}

export const LogInError = (payload: boolean) => {
  return {
    type: AuthActionEnum.LOG_IN_ERROR,
    payload
  }
}