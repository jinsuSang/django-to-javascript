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

const movieRouter = express.Router()

movieRouter.get('/', index)

movieRouter.get('/register', register)

movieRouter.post('/create', create)

movieRouter.get('/detail/:id', detail)

movieRouter.get('/edit/:id', edit)

movieRouter.post('/update/:id', update)

movieRouter.post('/delete/:id', deleteMovie)

module.exports = movieRouter
