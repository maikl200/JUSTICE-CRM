const Product = require('../models/Product')
const errorHandler = require('../utils/errorHandler')
const User = require("../models/Users");

module.exports.myProducts = async function (req, res) {
  const allProduct = await Product.find({userId: req.user._id})
  try {
    return res.status(200).json(allProduct)
  } catch (e) {
    return res.status(400).json({
      message: 'Bad request'
    })
  }
}

module.exports.addProduct = async function (req, res) {
  try {
    const user = await User.findOne({_id: req.user._id})
    if (user) {
      const newProduct = req.body
      const product = await new Product({
        store: newProduct.store,
        price: newProduct.price,
        address: newProduct.address ? newProduct.address : "15 Krylatskaya st...",
        productName: newProduct.productName,
        productCategory: newProduct.productCategory,
        quantityGoods: newProduct.quantityGoods,
        weightVolumeOneItem: newProduct.weightVolumeOneItem,
        userId: user
      })
      try {
        await product.save()
        res.status(201).json(product)
      } catch (e) {
        errorHandler(res, e)
      }
    }

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.editProduct = async function (req, res) {
  const productId = req.query.id
  const newProduct = req.body

  await Product.updateOne(
    {_id: productId},
    {
      $set: {
        ...newProduct
      }
    },
  )
  const updatedProducts = await Product.find({userId: req.user.id})
  try {
    res.status(201).json(updatedProducts)
  } catch (e) {
    console.error(e)
  }
}

module.exports.deleteProduct = async function (req, res) {
  const productId = req.query.id
  const deleteProduct = await Product.findOneAndDelete({_id: productId})
  console.log(productId)
  try {
    res.status(200).json(deleteProduct)
  } catch (e) {
    errorHandler(res, e)
  }
}
