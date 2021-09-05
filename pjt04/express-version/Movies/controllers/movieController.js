const models = require('../models/index')

const indexURL = '/movies'
const registerURL = '/movies/register'
const createURL = '/movies/create'
const detailURL = '/movies/detail'
const editURL = '/movies/edit'
const updateURL = '/movies/update'
const deleteURL = '/movies/delete'

async function index(req, res) {
  const rows = await models.movie.findAll()
  const movies = rows.map((row) => row.dataValues)
  movies.forEach((movie) => (movie.detailURL = detailURL + '/' + movie.id))
  const urls = { indexURL, registerURL }
  const context = {
    movies,
    urls,
    csrfToken: req.csrfToken(),
  }
  return res.render('movies/index', context)
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
    if (req.method === 'POST') {
      const { title, overview } = req.body
      const postPath = req.body['poster-path']
      const movie = await models.movie.create({
        title,
        overview,
        postPath,
      })
      return res.redirect(detailURL + '/' + movie.dataValues.id)
    }
    return res.redirect(indexURL)
  } catch (error) {
    console.log(error)
    res.redirect(indexURL)
  }
}

async function detail(req, res) {
  try {
    const { id } = req.params
    const row = await models.movie.findAll({ where: { id: id } })
    const movie = row[0].dataValues
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
    const row = await models.movie.findAll({ where: { id: id } })

    const movie = row[0].dataValues
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
    if (req.method === 'POST') {
      const { id } = req.params
      const { title, overview } = req.body
      const postPath = req.body['poster-path']
      await models.movie.update(
        {
          title,
          overview,
          postPath,
        },
        {
          where: {
            id: id,
          },
        }
      )
      return res.redirect(detailURL + '/' + id)
    }
    res.redirect(indexURL)
  } catch (error) {
    console.log(error.message)
    res.redirect(indexURL)
  }
}

async function deleteMovie(req, res) {
  try {
    if (req.method === 'POST') {
      const { id } = req.params
      await models.movie.destroy({
        where: {
          id: id,
        },
      })
      return res.redirect(indexURL)
    }
    res.redirect(indexURL)
  } catch (error) {
    console.log(error.message)
    res.redirect(indexURL)
  }
}

module.exports = { index, register, create, detail, edit, update, deleteMovie }
