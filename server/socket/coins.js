///coin API v1 combined in one file
///Look through

const express = require('express')
const app = express()
const { Server } = require('socket.io')
const http = require('http')
const cors = require('cors')
const WebSocket = require('ws')
//In-memory DB to store coin data in real time
const redis = require('redis')
const path = require('path')

app.use(cors())
app.use(express.json());

const server = http.createServer(app)
server.listen(5000, () => {
  console.log('server runing')
})

const redisclient = redis.createClient();
(async () => {
  await redisclient.connect();
  console.log('DB connected')
})()



app.get('/api/coins', async (req, res) =>{
  const keys = await redisclient.keys('*')
  const result = []
  for(var i = 0;i < keys.length;i++){
    await result.push(JSON.parse(await redisclient.get(keys[i])))
  }
  return res.send(result)
})

app.get('/api/coin', async (req, res) =>{
  if (Object.keys(req.query).length === 0) {
    return res.status(400).send('No search parameters provided.');
  }
  
  const symbol = req.query.symbol 
  const result_array = []
  if(typeof(symbol) !== 'object'){
    var result = await redisclient.get(`${symbol}`)
    result_array.push(JSON.parse(result))
    return await res.status(200).send(result_array)
  }
  
  for(let i = 0;i < symbol.length;i++){
    var result = await redisclient.get(`${symbol[i]}`)
    result_array.push(JSON.parse(result))
  }
  
  await res.status(200).send(result_array)
})


const io = new Server(server, {
  cors :{
    origin : 'http://localhost:3000',
    methods : ['GET', 'POST']
  }
})



io.on('connection', (socket) => {
  //console.log(socket.id)
  socket.on('subscribe', (data) =>{
    socket.join(data)
  })
})


