import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchSellProduct = createAsyncThunk(
  'sellProduct/fetchSellProduct',
  async function () {
    const {data} = await axios.get('http://localhost:5100/sellProduct/mySellProduct', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    })
    return data
  }
)