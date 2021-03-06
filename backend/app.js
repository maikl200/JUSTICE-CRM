const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/product')
const sellProductRoutes = require('./routes/sellProduct')
const uploadRoutes = require('./routes/upload')
const profileRoutes = require('./routes/profile')
const keys = require('./config/keys')
const mongoose = require('mongoose')
const passport = require('passport');
const mockData = require("./routes/mockData");
const path = require('path')

const router = express.Router()
router.post('/upload')

mongoose.connect(keys.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
    .then(() => {
      console.log('MongoDB started')
    })
    .catch(() => console.log('NOOOO'))

app.use('/images', express.static(path.join('images')))
app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use(require('cors')({origin: 'http://localhost:3000'}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/auth', authRoutes)
app.use("/profile", profileRoutes)
app.use('/product', productRoutes)
app.use('/sellProduct', sellProductRoutes)
app.use('/upload', uploadRoutes)
app.use('/mockData', mockData)


module.exports = app