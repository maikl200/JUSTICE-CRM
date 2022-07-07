const mongoose = require('mongoose')
const Schema = mongoose.Schema


const usersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String,
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
  address: {
    type: String
  },
  companyName: {
    type: String
  },
  oldPassword: {
    type: String
},
  productCategory: {
    type: String
  }
})

module.exports = mongoose.model('users', usersSchema)