const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middleware/checkAuth')
const dashboardController = require('../controllers/dashboardController')

// Dashboard ROUTES
router.get('/dashboard', isLoggedIn, dashboardController.dashboard)
router.get(
  '/dashboard/item/:id',
  isLoggedIn,
  dashboardController.dashboardViewNote
)
router.post(
  '/dashboard/item/:id',
  isLoggedIn,
  dashboardController.dashboardUpdateNote
)
router.delete(
  '/dashboard/item/:id',
  isLoggedIn,
  dashboardController.dashboardDeleteNote
)
router.get(
  '/dashboard/create-note',
  isLoggedIn,
  dashboardController.dashboardCreateNote
)
router.post(
  '/dashboard/create-note',
  isLoggedIn,
  dashboardController.dashboardCreateNotePost
)
router.get(
  '/dashboard/search-note',
  isLoggedIn,
  dashboardController.dashboardSearchNote
)

router.post(
  '/dashboard/search-note',

  isLoggedIn,
  dashboardController.dashboardSearchSubmit
)

module.exports = router

// using the isLoggedIn function helps protect that page from illegal login
