import {TypeProduct} from "../../types/types";

export type SellProductStatus = 'loading' | 'success' | 'error' | 'none'

export type SellProductState = {
  sellProduct: TypeProduct[],
  status: SellProductStatus
}
