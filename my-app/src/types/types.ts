export interface TypeProduct {
  _id: string
  address?: string | null
  dateNow: string
  lastSale: string
  price: number | string
  productCategory: string
  productName: string
  quantityGoods: number | string
  soldItems: number
  store: string
  userId: string
  weightVolumeOneItem: number
}

export interface TypeUser {
  address?: string
  avatar?: string
  companyName: string
  email: string
  firstName: string
  lastName: string
  oldPassword?: string
  password: string
  productCategory?: string
  _id: string
}