const mongoose = require('mongoose')
const Schema = mongoose.Schema

const currentDate = new Date()

const getCurrentDate = () => {
  const date = currentDate.getDate()
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const year = currentDate.getFullYear()
  return `${date}.${month}.${year}`
}

const productSchema = new Schema({
  userId: {
    ref: 'Users',
    type: Schema.Types.ObjectId
  },
  address: {
    type: String
  },
  lastSale: {
    type: String
  },
  price: {
    type: Number
  },
  productCategory: {
    type: String
  },
  productName: {
    type: String
  },
  quantityGoods: {
    type: Number
  },
  soldItems: {
    type: Number
  },
  store: {
    type: String
  },
  weightVolumeOneItem: {
    type: Number
  },
  dateNow: {
    type: String,
    default: getCurrentDate()
  },
})

module.exports = mongoose.model('products', productSchema)