const multer = require('multer')
const User = require("../models/Users");
const bcrypt = require("bcryptjs");

const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './images')
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split('/')[1]
    callback(null, `image-${Date.now()}.${ext}`)
  }
})

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true)
  } else {
    callback(new Error('Only Image is Allowed..'))
  }
}

const upload = multer({
  storage: multerConfig,
  fileFilter: isImage,
})

exports.uploadImage = upload.single('image')


exports.upload = async (req, res) => {
  res.status(200).json(req.file)
}