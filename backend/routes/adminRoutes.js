const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

// Admin login route
router.post('/login', adminController.login)

// Admin register route
router.post('/register', adminController.register)

module.exports = router
