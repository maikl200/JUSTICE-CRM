import {Dispatch} from "react";
import {ProductAction, ProductActionTypes} from "../types/product";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchProducts = () => {
  return (dispatch: Dispatch<ProductAction>) => {
    axios.get('http://localhost:5100/product/myProducts', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    })
      .then(res => {
        dispatch({type: ProductActionTypes.SET_PRODUCT, payload: res.data})
      })
      .catch(e => {
        console.error(e)
      })
  }
}