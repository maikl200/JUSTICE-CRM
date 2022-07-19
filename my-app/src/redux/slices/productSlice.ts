import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {TypeProduct} from "../../types/types";
import axios from "axios";

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async function () {
    const response = await axios.get('http://localhost:5100/product/myProducts')
    console.log(response)
    return response
  }
)

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async function () {

  }
)

type Status = 'loading' | 'success' | 'error'

type ProductState = {
  products: TypeProduct[],
  status: Status
}

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    status: 'loading'
  } as ProductState,
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [fetchProduct.pending]: (state: ProductState) => {
      state.status = 'loading'
    },
    // @ts-ignore
    [fetchProduct.fulfilled]: (state: ProductState, payload: TypeProduct[]) => {
      state.status = 'success'
      state.products = payload
      console.log('===>payloadToolkit', payload)
    },
    // @ts-ignore
    [fetchProduct.rejected]: (state: ProductState) => {
      state.status = 'error'
    }
  }
})

export default productSlice.reducer

// import {ProductAction, ProductActionEnum} from '../types/product'
// import {TypeProduct} from "../../types/types";
//
// const initialState = [] as TypeProduct[]
//
// export const productReducer = (state = initialState, action: ProductAction): TypeProduct[] => {
//   switch (action.type) {
//     case ProductActionEnum.SET_PRODUCT:
//       return action.payload
//     case ProductActionEnum.FETCH_PRODUCT:
//       return state
//     case ProductActionEnum.ADD_PRODUCT:
//       return [...state, action.payload]
//     case ProductActionEnum.DELETE_PRODUCT:
//       return state.filter(obj => obj._id !== action.payload)
//
//     default:
//       return state
//   }
// }
