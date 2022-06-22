const express = require('express')
const router = express.Router()
const controller = require('../controllers/sellProduct')
const passport = require("passport");

router.get('/', passport.authenticate('jwt', {session: false}), controller.allProduct)

module.exports = router