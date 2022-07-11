export interface TypeProduct {
  _id?: string
  address?: string | null
  dateNow?: string
  lastSale?: string
  valueDate?: string
  price?: number | null
  productCategory?: string
  productName?: string
  quantityGoods?: number | null
  soldItems?: number | null
  store?: string
  userId?: string
  weightVolumeOneItem?: number | null
}

export interface TypeUser {
  image?: string;
  address?: string
  avatar?: string
  companyName?: string
  email?: string
  firstName?: string
  lastName?: string
  oldPassword?: string
  newPassword?: string
  password?: string
  productCategory?: string
}