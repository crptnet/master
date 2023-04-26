const express = require('express')
const router = express.Router()
const {    
} = require('../controllers/userController')
const validateToken = require('../middleware/validateToken')

router.use(validateToken)



module.exports = router
