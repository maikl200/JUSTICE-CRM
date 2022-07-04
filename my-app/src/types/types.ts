export interface typeProduct {
  id: string
  _id: string
  address?: string
  dateNow: string
  lastSale: string
  price: number
  productCategory: string
  productName: string
  quantityGoods: number
  soldItems: number
  store: string
  userId: string
  weightVolumeOneItem: number
}

export interface typeUser {
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