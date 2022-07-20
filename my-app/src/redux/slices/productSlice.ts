import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {TypeProduct} from "../../types/types";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async function () {
    const {data} = await axios.get('http://localhost:5100/product/myProducts', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    })
    return data
  }
)

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async function (payload: { close: () => void, product: TypeProduct }) {
    const {data} = await axios.post('http://localhost:5100/product/addProduct', {
      ...payload.product
    }, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    })
    return data
  }
)

export const editProduct = createAsyncThunk(
  'product/editProduct',
  async function (payload: { close: () => void, editId: string, product: TypeProduct }) {
    const {data} = await axios.patch('http://localhost:5100/product/editProduct', {
      ...payload.product
    }, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
      params: {
        id: payload.editId
      }
    })
    return data
  }
)

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async function (payload: { id: string }) {
    const {data} = await axios.delete('http://localhost:5100/product/deleteProduct', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
      params: {
        id: payload.id
      }
    })
    return data
  }
)

export const sellProduct = createAsyncThunk(
  'product/sellProduct',
  async function (payload: { close: () => void, newProduct: TypeProduct, sellId: string }) {
    const {data} = await axios.post('http://localhost:5100/sellProduct/sellProduct', {
      ...payload.newProduct
    }, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
      params: {
        id: payload.sellId
      }
    })
    return data
  }
)

type Status = 'loading' | 'success' | 'error' | 'none'

type ProductState = {
  products: TypeProduct[],
  status: Status
}

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    status: 'none'
  } as ProductState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload as Status
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
