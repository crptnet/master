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
        fileSize: 8*1024,
    },
    fileFilter : fileFilterMiddleware
    
})

router.post('/register', registerUser)

router.put('/activate', updateActiveStatus)

router.post('/login', loginUser)

router.get('/email-active', )

router.get('/current', validateToken,getUser)

router.post('/profile-picture', validateToken, upload.single('profilePicture'), setProfilePicture)

router.get('/profile-picture', validateToken, getProfilePicture)

router.delete('/profile-picture', validateToken, deleteProfilePicture)

router.get('/user-profile-picture/:username', getProfilePictureByUserName)

router.delete('/delete', validateToken, deleteUser)


module.exports = router
