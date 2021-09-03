function index(req, res) {
  res.render('movies/index', { title: 'jinsu' })
}

module.exports = {
  index,
}
