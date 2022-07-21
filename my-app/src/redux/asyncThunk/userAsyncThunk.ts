import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import {TypeUser} from "../../types/types";

export const fetchUsers = createAsyncThunk(
  'user/fetchUser',
  async function () {
    const {data} = await axios.get('http://localhost:5100/profile/myProfile', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    })
    return data
  }
)

export const changeCurrentPassword = createAsyncThunk(
  'user/changeCurrentPassword',
  async function (payload: { validateError: (field: string, message: (string | undefined)) => void, valueOldPassword: string }) {
    const {data} = await axios.post('http://localhost:5100/profile/changePassword', {
      oldPassword: payload.valueOldPassword
    }, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    })
    if (!data) throw new Error('Password not found')
    return data
  }
)

export const changeProfile = createAsyncThunk(
  'user/changeProfile',
  async function (payload: { data: TypeUser }) {
    const {data} = await axios.patch('http://localhost:5100/profile/changeProfile', {
      ...payload.data
    }, {
      headers: {
        Authorization: `${Cookies.get("token")}`
      }
    })
    return data
  }
)

export const uploadAvatar = createAsyncThunk(
  'user/uploadAvatar',
  async function (payload: File) {
    const {data} = await axios.post('http://localhost:5100/upload', {
      image: payload
    }, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
        'content-type': 'multipart/form-data'
      }
    })
    return data
  }
)

export const deleteAvatar = createAsyncThunk(
  'user/deleteAvatar',
  async function () {
    const {data} = await axios.delete('http://localhost:5100/upload/deleteAvatar', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    })
    return data
  }
)