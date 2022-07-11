import {Dispatch} from "react";
import {AddProduct, ProductAction, ProductActionEnum} from "../types/product";
import axios from "axios";
import Cookies from "js-cookie";
import {TypeProduct} from "../../types/types";

export const fetchProducts = () => {
  return (dispatch: Dispatch<ProductAction>) => {
    axios.get('http://localhost:5100/product/myProducts', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    })
      .then(res => {
        dispatch({type: ProductActionEnum.SET_PRODUCT, payload: res.data})
      })
      .catch(e => {
        console.error(e)
      })
  }
}

export const addProduct = (action: { payload: TypeProduct }) => {
  return (dispatch: Dispatch<ProductAction>) => {
    axios.post('http://localhost:5100/product/addProduct', {
      ...action.payload
    }, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    })
      .then((res) => {
        dispatch({type: ProductActionEnum.ADD_PRODUCT, payload: res.data})
      })
      .catch((e) => {
        console.error(e)
      })
  }
}

export const sellGoods = (sellId: string, action: { payload: { weightVolumeOneItem?: number | null; address?: string | null; valueDate?: string; store?: string; soldItems?: number | null; userId?: string; dateNow?: string; productName?: string; quantityGoods: number | null; productCategory?: string; price?: number | null; _id?: string; lastSale?: string } }) => {
  return (dispatch: Dispatch<ProductAction>) => {
    axios.post('http://localhost:5100/sellProduct/sellProduct', {
      ...action.payload
    }, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
      params: {
        id: sellId
      }
    }).then((res) => {
      dispatch({type: ProductActionEnum.SELL_PRODUCT, payload: res.data})
    })
      .catch((e) => {
        console.error(e)
      })
  }
}

export const editProduct = (editId: string, action: { payload: TypeProduct }) => {
  return (dispatch: Dispatch<ProductAction>) => {
    axios.patch('http://localhost:5100/product/editProduct',
      {
        ...action.payload
      }, {
        headers: {
          Authorization: `${Cookies.get("token")}`,
        },
        params: {
          id: editId
        }
      })
      .then((res) => {
        dispatch({type: ProductActionEnum.EDIT_PRODUCT, payload: res.data})
      })
      .catch((e) => {
        console.error(e)
      })
  }
}

export const deleteProduct = (id: string, state: TypeProduct[]) => {
  return (dispatch: Dispatch<ProductAction>) => {
    axios.delete('http://localhost:5100/product/deleteProduct', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
      params: {
        id: id
      }
    })
      .then(() => {
        const deleteProduct = state.filter((prod: TypeProduct) => prod._id !== id)
        dispatch({type: ProductActionEnum.DELETE_PRODUCT, payload: deleteProduct})
      })
      .catch((e) => {
        console.error(e)
      })
  }
}