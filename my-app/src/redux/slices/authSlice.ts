import {createSlice} from "@reduxjs/toolkit";
import {logInUser, regUser} from "../asyncThunk/authAsyncThunk";
import {AuthState, AuthStatus} from "../types/authType";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    statusReg: 'none',
    statusLogIn: 'none'
  } as AuthState,
  reducers: {
    setStatus(state, action) {
      state.statusReg = action.payload as AuthStatus
      state.statusLogIn = action.payload as AuthStatus
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