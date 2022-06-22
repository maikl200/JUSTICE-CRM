const Product = require('../models/Product')
const errorHandler = require('../utils/errorHandler')

module.exports.allProduct = async function (req, res) {
  try {
    const allProduct = await Product.find()
    return res.status(200).json({allProduct})
  } catch (e) {
    return res.status(400).json('dwdwdwd')
  }
}

module.exports.addProduct = async function (req, res) {
  try {
    const product = await new Product({
      list: [{...req.body.list}],
    }).save()
    res.status(201).json(product)
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
    const product = await Product.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
    res.status(200).json(product)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.deleteProduct = async function (req, res) {
  try {
    await Product.remove({_id: req.params.id})
    res.status(200).json({
      message: 'Product deleted'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}
