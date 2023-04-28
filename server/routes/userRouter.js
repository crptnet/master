const express = require('express')
const router = express.Router()
const {    
    registerUser,
    loginUser,
    getUser,
    deleteUser
} = require('../controllers/userController')
const validateToken = require('../middleware/validateToken')

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/current', validateToken,getUser)

router.post('/profile')

router.delete('/delete', validateToken, deleteUser)

module.exports = router
