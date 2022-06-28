const express = require("express")
const multer = require('multer')
const router = express.Router()
const passport = require("passport");
const controller = require("../controllers/profile")
const {storage} = require("../middleware/upload");

const upload = multer({storage})

router.patch('/changeProfile',upload.single('image'), passport.authenticate("jwt", {session: false}), controller.changeProfile)
router.get('/myProfile', passport.authenticate("jwt", {session: false}), controller.getMyProfile)
router.get('/changePassword', passport.authenticate("jwt", {session: false}), controller.changePassword)

// router.post('/upload',passport.authenticate("jwt", {session: false}), upload.single('image'), controller.changeProfile)

module.exports = router