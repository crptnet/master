const express = require('express');
const app = express();
const cors = require('cors');
const env = require('dotenv').config();
const connectToDb = require('./config/connectDB');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');
const { UpdataInfoRun } = require('./controllers/coinSocketController');
const { resetAtMidnight } = require('./controllers/userAPIKeysController');
const onConnection = require('./config/socket.io');

const httpServer = require('http').createServer(app);

const corsOptions = {
  origin: ['http://localhost:3000', 'http://4.210.226.112.nip.io/', 'http://4.210.226.112.nip.io/'],
  credentials: false,
  optionSuccessStatus: 200,
};
const io = require('socket.io')(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://4.210.226.112.nip.io/', 'http://4.210.226.112.nip.io/'],
    credentials: true,
  },
});



onConnection(io);
resetAtMidnight();
app.use(errorHandler);
app.use(cors(corsOptions));

connectToDb();
UpdataInfoRun(io);



app.use((req, res, next) => {
  if (req.originalUrl == '/api/stripe_webhook') {
    next(); // Do nothing with the body because I need it in a raw state.
  } else {
    express.json()(req, res, next); // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
  }
});

app.use('/api', require('./routes/subscriptionRouter'));
app.use('/api', require('./routes/coinsRouter'));
app.use('/api', require('./routes/userRouter'));
app.use('/api', require('./routes/watchListRouter'));
app.use('/api', require('./routes/APIKeysRouter'))
app.use('/api', require('./routes/2faRouter'))
app.use('/upload', express.static(path.join(__dirname, 'uploads')));
app.use('/coin-icon', express.static(path.join(__dirname, 'coin_icon')));
app.use('/*', (req, res) => {
  res.status(404).end();
});


const PORT = 5000 || process.env.PORT;

httpServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
