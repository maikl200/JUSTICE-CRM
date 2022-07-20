import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {TypeUser} from "../../types/types";
import Cookies from "js-cookie";

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

type Status = 'loading' | 'success' | 'error' | 'none'

type UserState = {
  user: TypeUser,
  status: Status
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    status: 'none',
  } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state: UserState) => {
      state.status = 'loading'
    })
    builder.addCase(fetchUsers.fulfilled, (state: UserState, action) => {
      state.status = 'success'
      state.user = action.payload
    })
    builder.addCase(fetchUsers.rejected, (state: UserState) => {
      state.status = 'error'
    })
    builder.addCase(changeCurrentPassword.pending, (state: UserState) => {
      state.status = 'loading'
    })
    builder.addCase(changeCurrentPassword.fulfilled, (state: UserState, action) => {
      state.status = 'success'
      state.user = {...state.user, isValidOldPassword: !!action.payload}
    })
    builder.addCase(changeCurrentPassword.rejected, (state: UserState, action) => {
      state.status = 'error'
      action.meta.arg.validateError('oldPassword', 'The password doesnt match')
    })
    builder.addCase(changeProfile.pending, (state: UserState) => {
      state.status = 'loading'
    })
    builder.addCase(changeProfile.fulfilled, (state: UserState, action) => {
      state.status = 'success'
      state.user = action.payload
    })
    builder.addCase(changeProfile.rejected, (state: UserState, action) => {
      state.status = 'error'
    })
    builder.addCase(uploadAvatar.pending, (state: UserState) => {
      state.status = 'loading'
    })
    builder.addCase(uploadAvatar.fulfilled, (state: UserState, action) => {
      state.status = 'success'
      state.user = action.payload
    })
    builder.addCase(uploadAvatar.rejected, (state: UserState) => {
      state.status = 'error'
    })
    builder.addCase(deleteAvatar.pending, (state: UserState) => {
      state.status = 'loading'
    })
    builder.addCase(deleteAvatar.fulfilled, (state: UserState, action) => {
      state.status = 'success'
      state.user = action.payload
    })
    builder.addCase(deleteAvatar.rejected, (state: UserState) => {
      state.status = 'error'
    })
  }
})

export default userSlice.reducer