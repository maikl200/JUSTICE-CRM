import {Dispatch} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {TypeUser} from "../../types/types";
import {UserAction, UserActionEnum} from "../types/currentUser";

export const fetchUsers = (setFormEdit: any) => {
  return (dispatch: Dispatch<UserAction>) => {
    axios.get<TypeUser[]>('http://localhost:5100/profile/myProfile', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    }).then((res) => {
      const currentProfile = res.data.find((user: TypeUser) => user)
      setFormEdit(currentProfile)
      // @ts-ignore
      dispatch({type: UserActionEnum.SET_USER, payload: currentProfile})
    }).catch((e) => {
      console.error(e)
    })
  }
}

export const changeCurrentPassword = (setCurrentPassword: any, setErrorOldPassword: any, action: any) => {
  return (dispatch: Dispatch<UserAction>) => {
    axios.post('http://localhost:5100/profile/changePassword', {
      oldPassword: action.payload
    }, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    })
      .then((res) => {
        dispatch({type: UserActionEnum.CHANGE_PASSWORD, payload: res.data})
        setErrorOldPassword('')
        setCurrentPassword(true)
      }).catch(() => {
      setErrorOldPassword('invalid password')
      setCurrentPassword(false)
    })
  }
}