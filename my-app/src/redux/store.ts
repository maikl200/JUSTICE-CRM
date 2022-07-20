import product from "./slices/productSlice";
import auth from "./slices/authSlice";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

export const store = configureStore({
  reducer: {
    product,
    auth
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch