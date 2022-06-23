const Product = require('../models/Product')
const errorHandler = require('../utils/errorHandler')
const User = require("../models/Users");

module.exports.myProducts = async function (req, res) {
  try {
    const allProduct = await Product.find({userId: req.query.id})
    console.log(allProduct)
    return res.status(200).json({allProduct})
  } catch (e) {
    return res.status(400).json({
      message: 'Bad request'
    })
  }
}

module.exports.addProduct = async function (req, res) {
  try {
    const user = await User.findOne({_id: req.query.id})
    if (user){
      const newProduct = req.body
      const product = await new Product({
        store: newProduct.store,
        price: newProduct.price,
        productName: newProduct.productName,
        productCategory: newProduct.productCategory,
        quantityGoods: newProduct.quantityGoods,
        weightVolumeOneItem: newProduct.weightVolumeOneItem,
        userId: user._id
      })
      try {
        await product.save()
        res.status(201).json({
          product
        })
      }
      catch (e) {
        errorHandler(res,e)
      }
    }

    // const newProduct = await User.findOneAndUpdate({_id: req.params.id},
    //   {
    //     $set: {
    //       products: [...user.products, req.body.prod]
    //     }
    //   }, {new: true}
    // )
    // res.status(200).json({
    //   newProducts
    // })

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.sellProduct = function (req, res) {
  try {
    // todo Заполнить
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.editProduct = async function (req, res) {
  try {
    const {id} = req.params
    const updateProduct = await Product.findOneAndUpdate(
      {_id: id},
      {
        address: req.body.address,
        store: req.body.store,
        price: req.body.price,
        productName: req.body.productName,
        productCategory: req.body.productCategory,
        quantityGoods: req.body.quantityGoods,
        weightVolumeOneItem: req.body.weightVolumeOneItem
      },
    )
    res.status(200).json(updateProduct)
    console.log(updateProduct)
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
