const errorHandler = require("../utils/errorHandler")
const User = require("../models/Users");

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

  const candidate = await User.findOneAndUpdate({id: req.user._id})

  console.log('CANDIDATE', candidate)
  const profile = {
    firstName: candidate.firstName ? candidate.firstName : req.body.firstName,
    lastName: candidate.lastName ? candidate.lastName : req.body.lastName,
    password: candidate.password ? candidate.password : req.body.password,
    companyName: candidate.companyName ? candidate.companyName : req.body.companyName,
    address: candidate.address ? candidate.address : req.body.address
  }
  try {
    console.log('PROFILE', profile)
    // res.status(200).json(profile)
  } catch (e) {
    errorHandler(res, e)
  }
}