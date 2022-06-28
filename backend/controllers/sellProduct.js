const SellProduct = require('../models/SellProduct')
const Product = require('../models/Product')
const errorHandler = require('../utils/errorHandler')

module.exports.mySellProduct = async function (req, res) {
  const allSellProduct = await SellProduct.find({userId: req.user._id})
  try {
    res.status(200).json(allSellProduct)
  } catch (e) {
    res.status(400).json({
      message: 'Bad request',
    })
  }
}

module.exports.sellProduct = async function (req, res) {
  const userId = req.user.id
  const productId = req.body._id
  const newProduct = req.body

  const sellProduct = await new SellProduct({
    productName: newProduct.productName,
    store: newProduct.store,
    address: newProduct.address,
    productCategory: newProduct.productCategory,
    productDate: newProduct.productDate,
    price: newProduct.price,
    weightVolumeOneItem: newProduct.weightVolumeOneItem,
    soldItems: newProduct.soldItems,
    lastSale: newProduct.valueDate,
    userId: req.user.id
  })
  await sellProduct.save()

  await Product.updateOne({_id: productId, userId: userId}, {
    $set: {
      quantityGoods: newProduct.quantityGoods,
    }
  })
  try {
    res.status(201).json(newProduct)
  } catch (e) {
    errorHandler(res, e)
  }
}