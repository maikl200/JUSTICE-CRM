const express = require('express')
const router = express.Router()
const passport = require("passport");

const {upload, uploadImage} = require('../controllers/upload')


router.post('/', uploadImage, passport.authenticate("jwt", {session: false}), upload)

module.exports = router