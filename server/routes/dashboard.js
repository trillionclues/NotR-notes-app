const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middleware/checkAuth')
const dashboardController = require('../controllers/dashboardController')

// Dashboard ROUTES
router.get('/dashboard', isLoggedIn, dashboardController.dashboard)

module.exports = router

// using the isLoggedIn function helps protect that page from illegal login
