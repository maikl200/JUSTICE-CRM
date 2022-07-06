import {Dispatch} from "react";
import axios from "axios";
import {AuthAction, AuthActionEnum} from "../types/auth";
import Cookies from "js-cookie";

export const regUser = (setShowError: any, navigate: any, action: AuthAction) => {
  return (dispatch: Dispatch<AuthAction>) => {
    axios.post('http://localhost:5100/auth/register', {
      ...action.payload
    }).then((res) => {
      dispatch({type: AuthActionEnum.REG_USER, payload: res.data})
      setShowError('')
      navigate('/signIn', {replace: true})
    }).catch((e) => {
      setShowError('Такой пользователь сущетсвует')
      console.error(e)
    })
  }
}

export const loginUser = (setShowError: any, navigate: any, action: AuthAction) => {
  return (dispatch: Dispatch<AuthAction>) => {
    axios.post('http://localhost:5100/auth/login', {
      ...action.payload
    }).then((res) => {
      dispatch({type: AuthActionEnum.LOGIN_USER, payload: res.data})
      setShowError('')
      Cookies.set('token', res.data.token)
      navigate('/mainPage', {replace: true})
    }).catch((e) => {
      setShowError('Пользователь не найден')
      console.error(e)
    })
  }
}