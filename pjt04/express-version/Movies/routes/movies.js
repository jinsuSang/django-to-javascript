const express = require('express')
const { index, register } = require('../controllers/movieController')
const models = require('../models/index')
const movieRouter = express.Router()

models.sequelize
  .sync()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

movieRouter.get('/', index)

movieRouter.get('/register', register)

movieRouter.get('/new', (req, res) => {
  res.send('About birds')
})

movieRouter.get('/new', (req, res) => {
  res.send('About birds')
})

module.exports = movieRouter
