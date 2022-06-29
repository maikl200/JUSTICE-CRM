const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mockSchema = new Schema({
  id:{
    type: Schema.Types.ObjectId
  },
  productName: {
    type: String
  },
  store: {
    type: String
  },
  address: {
    type: String
  },
  productCategory: {
    type: String
  },
  dateNow: {
    type: String
  },
  soldItems: {
    type: Number
  },
  lastSale: {
    type: String
  },
  price: {
    type: Number
  },
  quantityGoods: {
    type: Number
  },
  weightVolumeOneItem: {
    type: Number
  },
})

module.exports = mongoose.model('mock', mockSchema)