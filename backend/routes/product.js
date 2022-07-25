const express = require('express')
const router = express.Router()
const controller = require('../controllers/product')
const passport = require('passport')

router.get('/myProducts', passport.authenticate('jwt', {session: false}), controller.myProducts)
router.post('/addProduct', passport.authenticate('jwt', {session: false}), controller.addProduct)
router.patch('/editProduct', passport.authenticate('jwt', {session: false}), controller.editProduct)
router.delete('/deleteProduct', passport.authenticate('jwt', {session: false}), controller.deleteProduct)

module.exports = router