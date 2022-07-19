import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {TypeUser} from "../../types/types";

export const regUser = createAsyncThunk(
  'auth/regUser',
  async function (data: TypeUser) {
    const response = axios.post('http://localhost:5100/auth/register', data)
    return response
  }
)

export const logInUser = createAsyncThunk(
  'auth/logInUser',
  async function (data: TypeUser) {
    const response = axios.post('http://localhost:5100/auth/login', data)
    return response
  }
)

type Status = 'loading' | 'success' | 'error' | 'none'

type AuthState = {
  user: TypeUser,
  status: Status
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    status: 'none'
  } as AuthState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload as Status
    }
  },
  extraReducers: {
    // @ts-ignore
    [regUser.pending]: (state: AuthState) => {
      state.status = 'loading'
    },
    // @ts-ignore
    [regUser.fulfilled]: (state: AuthState, action) => {
      state.status = 'success'
      state.user = action.payload
    },
    // @ts-ignore
    [regUser.rejected]: (state: AuthState) => {
      state.status = 'error'
    },
    // @ts-ignore
    [logInUser.pending]: (state: AuthState) => {
      state.status = 'loading'
    },
    // @ts-ignore
    [logInUser.fulfilled]: (state: AuthState, action) => {
      state.status = 'success'
      state.user = action.payload
    },
    // @ts-ignore
    [logInUser.rejected]: (state: AuthState) => {
      state.status = 'error'
    }
  }
})

export const {setStatus} = authSlice.actions

export default authSlice.reducer

// import {TypeUser} from "../../types/types";
// import {AuthAction, AuthActionEnum} from "../types/auth";
//
// const initialState: TypeUser = {}
//
// export const authSlice = (state = initialState, action: AuthAction) => {
//   switch (action.type) {
//     case AuthActionEnum.REG_USER:
//       return action.payload
//     case AuthActionEnum.LOGIN_USER:
//       return action.payload
//     case AuthActionEnum.REG_ERROR:
//       return {
//         ...state, RegError: action.payload
//       }
//     case AuthActionEnum.LOG_IN_ERROR:
//       return {
//         ...state, LogInError: action.payload
//       }
//     default:
//       return state
//   }
// }