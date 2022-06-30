const multer = require('multer')

const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/')
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split('/')[1]
    callback(null, `image-${Date.now()}.${ext}`)
  }
})

const isImage = (req, file, callback) => {

  console.log(file.mimetype.startsWith('image'))
  if (file.mimetype.startsWith('image')) {
    console.log(123)
    callback(null, true)
  } else {
    console.log(321)
    callback(new Error('Only Image is Allowed..'))
  }
}

const upload = multer({
  storage: multerConfig,
  fileFilter: isImage,
})

exports.uploadImage = upload.single('image')

exports.upload = (req, res) => {
  console.log(req.file)
  res.status(200).json({
    success: 'Success',
  })
}