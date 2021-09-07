const express = require('express')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const helmet = require('helmet')
const hbs = require('express-handlebars')

const models = require('./models/index')
const path = require('path')

const movieRouter = require('./routes/movies')

class Server {
  constructor() {
    const app = express()
    this.app = app
  }

  async setDB() {
    try {
      await models.sequelize.sync()
      console.log('Connection has been established successfully.')
    } catch (err) {
      console.error('Unable to connect to the database:', err)
    }
  }

  setViewEngine() {
    this.app.engine(
      'hbs',
      hbs({
        extname: 'hbs',
        defaultLayout: 'base',
        layoutsDir: path.join(__dirname, 'views', 'layouts'),
      })
    )
    this.app.set('view engine', 'hbs')
  }

  setRotuer() {
    this.app.use('/movies', movieRouter)
  }

  setMiddleware() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieParser())
    this.app.use(csrf({ cookie: true }))
    this.app.use(helmet())

    this.setRotuer()
  }

  listen() {
    this.setDB()
    this.setMiddleware()
    this.setViewEngine()
    const port = 3000
    this.app.listen(port, () => {
      console.log(`Start server listening at http://localhost:${port}`)
    })
  }
}

function init() {
  const server = new Server()
  server.listen()
}

init()
