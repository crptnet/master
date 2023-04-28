const express = require('express')
const app = express()
const env = require('dotenv').config()
const connectToDb = require('./config/connectDB')
const redisClient = require('./config/connectRedis')
const errorHandler = require('./middleware/errorHandler')
app.use(errorHandler)
app.use(express.static('public'));

connectToDb()

redisClient.emit('connect')

const PORT = 5000

app.use(express.json());
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/watchListRouter'))

app.post('/upload', (req, res) => {
    // Get the file that was set to our field named "image"
    const { image } = req.files;

    // If no image submitted, exit
    if (!image) return res.sendStatus(400);

    // If does not have image mime type prevent from uploading
    if (/^image/.test(image.mimetype)) return res.sendStatus(400);

    // Move the uploaded image to our upload folder
    image.mv(__dirname + '/upload/' + image.name);

    // All good
    res.json().sendStatus(200);
});



app.listen(PORT, () =>{console.log('server started')})
