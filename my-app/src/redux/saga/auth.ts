import {takeEvery, call, put} from 'redux-saga/effects'
import {AuthActionEnum} from "../types/auth";
import axios from "axios";
import {LogInError, RegError} from "../action/auth";
import Cookies from "js-cookie";
import {TypeUser} from "../../types/types";
import {Dispatch, SetStateAction} from "react";

export function* regUserWorker(action: { payload: { navigate: Dispatch<string>, setShowError: Dispatch<SetStateAction<string>>, data: TypeUser } }) {
  try {
    yield call(axios.post, ('http://localhost:5100/auth/register'), {
      firstName: action.payload?.data.firstName,
      lastName: action.payload?.data.lastName,
      companyName: action.payload?.data.companyName,
      email: action.payload?.data.email,
      password: action.payload?.data.password,
      repeatPassword: action.payload?.data.repeatPassword
    })

    action.payload.setShowError('')
    action.payload.navigate('/sigIn')
  } catch (e) {
    action.payload.setShowError('Such a user exists')
  }
}


export function* loggInUserWorker(action: { payload: { navigate: Dispatch<string>, setShowError: Dispatch<SetStateAction<string>>, data: TypeUser } }) {
  try {
    const {data} = yield call(axios.post, ('http://localhost:5100/auth/login'), {
      email: action.payload?.data.email,
      password: action.payload?.data.password,
    })
    Cookies.set("token", data.token)
    action.payload.setShowError('')
    action.payload.navigate('/mainPage')
  } catch (e) {
    action.payload.setShowError('User not found')
  }
}

export function* regUserWatcher() {
  // @ts-ignore
  yield takeEvery(AuthActionEnum.REG_USER, regUserWorker)
  // @ts-ignore
  yield takeEvery(AuthActionEnum.LOGIN_USER, loggInUserWorker)
}