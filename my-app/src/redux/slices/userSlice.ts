import {createSlice} from "@reduxjs/toolkit";
import {
  changeCurrentPassword,
  changeProfile,
  deleteAvatar,
  fetchUsers,
  uploadAvatar
} from "../asyncThunk/userAsyncThunk";
import {UserState} from "../types/userType";

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