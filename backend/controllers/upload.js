const multer = require('multer')
const User = require("../models/Users");

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
  const candidate = await User.findOne({_id: req.user.id})
  if (candidate) {
    try {
      await User.updateOne({
        _id: req.user.id},{
        $set: {
          avatar: req.file.path
        }
      })

      const updatedUser = await User.findOne({_id: req.user.id})
      res.status(200).json(updatedUser)
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports.deleteAvatar = async function (req, res) {
  const candidate = await User.findOne({_id: req.user.id})
  if (candidate) {
    try {
      await User.updateOne({_id: req.user.id},{
        $set: {
          avatar: 'images/image-1656925193112.jpeg'
        }
      })
      const updatedUser = await User.findOne({_id: req.user.id})
      res.status(200).json(updatedUser)
    } catch (e) {
      console.log(e)
    }
  }
}