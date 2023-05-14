const express = require('express')
const app = express()
const cors = require('cors')
const env = require('dotenv').config()
const connectToDb = require('./config/connectDB')
const errorHandler = require('./middleware/errorHandler')
const path = require('path');
const { UpdataInfoRun } = require('./controllers/coinSocketController')
var http = require('http');
var https = require('https');


const bodyParser = require('body-parser');
const corsOptions ={
    origin:'*', 
    credentials:true,          
    optionSuccessStatus:200,
 }

app.use(errorHandler)
app.use(cors(corsOptions))

connectToDb()
UpdataInfoRun()
//startParse()

const PORT = 5000 || process.env.PORT

app.use(bodyParser.json());
app.use(express.json());

app.use('/api', require('./routes/coinsRouter'))

app.use('/api', require('./routes/userRouter'))

app.use('/api', require('./routes/watchListRouter'))


app.use('/upload', express.static(path.join(__dirname, 'uploads')))
app.use('/coin-icon', express.static(path.join(__dirname, 'coin_icon')))

app.use('/*', (req, res) => {res.sendStatus(404)})

var httpServer = http.createServer(app);

httpServer.listen(PORT, () =>{console.log(`Server started on port ${PORT}`)})