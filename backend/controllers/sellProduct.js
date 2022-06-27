const SellProduct = require('../models/SellProduct')
const Product = require('../models/Product')
const errorHandler = require('../utils/errorHandler')

module.exports.mySellProduct = async function (req, res) {
  const allSellProduct = await SellProduct.find({userId: req.user._id})
  try {
    return res.status(200).json(allSellProduct)
  } catch (e) {
    return res.status(400).json({
      message: 'Bad request'
    })
  }
}

module.exports.sellProduct = async function (req, res) {
  const userId = req.user.id
  const productId = req.body.productId
  const quantitySell = req.body.quantitySell

  const product = await Product.findOne({id: productId, userId: userId})
  res.status(200).json({})
  const sellProduct = await new SellProduct({
    productName: product.productName,
    store: product.store,
    address: product.address,
    productCategory: product.productCategory,
    productDate: product.productDate,
    price: product.price,
    weightVolumeOneItem: product.weightVolumeOneItem,
    quantityGoods: product.quantityGoods - quantitySell,
    lastSale: product.lastSale,
    userId: req.user.id
  })
  await sellProduct.save()
  await Product.updateOne({id: productId, userId: userId}, {
    $set: {
      quantityGoods: Number(product.quantityGoods) - Number(quantitySell),
    }
  })
  const updatedProduct = await Product.findOne({id: productId, userId: userId})
  console.log(updatedProduct)

  try {
    res.status(201).json(updatedProduct)
  } catch (e) {
    errorHandler(res, e)
  }

}