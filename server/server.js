const express = require('express')
const app = express()
const cors = require('cors')
const env = require('dotenv').config()
const connectToDb = require('./config/connectDB')
const errorHandler = require('./middleware/errorHandler')
const path = require('path');
const { UpdataInfoRun } = require('./controllers/coinSocketController')
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

const onConnection = (socket) =>{
    socket.on('subscribe', (data) => {
          console.log((new Date).toLocaleTimeString(),': Received socket ID:', socket.id, 'data', data)
          data.forEach(key => {
                socket.join(key.symbol)
          });
          socket.emit( 'subscribed', { message : `subscribed on ${JSON.stringify(data)}` })
    });
    }


io.on("connection", errorHandler, onConnection);


const bodyParser = require('body-parser');
const corsOptions ={
    origin:'*', 
    credentials:true,          
    optionSuccessStatus:200,
 }

app.use(errorHandler)
app.use(cors(corsOptions))

connectToDb()
UpdataInfoRun(io)
//startParse()

const PORT = 5000 || process.env.PORT

app.use(bodyParser.json());
app.use(express.json());

app.use('/api', require('./routes/coinsRouter'))

app.use('/api', require('./routes/subscriptionRouter'))

app.use('/api', require('./routes/userRouter'))

app.use('/api', require('./routes/watchListRouter'))


app.use('/upload', express.static(path.join(__dirname, 'uploads')))
app.use('/coin-icon', express.static(path.join(__dirname, 'coin_icon')))

app.use('/*', (req, res) => {res.sendStatus(404)})


httpServer.listen(PORT, () =>{ console.log(`Server started on port ${PORT}`) })