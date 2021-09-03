const express = require('express')
const { index } = require('../controllers/movieController')
const movieRouter = express.Router()

movieRouter.get('/', index)

movieRouter.get('/new', (req, res) => {
  res.send('About birds')
})

movieRouter.get('/new', (req, res) => {
  res.send('About birds')
})

movieRouter.get('/new', (req, res) => {
  res.send('About birds')
})

module.exports = movieRouter
