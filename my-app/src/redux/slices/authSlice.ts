import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {TypeUser} from "../../types/types";
import Cookies from "js-cookie";

export const regUser = createAsyncThunk(
  'auth/regUser',
  async function (user: TypeUser) {
    const {data} = await axios.post('http://localhost:5100/auth/register', user)
    return data
  }
)

export const logInUser = createAsyncThunk(
  'auth/logInUser',
  async function (user: TypeUser) {
    const {data} = await axios.post('http://localhost:5100/auth/login', user)
    Cookies.set("token", data.token)
    return data
  }
)

type Status = 'loading' | 'success' | 'error' | 'none'

type AuthState = {
  user: TypeUser,
  statusReg: Status
  statusLogIn: Status
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    statusReg: 'none',
    statusLogIn: 'none'
  } as AuthState,
  reducers: {
    setStatus(state, action) {
      state.statusReg = action.payload as Status
      state.statusLogIn = action.payload as Status
    }
  },
  extraReducers: (builder) => {
    builder.addCase(regUser.pending, (state: AuthState) => {
      state.statusReg = 'loading'
    })
    builder.addCase(regUser.fulfilled, (state: AuthState, action) => {
      state.statusReg = 'success'
      state.user = action.payload
    })
    builder.addCase(regUser.rejected, (state: AuthState) => {
      state.statusReg = 'error'
    })
    builder.addCase(logInUser.pending, (state: AuthState) => {
      state.statusLogIn = 'loading'
    })
    builder.addCase(logInUser.fulfilled, (state: AuthState, action) => {
      state.statusLogIn = 'success'
      state.user = action.payload
    })
    builder.addCase(logInUser.rejected, (state: AuthState) => {
      state.statusLogIn = 'error'
    })
  }
})

export const {setStatus} = authSlice.actions

export default authSlice.reducer