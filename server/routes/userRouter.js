const express = require('express')
const router = express.Router()
const {    
    registerUser,
    loginUser,
    getUser,
    deleteUser,
    setProfilePicture,
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
const {
  googleSignIn
} = require('../controllers/GoogleAuthController')

const validateGoogleToken = require('../middleware/googleAuthHandler')
const validateToken = require('../middleware/validateToken')
const fileFilterMiddleware = require('../middleware/multerHandler')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      console.log('Uploaded new Image')
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
  })
const upload = multer({ 
  storage : storage,
  onFileUploadStart: function (file) {
    console.log(file.fieldname + ' is starting ...')
  },
  onFileUploadData: function (file, data) {
    console.log(data.length + ' of ' + file.fieldname + ' arrived')
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
  },
  limits:{
      fileSize: 8*1024*1024,
  },
  fileFilter : fileFilterMiddleware
    
})

router.get('/email-active', validateGoogleToken, )

router.get('/current', validateToken,getUser)

router.get('/active', getUserInfoForActivation)

router.post('/register', registerUser)

router.post('/googleSingIn', validateGoogleToken, googleSignIn)

router.post('/active', validateToken, resendActiveStatus)

router.post('/login', loginUser)

router.post('/change-email', validateToken, changeEmailRequest)

router.post('/profile-picture', validateToken, () => {
  console.log('Trying to upload picture')
  console.log(upload.single('profilePicture'))

}, setProfilePicture)

router.post('/change-password', changePasswordRequest)

router.put('/change-password', changePassword)

router.put('/change-email', validateToken, changeEmail)

router.put('/activate', updateActiveStatus)

router.put('/change-password-authed', validateToken, changePasswordByToken)

router.delete('/profile-picture', validateToken, deleteProfilePicture)

router.delete('/delete', validateToken, deleteUser)


module.exports = router
