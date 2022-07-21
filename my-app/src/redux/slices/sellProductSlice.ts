import {createSlice} from "@reduxjs/toolkit";
import {fetchSellProduct} from "../asyncThunk/sellProductAsyncThunk";
import {SellProductState} from "../types/sellProductType";

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