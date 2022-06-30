const express = require("express")
const multer = require('multer')
const router = express.Router()
const passport = require("passport");
const controller = require("../controllers/profile")


router.patch('/changeProfile', passport.authenticate("jwt", {session: false}), controller.changeProfile)
router.get('/myProfile', passport.authenticate("jwt", {session: false}), controller.getMyProfile)
router.post('/changePassword', passport.authenticate("jwt", {session: false}), controller.changePassword)


module.exports = router