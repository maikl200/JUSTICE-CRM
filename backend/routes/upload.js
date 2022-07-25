const express = require('express')
const router = express.Router()
const passport = require("passport");

const {upload, uploadImage, deleteAvatar} = require('../controllers/upload')


router.post('/', uploadImage, passport.authenticate("jwt", {session: false}), upload)
router.delete('/deleteAvatar', uploadImage, passport.authenticate("jwt", {session: false}), deleteAvatar)

module.exports = router