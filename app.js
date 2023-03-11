// initialize packages
require('dotenv').config()

const express = require('express')

const expressLayouts = require('express-ejs-layouts')

// create express app and running port
const app = express()
const port = 5000 || process.env.PORT

// add middlewares for passing maybe forms and data through pages
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// static files
app.use(express.static('public'))

// set templating engine
app.use(expressLayouts)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

// ROUTES

app.use('/', require('./server/routes/index'))
app.use('/', require('./server/routes/dashboard'))

// Handle 404
app.get('*', (req, res) => {
  res.status('404').render('404')
})

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})
