import {createAsyncThunk} from "@reduxjs/toolkit";
import {TypeUser} from "../../../types/types";
import axios from "axios";
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