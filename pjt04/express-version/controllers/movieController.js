const models = require('../models/index')

const indexURL = '/movies'
const registerURL = '/movies/register'
const createURL = '/movies/create'
const detailURL = '/movies/detail'
const editURL = '/movies/edit'
const updateURL = '/movies/update'
const deleteURL = '/movies/delete'

async function index(req, res) {
  try {
    const rows = await models.movie.findAll({
      order: [['id', 'DESC']],
    })
    const movies = rows.map((row) => row.dataValues)
    movies.forEach((movie) => (movie.detailURL = detailURL + '/' + movie.id))
    const urls = { indexURL, registerURL }
    const context = {
      movies,
      urls,
    }
    return res.render('movies/index', context)
  } catch (error) {
    console.log(error.message)
    res.status(404).send()
  }
}

function register(req, res) {
  const context = {
    urls: { indexURL, registerURL, createURL },
    csrfToken: req.csrfToken(),
  }
  return res.render('movies/register', context)
}

async function create(req, res) {
  try {
    const { title, overview } = req.body
    const posterPath = req.body['poster-path']
    const movie = await models.movie.create({
      title,
      overview,
      posterPath,
    })
    return res.redirect(detailURL + '/' + movie.dataValues.id)
  } catch (error) {
    console.log(error)
    res.redirect(indexURL)
  }
}

async function detail(req, res) {
  try {
    const { id } = req.params
    const row = await models.movie.findByPk(id)
    if (row === null) {
      return res.status(404).send('Page not found')
    }
    const movie = row.dataValues
    const context = {
      urls: { indexURL, registerURL, editURL, deleteURL },
      movie,
      csrfToken: req.csrfToken(),
    }

    return res.render('movies/detail', context)
  } catch (error) {
    console.error(error.message)
  }
}

async function edit(req, res) {
  try {
    const { id } = req.params
    const row = await models.movie.findByPk(id)
    if (row === null) {
      return res.status(404).send('Page not found')
    }
    const movie = row.dataValues
    const context = {
      urls: { indexURL, registerURL, updateURL },
      movie,
      csrfToken: req.csrfToken(),
    }
    return res.render('movies/edit', context)
  } catch (error) {
    console.error(error.message)
  }
}

async function update(req, res) {
  try {
    const { id } = req.params
    const { title, overview } = req.body
    const posterPath = req.body['poster-path']
    await models.movie.update(
      {
        title,
        overview,
        posterPath,
      },
      {
        where: {
          id: id,
        },
      }
    )
    return res.redirect(detailURL + '/' + id)
  } catch (error) {
    console.log(error.message)
    res.redirect(indexURL)
  }
}

async function deleteMovie(req, res) {
  try {
    const { id } = req.params
    await models.movie.destroy({
      where: {
        id: id,
      },
    })
    return res.redirect(indexURL)
  } catch (error) {
    console.log(error.message)
    res.redirect(indexURL)
  }
}

module.exports = { index, register, create, detail, edit, update, deleteMovie }
