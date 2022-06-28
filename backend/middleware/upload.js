const multer = require('multer')
const moment = require('moment')

module.exports.storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'images/')
  },
  filename(req, file, cb) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS')
    cb(null, `${date}-${file.originalname}`)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/svg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}