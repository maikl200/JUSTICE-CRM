const errorHandler = require("../utils/errorHandler")
const mockScheme = require("../models/Mock")

module.exports.mockData = async function (req, res) {
  try {
    const mock = {
      _id: req.body._id,
      productName: req.body.productName,
      store: req.body.store,
      address: req.body.address,
      productCategory: req.body.productCategory,
      dateNow: req.body.dateNow,
      soldItems: req.body.soldItems,
      lastSale: req.body.lastSale,
      price: req.body.price,
      quantityGoods: req.body.quantityGoods,
      weightVolumeOneItem: req.body.weightVolumeOneItem,
    }

    await new mockScheme(mock).save()

    res.json({
      success: true
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getMock = async function (req,res) {
  const allMock = await mockScheme.find()
  console.log(allMock)
  try {
    return res.status(200).json(allMock)
  } catch (e) {
    return res.status(400).json({
      message: 'Bad request'
    })
  }
}