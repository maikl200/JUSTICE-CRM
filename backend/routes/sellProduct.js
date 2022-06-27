const express = require('express')
const router = express.Router()
const controller = require('../controllers/sellProduct')
const passport = require("passport");

router.post('/sellProduct', passport.authenticate('jwt', {session: false}), controller.sellProduct)

module.exports = router