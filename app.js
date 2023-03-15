// initialize packages
require('dotenv').config()

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const connectDB = require('./server/config/db')

// store login session
const session = require('express-session')

const passport = require('passport')
const MongoStore = require('connect-mongo')

// create express app and running port
const app = express()
const port = 5000 || process.env.PORT

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
    // add session storage limit for created accounts
    cookie: { maxAge: new Date(Date.now() + 3600000) },
  })
)

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

// add middlewares for passing maybe forms and data through pages
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(methodOverride(' _method '))

// connect to database
connectDB()

// static files
app.use(express.static('public'))

// set templating engine
app.use(expressLayouts)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

// ROUTES
app.use('/', require('./server/routes/auth'))
app.use('/', require('./server/routes/index'))
app.use('/', require('./server/routes/dashboard'))
app.use('/', require('./server/routes/access-denied'))

// Handle 404
app.get('*', (req, res) => {
  res.status(404).render('404')
})

// // handle acccess denied
// app.get('/access-denied', (req, res) => {
//   res.status('401').render('401')
// })

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})
