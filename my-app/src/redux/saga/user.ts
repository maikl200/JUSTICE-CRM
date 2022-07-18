import {call, put, takeEvery} from "redux-saga/effects";
import axios from "axios";
import {UserActionEnum} from "../types/currentUser";
import Cookies from "js-cookie";
import {TypeUser} from "../../types/types";
import {setEditLoading, setUser} from "../action/user";

export function* fetchUsersWorker() {
  try {
    const {data} = yield call(axios.get, 'http://localhost:5100/profile/myProfile', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    })
    yield put(setUser(data))
  } catch (e) {
    console.error(e)
  }
}

export function* changeCurrentPasswordWorker(action: { payload: { validateError: (field: string, message: (string | undefined)) => void, valueOldPassword: string } }) {
  try {
    const {data} = yield call(axios.post, 'http://localhost:5100/profile/changePassword', {
      oldPassword: action.payload.valueOldPassword
    }, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    })
    if (!data) {
      action.payload.validateError('oldPassword', 'The password doesnt match')
    }
  } catch (e) {
    console.error(e)
  }
}

export function* changeProfileWorker(action: { payload: TypeUser }) {
  try {
    const {data} = yield call(axios.patch, 'http://localhost:5100/profile/changeProfile', {
      ...action.payload
    }, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    })
    yield put(setUser(data))
  } catch (e) {
    console.error(e)
  } finally {
    yield put(setEditLoading(false))
  }
}

export function* uploadAvatarWorker(action: { payload: File }) {
  try {
    const {data} = yield call(axios.post, 'http://localhost:5100/upload',
      {
        image: action.payload
      },
      {
        headers: {
          Authorization: `${Cookies.get("token")}`,
          'content-type': 'multipart/form-data'
        }
      })
    yield put(setUser(data))
  } catch (e) {
    console.error(e)
  }
}

export function* deleteAvatarWorker() {
  try {
    const {data} = yield call(axios.delete, 'http://localhost:5100/upload/deleteAvatar', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    })
    yield put(setUser(data))
  } catch (e) {
    console.error(e)
  }
}

export function* UserWatcher() {
  yield takeEvery(UserActionEnum.FETCH_USER, fetchUsersWorker)
  // @ts-ignore
  yield takeEvery(UserActionEnum.CHANGE_IS_VALID_PASSWORD, changeCurrentPasswordWorker)
  // @ts-ignore
  yield takeEvery(UserActionEnum.PROFILE_CHANGE, changeProfileWorker)
  // @ts-ignore
  yield takeEvery(UserActionEnum.UPLOAD_AVATAR, uploadAvatarWorker)
  yield takeEvery(UserActionEnum.DELETE_AVATAR, deleteAvatarWorker)
}