const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function (req, res) {
  console.log(req.body)
  const candidate = await User.findOne({email: req.body.email})
  if (candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      const token = jwt.sign({
        email: candidate.email,
        password: candidate.password,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        userId: candidate._id
      }, keys.jwt, {expiresIn: 60 * 60})
      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({
        message: 'Passwords do not match'
      })
    }
  } else {
    res.status(404).json({
      message: 'This email was not found'
    })
  }
}

module.exports.register = async function (req, res) {
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    res.status(409).json({
      message: 'Such a user already exists'
    })
  } else {
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      companyName: req.body.companyName
    })
    try {
      await user.save()
      res.status(201).json(user)
    } catch (e) {
      errorHandler(res, e)
    }

  }
}