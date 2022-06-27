const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/product')
const sellProductRoutes = require('./routes/sellProduct')
const keys = require('./config/keys')
const mongoose = require('mongoose')
const passport = require('passport');


mongoose.connect('mongodb+srv://alex:12345@cluster0.yzle7iv.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB started')
  })
  .catch(() => console.log('NOOOO'))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use(require('cors')({origin: 'http://localhost:3000'}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/auth', authRoutes)
app.use('/product', productRoutes)
app.use('/sellProduct', sellProductRoutes)


module.exports = app