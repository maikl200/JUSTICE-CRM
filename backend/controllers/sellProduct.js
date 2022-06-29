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
  try {
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

  if (newProduct.quantityGoods === 0){
    await Product.deleteOne({_id: productId, userId: userId})
    const updatedProducts = await Product.find({userId: userId})
    res.status(201).json(updatedProducts)
  }
  await Product.updateOne({_id: productId, userId: userId}, {
    $set: {
      quantityGoods: newProduct.quantityGoods,
    }
  })
  const updatedProducts = await Product.find({userId: userId})

    res.status(201).json(updatedProducts)
  } catch (e) {
    errorHandler(res, e)
  }
}