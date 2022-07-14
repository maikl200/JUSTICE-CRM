import {takeEvery, call, put} from 'redux-saga/effects'
import {AuthActionEnum} from "../types/auth";
import axios from "axios";
import {LogInError, RegError} from "../action/auth";
import Cookies from "js-cookie";

export function* regUserWorker(data: any) {
  try {
    yield call(axios.post, ('http://localhost:5100/auth/register'), {
      firstName: data.payload?.firstName,
      lastName: data.payload?.lastName,
      companyName: data.payload?.companyName,
      email: data.payload?.email,
      password: data.payload?.password,
      repeatPassword: data.payload?.repeatPassword
    })

    yield put(RegError(false))
  } catch (e) {
    yield put(RegError(true))
  }
}


export function* loggInUserWorker(user: any) {
  try {
    const {data} = yield call(axios.post, ('http://localhost:5100/auth/login'), {
      email: user.payload?.email,
      password: user.payload?.password,
    })
    Cookies.set("token", data.token)
    console.log(LogInError(false))
    yield put(LogInError(false))
  } catch (e) {
    yield put(LogInError(true))
  }
}

export function* regUserWatcher() {
  yield takeEvery(AuthActionEnum.REG_USER, regUserWorker)
  yield takeEvery(AuthActionEnum.LOGIN_USER, loggInUserWorker)
}