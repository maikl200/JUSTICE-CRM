import axios from "axios";
import {typeProduct, TypesAction} from "../../types/types";
import Cookies from "js-cookie";
import {Dispatch} from "react";
import {ActionTypes, GET_PRODUCT} from "../actionTypes";
import {GetProduct} from "../action";

export const getProducts = () => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    try {
      const res = await axios.get<typeProduct[]>('http://localhost:5100/product/myProducts', {
        headers: {
          Authorization: `${Cookies.get("token")}`,
        },
      })

      dispatch({type: GET_PRODUCT, payload: res.data})
    } catch (e) {
      console.error(e)
    }
  }
}