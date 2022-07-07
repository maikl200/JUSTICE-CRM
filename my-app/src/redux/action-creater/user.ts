import {Dispatch, SetStateAction} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {TypeUser} from "../../types/types";
import {UserAction, UserActionEnum} from "../types/currentUser";

export const fetchUsers = () => {
  return (dispatch: Dispatch<UserAction>) => {
    axios.get<TypeUser[]>('http://localhost:5100/profile/myProfile', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    }).then((res) => {
      const currentProfile = res.data.find(user => user)
      dispatch({type: UserActionEnum.SET_USER, payload: currentProfile!})
    }).catch((e) => {
      console.error(e)
    })
  }
}

export const changeCurrentPassword = (setCurrentPassword: Dispatch<SetStateAction<boolean>>, setErrorOldPassword: Dispatch<SetStateAction<string>>, action: { payload: string }) => {
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

export const changeProfile = (action: { payload: TypeUser }) => {
  return (dispatch: Dispatch<UserAction>) => {
    axios.patch('http://localhost:5100/profile/changeProfile', {
      ...action.payload
    }, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    })
      .then((res) => {
        dispatch({type: UserActionEnum.PROFILE_CHANGE, payload: res.data})
      }).catch((e) => {
      console.error(e)
    })
  }
}

export const uploadAvatar = (action: { payload: File }) => {
  return (dispatch: Dispatch<UserAction>) => {
    axios.post('http://localhost:5100/upload',
      {
        image: action.payload
      },
      {
        headers: {
          Authorization: `${Cookies.get("token")}`,
          'content-type': 'multipart/form-data'
        }
      })
      .then(res => {
        dispatch({type: UserActionEnum.UPLOAD_AVATAR, payload: res.data})
      }).catch(e => {
      console.error(e)
    })
  }
}

export const deleteAvatar = () => {
  return (dispatch: Dispatch<UserAction>) => {
    axios.delete('http://localhost:5100/upload/deleteAvatar', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    })
      .then((res) => {
        dispatch({type: UserActionEnum.DELETE_AVATAR, payload: res.data})
      })
      .catch((e) => {
        console.error(e)
      })
  }
}