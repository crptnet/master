const express = require('express')
const app = express()
const cors = require('cors')
const env = require('dotenv').config()
const connectToDb = require('./config/connectDB')
const redisClient = require('./config/connectRedis')
const errorHandler = require('./middleware/errorHandler')
const path = require('path');
const { ConnectionPoolClosedEvent } = require('mongodb')
const bodyParser = require('body-parser');
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

app.use(errorHandler)
app.use(cors(corsOptions))

connectToDb()

redisClient.emit('connect')

const PORT = 5000

app.use(bodyParser.json());
app.use(express.json());
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/watchListRouter'))
app.use('/upload', express.static(path.join(__dirname, 'uploads')))



app.listen(PORT, () =>{console.log('server started')})