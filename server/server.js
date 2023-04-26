const express = require('express')
const app = express()
const env = require('dotenv').config()
const connectToDb = require('./config/connectDB')
const errorHandler = require('./middleware/errorHandler')

connectToDb()

const PORT = 5000

app.use(express.json());
app.use('/api/coins', require('./routes/coinsRouter'))
app.use('/api', require('./routes/userRouter'))
app.use(errorHandler)

app.listen(PORT, () =>{console.log('server started')})
