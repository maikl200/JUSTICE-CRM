import product from "./slices/product/productSlice";
import auth from "./slices/auth/authSlice";
import user from "./slices/user/userSlice";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

export const store = configureStore({
  reducer: {
    product,
    auth,
    user
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch