const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')

const movieRouter = require('./Movies/routes/movies')

const app = express()
const port = 3000

app.engine(
  'hbs',
  hbs({
    extname: 'hbs',
    defaultLayout: 'base',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
  })
)
app.set('view engine', 'hbs')

app.use('/movies', movieRouter)

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
