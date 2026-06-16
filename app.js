const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/web/index')
const authRouter = require('./routes/web/auth')
const session = require('express-session')
const app = express()

const accountApiRouter = require('./routes/api/account')
const authApiRouter = require('./routes/api/auth')

const { DB_HOST, DB_PORT, DB_NAME } = require('./config/config')
const MongoStore = require('connect-mongo').default
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    name: 'sid',
    secret: '123456', // 加密session的密钥
    saveUninitialized: false, // 不保存未初始化的session
    resave: true, // 无论session是否修改，都重新保存session
    store: MongoStore.create({
      mongoUrl: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    }),
    cookie: {
      httpOnly: true, // 仅通过http传输，不通过js访问
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7天过期
    },
  })
)

app.use('/', indexRouter)
app.use('/', authRouter)
app.use('/api', accountApiRouter)
app.use('/api', authApiRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.render('404')
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error', { msg: err.message, url: '/' })
})

module.exports = app
