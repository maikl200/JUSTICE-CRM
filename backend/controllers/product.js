const Product = require('../models/Product')
const errorHandler = require('../utils/errorHandler')
const User = require("../models/Users");

module.exports.myProducts = async function (req, res) {
    const allProduct = await Product.find({userId: req.user._id})
  try {
    console.log(allProduct)
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
  try {
    const {id} = req.query
    const updateProduct = await Product.findOneAndUpdate(
      {_id: id},
      {
        store: req.body.store,
        price: req.body.price,
        productName: req.body.productName,
        productCategory: req.body.productCategory,
        quantityGoods: req.body.quantityGoods,
        weightVolumeOneItem: req.body.weightVolumeOneItem,
        address: req.body.address ? req.body.address : '15 Krylatskaya st...'
      },
    )

    try {
      await updateProduct.save()
      res.status(201).json({updateProduct})
    } catch (e) {
      console.log(e)
    }
    res.status(200).json(updateProduct)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.deleteProduct = async function (req, res) {
  try {
    const {id} = req.params
    await Product.remove({_id: id})
    res.status(200).json({
      message: 'Product deleted'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}
