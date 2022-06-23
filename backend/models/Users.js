const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  companyName: {
    type: String
  },
  // products: [
  //   {
  //     address: {
  //       type: String
  //     },
  //     lastSale: {
  //       type: String
  //     },
  //     price: {
  //       type: Number
  //     },
  //     productCategory: {
  //       type: String
  //     },
  //     productName: {
  //       type: String
  //     },
  //     quantityGoods: {
  //       type: Number
  //     },
  //     soldItems: {
  //       type: Number
  //     },
  //     store: {
  //       type: String
  //     },
  //     weightVolumeOneItem: {
  //       type: Number
  //     },
  //     dateNow: {
  //       type: Date,
  //       default: Date.now
  //     }
  //   }
  // ]
})

module.exports = mongoose.model('users', usersSchema)