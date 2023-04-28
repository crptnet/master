const profilePictureFilterMiddleware = (req, file, cb) => {
    
    if ((file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg")) {
        cb(null, true)
    } 
    else {
        cb(new Error('Validation error'), false)
    }
}

module.exports = profilePictureFilterMiddleware;