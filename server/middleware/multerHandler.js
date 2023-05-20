const profilePictureFilterMiddleware = (req, file, cb) => {
    console.log('Got new image')
    if ((file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg")) {
        cb(null, true)
    } 
    else {
        console.log('Validation error')
        cb(new Error('Validation error'), false)
    }
}

module.exports = profilePictureFilterMiddleware;