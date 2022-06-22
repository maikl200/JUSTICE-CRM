const SellProduct = require('../models/SellProduct')
const errorHandler = require('../utils/errorHandler')

module.exports.allProduct = async function (req, res) {
  const query = {
    user: req.user.id
  }

  if (req.query.start) {
    query.date = {
      $gte: req.query.start
    }
  }

  if (req.query.end) {
    if (!query.date) {
      query.date = {}
    }
    query.date['$lte'] = req.query.end
  }

  try {
    const sellProduct = await SellProduct
      .find(query)
      .sort({date: -1})
      .skip(+req.query.offset)
      .limit(+req.query.limit)

    res.status(200).json(sellProduct)
  } catch (e) {
    errorHandler(res, e)
  }
}