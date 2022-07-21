import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import {TypeProduct} from "../../types/types";

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