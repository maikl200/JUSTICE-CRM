const errorHandler = require("../utils/errorHandler")
const User = require("../models/Users");
const Product = require('../models/Product')

const bcrypt = require('bcryptjs')

module.exports.getMyProfile = async (req, res) => {
  const myProfile = await User.findOne({_id: req.user._id})
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
    console.log(req.body)

    const profile = {
      email: candidate.email,
      firstName: req.body.firstName ? req.body.firstName : candidate.firstName,
      lastName: req.body.lastName ? req.body.lastName : candidate.lastName,
      companyName: req.body.companyName ? req.body.companyName : candidate.companyName,
      productCategory: req.body.productCategory ? req.body.productCategory : candidate.productCategory,
      address: req.body.address ? req.body.address : candidate.address,
      imageSrc: req.file ? req.file.path : '',
      userid: req.user.id
    }

    try {
      await User.updateOne({_id: req.user.id}, {
        $set: {
          ...profile,
        }
      })
      if (req.body.oldPassword) {
        const passwordResult = bcrypt.compareSync(req.body.oldPassword, candidate.password)

        if (passwordResult) {
          const newPassword = req.body.password
          const salt = bcrypt.genSaltSync(10)
          await User.updateOne(
            {_id: req.user.id},
            {
              $set: {
                password: bcrypt.hashSync(newPassword, salt),
              }
            })
          return await dataResponse(req.user.id, true)
        }
        return await dataResponse(req.user.id, false)
      }

      return await dataResponse(req.user.id)

    } catch (e) {
      errorHandler(res, e)
    }

    async function dataResponse(userId, isPasswordUpdate) {
      const updatedUser = await User.findOne({_id: req.user.id})
      const userRemoteConnections = JSON.parse(JSON.stringify(updatedUser))
      const {__v, password, ...currentUser} = userRemoteConnections

      switch (isPasswordUpdate) {
        case true:
          return res.status(201).json({...currentUser, isPasswordUpdate: true})
        case false:
          return res.status(201).json({...currentUser, isPasswordUpdate: false})
        default:
          return res.status(201).json({...currentUser, isPasswordUpdate: null})
      }
    }
  }
}