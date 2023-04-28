const express = require('express')
const app = express()
const env = require('dotenv').config()
const connectToDb = require('./config/connectDB')
const redisClient = require('./config/connectRedis')
const errorHandler = require('./middleware/errorHandler')
const path = require('path');
const { ConnectionPoolClosedEvent } = require('mongodb')


app.use(errorHandler)

connectToDb()

redisClient.emit('connect')

const PORT = 5000

app.use(express.json());
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/watchListRouter'))


app.listen(PORT, () =>{console.log('server started')})
