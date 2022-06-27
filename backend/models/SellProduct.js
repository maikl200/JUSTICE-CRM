const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sellProductSchema = new Schema({

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
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('sellProducts', sellProductSchema)