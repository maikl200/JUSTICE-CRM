import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {TypeProduct} from "../../types/types";
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


type Status = 'loading' | 'success' | 'error' | 'none'

type SellProductState = {
  sellProduct: TypeProduct[],
  status: Status
}

const sellProductSlice = createSlice({
  name: 'sellProduct',
  initialState: {
    sellProduct: [],
    status: 'none',
  } as SellProductState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSellProduct.pending, (state: SellProductState) => {
      state.status = 'loading'
    })
    builder.addCase(fetchSellProduct.fulfilled, (state: SellProductState, action) => {
      state.status = 'success'
      state.sellProduct = action.payload
    })
    builder.addCase(fetchSellProduct.rejected, (state: SellProductState) => {
      state.status = 'error'
    })
  }
})

export default sellProductSlice.reducer