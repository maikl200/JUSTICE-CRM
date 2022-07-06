import {Dispatch} from "react";
import {ProductAction, ProductActionEnum} from "../types/product";
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

export const addProduct = (action: ProductAction) => {
  return (dispatch: Dispatch<ProductAction>) => {
    axios.post('http://localhost:5100/product/addProduct', {
      ...action.payload
    }, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    })
      .then((res) => {
        console.log(res.data)
        dispatch({type: ProductActionEnum.ADD_PRODUCT, payload: res.data})
      })
      .catch((e) => {
        console.error(e)
      })
  }
}

export const sellGoods = (sellId: string, action: ProductAction) => {
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

export const editProduct = (editId: string, action: ProductAction) => {
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

export const deleteProduct = (id: string, state: any) => {
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