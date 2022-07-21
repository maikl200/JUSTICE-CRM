import {createSlice} from "@reduxjs/toolkit";
import {addProduct, deleteProduct, editProduct, fetchProduct, sellProduct} from "../asyncThunk/productAsyncThunk";
import {ProductState, ProductStatus} from "../types/productType";

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    status: 'none'
  } as ProductState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload as ProductStatus
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state: ProductState) => {
      state.status = 'loading'
    })
    builder.addCase(fetchProduct.fulfilled, (state: ProductState, action) => {
      state.status = 'success'
      state.products = action.payload
    })
    builder.addCase(fetchProduct.rejected, (state: ProductState) => {
      state.status = 'error'
    })
    builder.addCase(addProduct.pending, (state: ProductState) => {
      state.status = 'loading'
    })
    builder.addCase(addProduct.fulfilled, (state: ProductState, action) => {
      state.status = 'success'
      state.products.push(action.payload)
      action.meta.arg.close()
    })
    builder.addCase(addProduct.rejected, (state: ProductState) => {
      state.status = 'error'
    })
    builder.addCase(editProduct.pending, (state: ProductState) => {
      state.status = 'loading'
    })
    builder.addCase(editProduct.fulfilled, (state: ProductState, action) => {
      state.status = 'success'
      state.products = action.payload
      action.meta.arg.close()
    })
    builder.addCase(editProduct.rejected, (state: ProductState) => {
      state.status = 'error'
    })
    builder.addCase(sellProduct.pending, (state: ProductState) => {
      state.status = 'loading'
    })
    builder.addCase(sellProduct.fulfilled, (state: ProductState, action) => {
      state.status = 'success'
      state.products = action.payload
      action.meta.arg.close()
    })
    builder.addCase(sellProduct.rejected, (state: ProductState) => {
      state.status = 'error'
    })
    builder.addCase(deleteProduct.fulfilled, (state: ProductState, action) => {
      state.products = state.products.filter(product => product._id !== action.payload._id)
    })
  }
})

export const {setStatus} = productSlice.actions

export default productSlice.reducer
