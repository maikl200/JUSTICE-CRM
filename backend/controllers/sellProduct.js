const SellProduct = require('../models/SellProduct')
const errorHandler = require('../utils/errorHandler')
const Product = require("../models/Product");

module.exports.sellProduct = async function (req, res) {
  try {
    const userId = req.user.id
    const productId = req.body.productId
    quantitySell = req.body.quantitySell
    const product = await Product.findOne({_id: productId, userId: userId})
    const sellProduct = await new SellProduct({
      productName: product.productName,
      store: product.store,
      address: product.address,
      productCategory: product.productCategory,
      price: product.price,
      weightVolumeOneItem: product.weightVolumeOneItem,
      quantityGoods: product.quantityGoods - quantitySell
    })
    try {
      await sellProduct.save()
      await Product.updateOne({_id: productId, userId: userId}, {
        $set: {
          quantityGoods: product.quantityGoods - quantitySell,
        }
      })
      const updatedProduct = await Product.findOne({_id: productId, userId: userId})
      res.status(201).json(updatedProduct)
    } catch (e) {
      errorHandler(res, e)
    }
  } catch (e) {
    errorHandler(res, e)
  }
}