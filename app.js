const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()
const session = require('express-session')
const hbs = require('express-handlebars')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })

//Routes
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.engine(
  'hbs',
  hbs.engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layout/',
    partialsDir: __dirname + '/views/partials/',
    helpers: {
      multiply: (value1, value2) => value1 * value2,
      add: (value1, value2) => value1 + value2,
      indexUpdate: (value) => value + 1,
      eq: (value1, value2) => value1 === value2,
      arrayLen: (array) => array.length,
    },
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  session({
    secret: 'process.env.SESSION_KEY',
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: true,
    saveUninitialized: true,
  })
)

//Cache-control
app.use((req, res, next) => {
  res.set('cache-control', 'no-store')
  next()
})

app.use('/', userRouter)
app.use('/admin', adminRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
