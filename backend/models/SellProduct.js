const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sellProductSchema = new Schema({
  dateNow: {
    type: Date,
    default: Date.now
  },
  list: [{
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
  }],
  id: {
    type: Number
  },
})

module.exports = mongoose.model('sellProducts', sellProductSchema)