//Hard codded trading pairs on Binance
const symbols = ["BTCUSDT@trade", "ETHUSDT@trade", "BNBUSDT@trade", "BCCUSDT@trade", "NEOUSDT@trade", "LTCUSDT@trade", "QTUMUSDT@trade", "ADAUSDT@trade", "XRPUSDT@trade", "EOSUSDT@trade", "TUSDUSDT@trade", "IOTAUSDT@trade", "XLMUSDT@trade", "ONTUSDT@trade", "TRXUSDT@trade", "ETCUSDT@trade", "ICXUSDT@trade", "VENUSDT@trade", "NULSUSDT@trade", "VETUSDT@trade", "PAXUSDT@trade", "BCHABCUSDT@trade", "BCHSVUSDT@trade", "USDCUSDT@trade", "LINKUSDT@trade", "WAVESUSDT@trade", "BTTUSDT@trade", "USDSUSDT@trade", "ONGUSDT@trade", "HOTUSDT@trade", "ZILUSDT@trade", "ZRXUSDT@trade", "FETUSDT@trade", "BATUSDT@trade", "XMRUSDT@trade", "ZECUSDT@trade", "IOSTUSDT@trade", "CELRUSDT@trade", "DASHUSDT@trade", "NANOUSDT@trade", "OMGUSDT@trade", "THETAUSDT@trade", "ENJUSDT@trade", "MITHUSDT@trade", "MATICUSDT@trade", "ATOMUSDT@trade", "TFUELUSDT@trade", "ONEUSDT@trade", "FTMUSDT@trade", "ALGOUSDT@trade", "USDSBUSDT@trade", "GTOUSDT@trade", "ERDUSDT@trade", "DOGEUSDT@trade", "DUSKUSDT@trade", "ANKRUSDT@trade", "WINUSDT@trade", "COSUSDT@trade", "NPXSUSDT@trade", "COCOSUSDT@trade", "MTLUSDT@trade", "TOMOUSDT@trade", "PERLUSDT@trade", "DENTUSDT@trade", "MFTUSDT@trade", "KEYUSDT@trade", "STORMUSDT@trade", "DOCKUSDT@trade", "WANUSDT@trade", "FUNUSDT@trade", "CVCUSDT@trade", "CHZUSDT@trade", "BANDUSDT@trade", "BUSDUSDT@trade", "BEAMUSDT@trade", "XTZUSDT@trade", "RENUSDT@trade", "RVNUSDT@trade", "HCUSDT@trade", "HBARUSDT@trade", "NKNUSDT@trade", "STXUSDT@trade", "KAVAUSDT@trade", "ARPAUSDT@trade", "IOTXUSDT@trade", "RLCUSDT@trade", "MCOUSDT@trade", "CTXCUSDT@trade", "BCHUSDT@trade", "TROYUSDT@trade", "VITEUSDT@trade", "FTTUSDT@trade", "BUSDTRY@trade", "USDTTRY@trade", "USDTRUB@trade", "EURUSDT@trade", "OGNUSDT@trade", "DREPUSDT@trade", "BULLUSDT@trade", "BEARUSDT@trade", "ETHBULLUSDT@trade", "ETHBEARUSDT@trade", "TCTUSDT@trade", "WRXUSDT@trade", "BTSUSDT@trade", "LSKUSDT@trade", "BNTUSDT@trade", "LTOUSDT@trade", "EOSBULLUSDT@trade", "EOSBEARUSDT@trade", "XRPBULLUSDT@trade", "XRPBEARUSDT@trade", "STRATUSDT@trade", "AIONUSDT@trade", "MBLUSDT@trade", "COTIUSDT@trade", "BNBBULLUSDT@trade", "BNBBEARUSDT@trade", "STPTUSDT@trade", "USDTZAR@trade", "WTCUSDT@trade", "DATAUSDT@trade", "XZCUSDT@trade", "SOLUSDT@trade", "USDTIDRT@trade", "CTSIUSDT@trade", "HIVEUSDT@trade", "CHRUSDT@trade", "BTCUPUSDT@trade", "BTCDOWNUSDT@trade", "GXSUSDT@trade", "ARDRUSDT@trade", "LENDUSDT@trade", "MDTUSDT@trade", "STMXUSDT@trade", "KNCUSDT@trade", "REPUSDT@trade", "LRCUSDT@trade", "PNTUSDT@trade", "USDTUAH@trade", "COMPUSDT@trade", "USDTBIDR@trade", "BKRWUSDT@trade", "SCUSDT@trade", "ZENUSDT@trade", "SNXUSDT@trade", "ETHUPUSDT@trade", "ETHDOWNUSDT@trade", "ADAUPUSDT@trade", "ADADOWNUSDT@trade", "LINKUPUSDT@trade", "LINKDOWNUSDT@trade", "VTHOUSDT@trade", "DGBUSDT@trade", "GBPUSDT@trade", "SXPUSDT@trade", "MKRUSDT@trade", "DAIUSDT@trade", "DCRUSDT@trade", "STORJUSDT@trade", "BNBUPUSDT@trade", "BNBDOWNUSDT@trade", "XTZUPUSDT@trade", "XTZDOWNUSDT@trade", "USDTBKRW@trade", "MANAUSDT@trade", "AUDUSDT@trade", "YFIUSDT@trade", "BALUSDT@trade", "BLZUSDT@trade", "IRISUSDT@trade", "KMDUSDT@trade", "USDTDAI@trade", "JSTUSDT@trade", "SRMUSDT@trade", "ANTUSDT@trade", "CRVUSDT@trade", "SANDUSDT@trade", "OCEANUSDT@trade", "NMRUSDT@trade", "DOTUSDT@trade", "LUNAUSDT@trade", "RSRUSDT@trade", "PAXGUSDT@trade", "WNXMUSDT@trade", "TRBUSDT@trade", "BZRXUSDT@trade", "SUSHIUSDT@trade", "YFIIUSDT@trade", "KSMUSDT@trade", "EGLDUSDT@trade", "DIAUSDT@trade", "RUNEUSDT@trade", "FIOUSDT@trade", "UMAUSDT@trade", "EOSUPUSDT@trade", "EOSDOWNUSDT@trade", "TRXUPUSDT@trade", "TRXDOWNUSDT@trade", "XRPUPUSDT@trade", "XRPDOWNUSDT@trade", "DOTUPUSDT@trade", "DOTDOWNUSDT@trade", "USDTNGN@trade", "BELUSDT@trade", "WINGUSDT@trade", "LTCUPUSDT@trade", "LTCDOWNUSDT@trade", "UNIUSDT@trade", "NBSUSDT@trade", "OXTUSDT@trade", "SUNUSDT@trade", "AVAXUSDT@trade", "HNTUSDT@trade", "FLMUSDT@trade", "UNIUPUSDT@trade", "UNIDOWNUSDT@trade", "ORNUSDT@trade", "UTKUSDT@trade", "XVSUSDT@trade", "ALPHAUSDT@trade", "USDTBRL@trade", "AAVEUSDT@trade", "NEARUSDT@trade", "SXPUPUSDT@trade", "SXPDOWNUSDT@trade", "FILUSDT@trade", "FILUPUSDT@trade", "FILDOWNUSDT@trade", "YFIUPUSDT@trade", "YFIDOWNUSDT@trade", "INJUSDT@trade", "AUDIOUSDT@trade", "CTKUSDT@trade", "BCHUPUSDT@trade", "BCHDOWNUSDT@trade", "AKROUSDT@trade", "AXSUSDT@trade", "HARDUSDT@trade", "DNTUSDT@trade", "STRAXUSDT@trade", "UNFIUSDT@trade", "ROSEUSDT@trade", "AVAUSDT@trade", "XEMUSDT@trade", "AAVEUPUSDT@trade", "AAVEDOWNUSDT@trade", "SKLUSDT@trade", "SUSDUSDT@trade", "SUSHIUPUSDT@trade", "SUSHIDOWNUSDT@trade", "XLMUPUSDT@trade", "XLMDOWNUSDT@trade", "GRTUSDT@trade", "JUVUSDT@trade", "PSGUSDT@trade", "USDTBVND@trade", "1INCHUSDT@trade", "REEFUSDT@trade", "OGUSDT@trade", "ATMUSDT@trade", "ASRUSDT@trade", "CELOUSDT@trade", "RIFUSDT@trade", "BTCSTUSDT@trade", "TRUUSDT@trade", "CKBUSDT@trade", "TWTUSDT@trade", "FIROUSDT@trade", "LITUSDT@trade", "SFPUSDT@trade", "DODOUSDT@trade", "CAKEUSDT@trade", "ACMUSDT@trade", "BADGERUSDT@trade", "FISUSDT@trade", "OMUSDT@trade", "PONDUSDT@trade", "DEGOUSDT@trade", "ALICEUSDT@trade", "LINAUSDT@trade", "PERPUSDT@trade", "RAMPUSDT@trade", "SUPERUSDT@trade", "CFXUSDT@trade", "EPSUSDT@trade", "AUTOUSDT@trade", "TKOUSDT@trade", "PUNDIXUSDT@trade", "TLMUSDT@trade", "1INCHUPUSDT@trade", "1INCHDOWNUSDT@trade", "BTGUSDT@trade", "MIRUSDT@trade", "BARUSDT@trade", "FORTHUSDT@trade", "BAKEUSDT@trade", "BURGERUSDT@trade", "SLPUSDT@trade", "SHIBUSDT@trade", "ICPUSDT@trade", "ARUSDT@trade", "POLSUSDT@trade", "MDXUSDT@trade", "MASKUSDT@trade", "LPTUSDT@trade", "NUUSDT@trade", "XVGUSDT@trade", "ATAUSDT@trade", "GTCUSDT@trade", "TORNUSDT@trade", "KEEPUSDT@trade", "ERNUSDT@trade", "KLAYUSDT@trade", "PHAUSDT@trade", "BONDUSDT@trade", "MLNUSDT@trade", "DEXEUSDT@trade", "C98USDT@trade", "CLVUSDT@trade", "QNTUSDT@trade", "FLOWUSDT@trade", "TVKUSDT@trade", "MINAUSDT@trade", "RAYUSDT@trade", "FARMUSDT@trade", "ALPACAUSDT@trade", "QUICKUSDT@trade", "MBOXUSDT@trade", "FORUSDT@trade", "REQUSDT@trade", "GHSTUSDT@trade", "WAXPUSDT@trade", "TRIBEUSDT@trade", "GNOUSDT@trade", "XECUSDT@trade", "ELFUSDT@trade", "DYDXUSDT@trade", "POLYUSDT@trade", "IDEXUSDT@trade", "VIDTUSDT@trade", "USDPUSDT@trade", "GALAUSDT@trade", "ILVUSDT@trade", "YGGUSDT@trade", "SYSUSDT@trade", "DFUSDT@trade", "FIDAUSDT@trade", "FRONTUSDT@trade", "CVPUSDT@trade", "AGLDUSDT@trade", "RADUSDT@trade", "BETAUSDT@trade", "RAREUSDT@trade", "LAZIOUSDT@trade", "CHESSUSDT@trade", "ADXUSDT@trade", "AUCTIONUSDT@trade", "DARUSDT@trade", "BNXUSDT@trade", "RGTUSDT@trade", "MOVRUSDT@trade", "CITYUSDT@trade", "ENSUSDT@trade", "KP3RUSDT@trade", "QIUSDT@trade", "PORTOUSDT@trade", "POWRUSDT@trade", "VGXUSDT@trade", "JASMYUSDT@trade", "AMPUSDT@trade", "PLAUSDT@trade", "PYRUSDT@trade", "RNDRUSDT@trade", "ALCXUSDT@trade", "SANTOSUSDT@trade", "MCUSDT@trade", "ANYUSDT@trade", "BICOUSDT@trade", "FLUXUSDT@trade", "FXSUSDT@trade", "VOXELUSDT@trade", "HIGHUSDT@trade", "CVXUSDT@trade", "PEOPLEUSDT@trade", "OOKIUSDT@trade", "SPELLUSDT@trade", "USTUSDT@trade", "JOEUSDT@trade", "ACHUSDT@trade", "IMXUSDT@trade", "GLMRUSDT@trade", "LOKAUSDT@trade", "SCRTUSDT@trade", "API3USDT@trade", "BTTCUSDT@trade", "ACAUSDT@trade", "ANCUSDT@trade", "XNOUSDT@trade", "WOOUSDT@trade", "ALPINEUSDT@trade", "TUSDT@trade", "ASTRUSDT@trade", "NBTUSDT@trade", "GMTUSDT@trade", "KDAUSDT@trade", "APEUSDT@trade", "BSWUSDT@trade", "BIFIUSDT@trade", "MULTIUSDT@trade", "STEEMUSDT@trade", "MOBUSDT@trade", "NEXOUSDT@trade", "REIUSDT@trade", "GALUSDT@trade", "LDOUSDT@trade", "EPXUSDT@trade", "OPUSDT@trade", "LEVERUSDT@trade", "STGUSDT@trade", "LUNCUSDT@trade", "ETHUSD@trade"]

var binanceSocketUri = 'wss://stream.binance.com:9443/ws'
  
for(let i = 0;i < symbols.length;i++){
  binanceSocketUri += '/' + symbols[i].toLowerCase()
}
const binanceSocket = new WebSocket(binanceSocketUri)

binanceSocket.on('message', async (event) =>{
  //console.log(JSON.parse(event))
  event = JSON.parse(event)
  
  io.to(event.s).emit('price_update', (event))
  await redisclient.set(event.s, JSON.stringify(event))
  
})

