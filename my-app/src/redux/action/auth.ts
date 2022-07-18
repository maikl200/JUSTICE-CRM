import {TypeUser} from "../../types/types";
import {AuthActionEnum} from "../types/auth";
import {NavigateFunction} from "react-router-dom";
import {Dispatch, SetStateAction} from "react";

export const regUser = (payload: { navigate: Dispatch<string>, setShowError: Dispatch<SetStateAction<string>>, data: TypeUser }) => {
  return {
    type: AuthActionEnum.REG_USER,
    payload
  }
}

export const logInUser = (payload: { navigate: Dispatch<string>, setShowError: Dispatch<SetStateAction<string>>, data: TypeUser }) => {
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