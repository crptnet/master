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
    updateActiveStatus,
    changePasswordRequest,
    changePassword,
    changeEmailRequest,
    changeEmail,
    getUserInfoForActivation,
    resendActiveStatus,
    changePasswordByToken,
} = require('../controllers/userController')
// const {
//   googleSignIn
// } = require('../controllers/GoogleAuthController')

//const validateGoogleToken = require('../middleware/googleAuthHandler')
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
        fileSize: 8*1024*1024,
    },
    fileFilter : fileFilterMiddleware
    
})



//router.get('/email-active', validateGoogleToken, )

router.get('/current', validateToken,getUser)

router.get('/profile-picture', validateToken, getProfilePicture)

router.get('/user-profile-picture/:username', getProfilePictureByUserName)

router.get('/active', getUserInfoForActivation)

router.post('/register', registerUser)

//router.post('/googleSingIn', googleSignIn)

router.post('/active', validateToken, resendActiveStatus)

router.post('/login', loginUser)

router.post('/change-email', validateToken, changeEmailRequest)

router.post('/profile-picture', validateToken, upload.single('profilePicture'), setProfilePicture)

router.post('/change-password', changePasswordRequest)

router.put('/change-password', changePassword)

router.put('/change-email', validateToken, changeEmail)

router.put('/activate', updateActiveStatus)

router.put('/change-password-authed', validateToken, changePasswordByToken)

router.delete('/profile-picture', validateToken, deleteProfilePicture)

router.delete('/delete', validateToken, deleteUser)


module.exports = router
