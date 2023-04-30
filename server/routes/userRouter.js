const express = require('express')
const router = express.Router()
const {    
    registerUser,
    loginUser,
    getUser,
    deleteUser,
    setProfilePicture,
    getProfilePicture,
    getProfilePictureByUserName,
    deleteProfilePicture,
    updateActiveStatus
    
} = require('../controllers/userController')
const user = require('../models/userModel')
const validateToken = require('../middleware/validateToken')
const fileFilterMiddleware = require('../middleware/multerHandler')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
  })
const upload = multer({ 
    storage : storage,
    limits:{
        fileSize: 108*1024,
    },
    fileFilter : fileFilterMiddleware
    
})

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/current', validateToken,getUser)

router.post('/profilePicture', validateToken, upload.single('profilePicture'), setProfilePicture)

router.get('/profilePicture', validateToken, getProfilePicture)

router.delete('/profilePicture', validateToken, deleteProfilePicture)

router.get('/userProfilePicture/:username', getProfilePictureByUserName)

router.delete('/delete', validateToken, deleteUser)

router.put('activate/:key', updateActiveStatus)

module.exports = router
