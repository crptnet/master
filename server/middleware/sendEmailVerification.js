// // Create a nodemailer transporter object with your email service provider settings
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASS
//     }
// });

// const fileFilterMiddleware = require('../middleware/multerHandler')
// const multer = require('multer');
// const { decode } = require('punycode');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
//     }
// })

// const emailSendHandler = (email, next) =>{
// // Create a nodemailer transporter object with your email service provider settings
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.EMAIL_PASS
//     }
//   });
  
//   const fileFilterMiddleware = require('../middleware/multerHandler')
//   const multer = require('multer');
//   const { decode } = require('punycode');
//   const storage = multer.diskStorage({
//       destination: function (req, file, cb) {
//         cb(null, './uploads/')
//       },
//       filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
//       }
//     })


// }

