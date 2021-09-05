const express = require('express')
const {
  index,
  register,
  create,
  detail,
  edit,
  update,
  deleteMovie,
} = require('../controllers/movieController')
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

movieRouter.post('/create', create)

movieRouter.get('/detail/:id', detail)

movieRouter.get('/edit/:id', edit)

movieRouter.post('/update/:id', update)

movieRouter.post('/delete/:id', deleteMovie)

module.exports = movieRouter
