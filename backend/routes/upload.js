const express = require('express')
const router = express.Router()

const {upload, uploadImage} = require('../controllers/upload')

router.post('/', uploadImage, upload)

module.exports = router