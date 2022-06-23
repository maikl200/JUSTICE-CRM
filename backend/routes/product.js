const express = require('express')
const router = express.Router()
const controller = require('../controllers/product')
const passport = require('passport')

router.get('/myProducts', passport.authenticate('jwt', {session: false}), controller.myProducts)
router.post('/addProduct', passport.authenticate('jwt', {session: false}), controller.addProduct)
router.post('/:id', passport.authenticate('jwt', {session: false}), controller.sellProduct)
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.editProduct)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteProduct)

module.exports = router