const errorHandler = require("../utils/errorHandler")
const User = require("../models/Users");
const Product = require('../models/Product')

const bcrypt = require('bcryptjs')

module.exports.getMyProfile = async (req, res) => {
  const myProfile = await User.find({_id: req.user._id})
  try {
    res.status(200).json(myProfile)
  } catch (e) {
    res.status(400).json({
      message: 'Bad request'
    })
  }
}

module.exports.changeProfile = async (req, res) => {
  const candidate = await User.findOne({_id: req.user.id})
  if (candidate) {
    const profile = {
      email: candidate.email,
      firstName: req.body.firstName ? req.body.firstName : candidate.firstName,
      lastName: req.body.lastName ? req.body.lastName : candidate.lastName,
      password: req.body.password ? req.body.password : candidate.password,
      oldPassword: req.body.oldPassword ? req.body.oldPassword : '',
      companyName: req.body.companyName ? req.body.companyName : candidate.companyName,
      productCategory: req.body.productCategory ? req.body.productCategory : candidate.productCategory,
      address: req.body.address ? req.body.address : candidate.address,
      imageSrc: req.file ? req.file.path : '',
      userid: req.user.id
    }

    try {
      await Product.updateOne({_id: req.user.id}, {
        $set: {
          address: profile.address
        }
      })

    } catch (e) {
      errorHandler(res, e)
    }

    try {
      await User.updateOne({_id: req.user.id}, {
        $set: {
          ...profile
        }
      })
      let passwordResult = null
      if (req.body.oldPassword) {
        passwordResult = bcrypt.compareSync(req.body.oldPassword, candidate.password)
      }

      if (passwordResult) {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        await User.updateOne(
          {_id: req.user.id},
          {
            $set: {
              password: bcrypt.hashSync(password, salt),
            }
          })
      }
      const updatedUser = await User.findOne({_id: req.user.id})
      res.status(201).json(updatedUser)
    } catch (e) {
      errorHandler(res, e)
    }
  }
}

module.exports.changePassword = async (req, res) => {
  try {

    const candidate = await User.findOne({_id: req.user.id})
    if (candidate) {
      const passwordResult = bcrypt.compareSync(req.body.oldPassword, candidate.password)
      if (passwordResult) {
        res.status(200).json(true)
      } else {
        res.status(200).json(false)
      }
    } else {
      res.status(404).json({
        message: 'user not found'
      })
    }
  } catch (e) {
    console.log('error')
    errorHandler(res, e)
  }
}