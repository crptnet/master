const express = require('express')
const app = express()
const cors = require('cors')
const env = require('dotenv').config()
const connectToDb = require('./config/connectDB')
const errorHandler = require('./middleware/errorHandler')
const path = require('path');
const { UpdataInfoRun } = require('./controllers/coinSocketController')
const asyncHandler = require('express-async-handler')
const stripe = require('stripe')('sk_test_51N8SZTJja6fn3xLG3zzJrxGFLl44Zm6QhrwGDhlaUtPJe4Rm0u6ImoO3xOyHOrH32bZD3bOMuYwqDV1zsIpHsNju00FyWylTu5')


const corsOptions = {
      origin: '*', // Set the appropriate origin(s) here
      credentials: false,
      optionSuccessStatus: 200,
      'Access-Control-Allow-Origin' : '*'
}

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
      cors: {
            origin: 'http://localhost:3000',
            credentials : true
      }
});

const onConnection = (socket) =>{
      console.log(`connected with id: ${socket.id}`)
      socket
      .on('subscribe', (data) => {
            if (!Array.isArray(data)) {
                  socket.emit('error', { message: 'Invalid data format' });
                  return;
            }

            console.log((new Date).toLocaleTimeString(),': Received socket ID:', socket.id, 'data', data)
            try{
                  data.forEach(key => {
                        console.log(key)
                        if (key['symbol'] === undefined) {
                              // Invalid object format
                              socket.emit('error', { message: `Invalid object format ${JSON.stringify(key)}` });
                        }
                        else{
                              socket.join(key.symbol)
                              socket.emit( 'subscribed', { message : `subscribed on ${key.symbol}` })
                        }
                  });
            }
            catch(err){
                  socket.emit('error', { message: err });
            }
    });
    }


io.of('/coins').on("connection", onConnection);

app.use(errorHandler)
app.use(cors(corsOptions))

connectToDb()
UpdataInfoRun(io)

const PORT = 5000 || process.env.PORT

app.use((req, res, next) => {
      if (req.originalUrl == '/api/stripe_webhook') 
      {
            next(); // Do nothing with the body because I need it in a raw state.
      } 
      else
      {
            express.json()(req, res, next);  // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
      }
});

app.use('/api', require('./routes/subscriptionRouter'))
app.use('/api', require('./routes/coinsRouter'))
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/watchListRouter'))
app.use('/upload', express.static(path.join(__dirname, 'uploads')))
app.use('/coin-icon', express.static(path.join(__dirname, 'coin_icon')))
app.use('/*', (req, res) => {res.status(404).end()})

httpServer.listen(PORT, () =>{ console.log(`Server started on port ${PORT}`) })