const models = require('../models')

const indexURL = '/index/'

async function index(req, res) {
  const movies = await models.Movie.findAll()
  const urls = { indexURL }
  const context = {
    movies,
    urls,
  }
  res.render('movies/index', context)
}

function register(req, res) {
  res.render('movies/register')
}

module.exports = {
  index,
  register,
}
