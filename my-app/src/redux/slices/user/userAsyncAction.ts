import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import {TypeUser} from "../../../types/types";

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

export const changeProfile = createAsyncThunk(
  'user/changeProfile',
  async function (payload: { clearPasswordFields: (nextState: string) => void, validateError: (field: string, message: (string | undefined)) => void, data: TypeUser }) {
    try {
      const {data} = await axios.patch('http://localhost:5100/profile/changeProfile', {
        ...payload.data
      }, {
        headers: {
          Authorization: `${Cookies.get("token")}`
        }
      })
      if (data.isPasswordUpdate) {

        payload.clearPasswordFields(data)
      }
      return data
    } catch (e) {
      console.error(e)
    }
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