// check access denied
const express = require('express')
const router = express.Router()
const accessController = require('../controllers/accessController')

// ACCESS DENIED ROUTES
router.get('/access-denied', accessController.accessDenied)

module.exports = router
