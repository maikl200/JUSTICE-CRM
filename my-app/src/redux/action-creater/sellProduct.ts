import {Dispatch} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {TypeProduct} from "../../types/types";
import {SellProductAction, SellProductActionEnum} from "../types/sellProduct";

export const fetchSellProducts = () => {
  return (dispatch: Dispatch<SellProductAction>) => {
    axios.get<TypeProduct[]>('http://localhost:5100/sellProduct/mySellProduct', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    })
      .then(res => {
        dispatch({type: SellProductActionEnum.SET_SELL_PRODUCT, payload: res.data})
      })
      .catch(e => {
        console.error(e)
      })
  }
}