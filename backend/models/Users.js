const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  companyName: {
    type: String
  },
})

module.exports = mongoose.model('users', usersSchema)