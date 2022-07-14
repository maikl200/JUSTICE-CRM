import {call, put, takeEvery} from "redux-saga/effects";
import axios from "axios";
import {RegError} from "../action/auth";
import {AuthActionEnum} from "../types/auth";
import {loggInUserWorker, regUserWorker} from "./auth";
import {UserActionEnum} from "../types/currentUser";

export function* fetchUsersWorker(data: any) {
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

export function* UserWatcher() {
  yield takeEvery(UserActionEnum.SET_USER, fetchUsersWorker)
}