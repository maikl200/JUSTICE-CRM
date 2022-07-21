import {TypeProduct} from "../../../types/types";

export type ProductStatus = 'loading' | 'success' | 'error' | 'none'

export type ProductState = {
  products: TypeProduct[],
  sellProduct: TypeProduct[]
  status: ProductStatus
}