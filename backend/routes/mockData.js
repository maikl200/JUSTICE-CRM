const express = require('express')
const router = express.Router()
const controller = require('../controllers/mockData')

router.post('/mockData', controller.mockData)
router.get('/getMockData', controller.getMock)


module.exports = router