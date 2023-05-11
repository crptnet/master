import React, { useState, useEffect } from "react";
import './coins.css';
import symbols from './coinList';
//import { data } from './useCoinData';

const BinanceBTC = () => {
  const [data, setData] = useState({
  BTCUSDT: { id: 1, smb: "BTCUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  ETHUSDT: { id: 2, smb: "ETHUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  USDTUSDT: { id: 3, smb: "USDTUSDT", price: "1.00", percentChange1d: "0", lowprice: "1.00", highprice: "1.00", volume: "20511465812" },
  BNBUSDT: { id: 4, smb: "BNBUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  USDCUSDT: { id: 5, smb: "USDCUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  XRPUSDT: { id: 6, smb: "XRPUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  ADAUSDT: { id: 7, smb: "ADAUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  DOGEUSDT: { id: 8, smb: "DOGEUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  MATICUSDT: { id: 9, smb: "MATICUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  SOLUSDT: { id: 10, smb: "SOLUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  DOTUSDT: { id: 11, smb: "DOTUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  BUSDUSDT: { id: 12, smb: "BUSDUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  LTCUSDT: { id: 13, smb: "LTCUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  SHIBUSDT: { id: 14, smb: "SHIBUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  TRXUSDT: { id: 15, smb: "TRXUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  AVAXUSDT: { id: 16, smb: "AVAXUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  //DAIUSDT: { id: 17, smb: "DAIUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  //WBTCUSDT: { id: 18, smb: "WBTCUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  LINKUSDT: { id: 19, smb: "LINKUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  UNIUSDT: { id: 20, smb: "UNIUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  //LEOUSDT: { id: 21, smb: "LEOUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  ATOMUSDT: { id: 22, smb: "ATOMUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  //OKBUSDT: { id: 23, smb: "OKBUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  //TONUSDT: { id: 24, smb: "TONUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  XMRUSDT: { id: 25, smb: "XMRUSDT",  price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  ETCUSDT: { id: 26, smb: "ETCUSDT",  price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  XLMUSDT: { id: 27, smb: "XLMUSDT",  price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  ICPUSDT: { id: 28, smb: "ICPUSDT",  price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  BCHUSDT: { id: 29, smb: "BCHUSDT",  price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  FILUSDT: { id: 30, smb: "FILUSDT",  price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  TUSDUSDT: { id: 31, smb: "TUSDUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  APTUSDT: { id: 32, smb: "APTUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  HBARUSDT: { id: 33, smb: "HBARUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  ARBUSDT: { id: 34, smb: "ARBUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  LDOUSDT: { id: 35, smb: "LDOUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  NEARUSDT: { id: 36, smb: "NEARUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  //CROUSDT: { id: 37, smb: "CROUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  VETUSDT: { id: 38, smb: "VETUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  APEUSDT: { id: 39, smb: "APEUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  ALGOUSDT: { id: 40, smb: "ALGOUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  QNTUSDT: { id: 41, smb: "QNTUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  GRTUSDT: { id: 42, smb: "GRTUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  FTMUSDT: { id: 43, smb: "FTMUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  EOSUSDT: { id: 44, smb: "EOSUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  SANDUSDT: { id: 45, smb: "SANDUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  MANAUSDT: { id: 46, smb: "MANAUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  AAVEUSDT: { id: 47, smb: "AAVEUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  THETAUSDT: { id: 48, smb: "THETAUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  EGLDUSDT: { id: 49, smb: "EGLDUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  //USDPUSDT: { id: 50, smb: "USDPUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  FLOWUSDT: { id: 51, smb: "FLOWUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  STXUSDT: { id: 52, smb: "STXUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  XTZUSDT: { id: 53, smb: "XTZUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  AXSUSDT: { id: 54, smb: "AXSUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  //BITUSDT: { id: 55, smb: "BITUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  RPLUSDT: { id: 56, smb: "RPLUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  CHZUSDT: { id: 57, smb: "CHZUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  IMXUSDT: { id: 58, smb: "IMXUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  CFXUSDT: { id: 59, smb: "CFXUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  //KCSUSDT: { id: 60, smb: "KCSUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  NEOUSDT: { id: 61, smb: "NEOUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  OPUSDT: { id: 62, smb: "OPUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  CRVUSDT: { id: 63, smb: "CRVUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  //USDDUSDT: { id: 64, smb: "USDDUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  MKRUSDT: { id: 65, smb: "MKRUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  KLAYUSDT: { id: 66, smb: "KLAYUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  SNXUSDT: { id: 67, smb: "SNXUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  //BSVUSDT: { id: 68, smb: "BSVUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  LUNCUSDT: { id: 69, smb: "LUNCUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  GMXUSDT: { id: 70, smb: "GMXUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  CAKEUSDT: { id: 71, smb: "CAKEUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  FXSUSDT: { id: 72, smb: "FXSUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  ZECUSDT: { id: 73, smb: "ZECUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  MINAUSDT: { id: 74, smb: "MINAUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  RNDRUSDT: { id: 75, smb: "RNDRUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  INJUSDT: { id: 76, smb: "INJUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  //HTUSDT: { id: 77, smb: "HTUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  XECUSDT: { id: 78, smb: "XECUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  //XDCUSDT: { id: 79, smb: "XDCUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  DASHUSDT: { id: 80, smb: "DASHUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  //MIOTAUSDT: { id: 81, smb: "MIOTAUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  PAXGUSDT: { id: 82, smb: "PAXGUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  //CSPRUSDT: { id: 83, smb: "CSPRUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  //GTUSDT: { id: 84, smb: "GTUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  TWTUSDT: { id: 85, smb: "TWTUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  ZILUSDT: { id: 86, smb: "ZILUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  LRCUSDT: { id: 87, smb: "LRCUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  //FLRUSDT: { id: 88, smb: "FLRUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  RUNEUSDT: { id: 89, smb: "RUNEUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  //GUSDUSDT: { id: 90, smb: "GUSDUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  WOOUSDT: { id: 91, smb: "WOOUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  AGIXUSDT: { id: 92, smb: "AGIXUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  '1INCHUSDT': { id: 93, smb: "1INCHUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  CVXUSDT: { id: 94, smb: "CVXUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  DYDXUSDT: { id: 95, smb: "DYDXUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  ENJUSDT: { id: 96, smb: "ENJUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  KAVAUSDT: { id: 97, smb: "KAVAUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  OSMOUSDT: { id: 98, smb: "OSMOUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." },
  BATUSDT: { id: 99, smb: "BATUSDT", price: "Loading...", percentChange1d: "Loading...", lowprice: "Loading...", highprice: "Loading...", volume: "Loading..." }
  });  

  function roundNumber(num) {
    if (num >= 1) {
      return num.toFixed(2);
    } else {
      const numString = num.toString();
      const numDigits = numString.length;
      for (let i = 0; i < numDigits; i++) {
        if (numString[i] === '.') {
          let j = i+1;
          while(j < numDigits && numString[j] === '0') {
            j++;
          }
          if(j+4<numDigits)
          {
            return num.toFixed(j+4-i);
          }
          else
          {
            return num;
          }
        }
      }
      return num;
    }
  }

  const [sortOrder, setSortOrder] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [flashPriceChange, setFlashPriceChange] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [coinsPerPage, setCoinsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const totalCoins = symbols.length;

  
  let sortedData = data;
  useEffect(() => {
    const socket = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${symbols.map(symbol => symbol.toLowerCase() + "usdt@ticker").join("/")}`
    );
    let loadedCoins = 0;
    socket.onmessage = (event) => {
      const rawData = JSON.parse(event.data);
      if (rawData.data.e === "24hrTicker") {
        setData(prevData => ({
          ...prevData,
          [rawData.data.s]: {
            ...prevData[rawData.data.s],
            smb: rawData.data.s,
            flash: prevData[rawData.data.s].price == "Loading..." ? "white" : (parseFloat(rawData.data.w) - prevData[rawData.data.s].price >= 0 ? '#5CC082' : '#DC4C41'),
            price: roundNumber(parseFloat(rawData.data.w)),
            percentChange1d: parseFloat(rawData.data.P).toFixed(2),
            lowprice: roundNumber(parseFloat(rawData.data.l)),
            highprice: roundNumber(parseFloat(rawData.data.h)),
            volume: (parseFloat(rawData.data.v)*parseFloat(rawData.data.w)).toFixed(0),
          }
        }));
        loadedCoins++;
        const newLoadingPercent = Math.floor((loadedCoins / totalCoins) * 100);
        setLoadingPercent(newLoadingPercent);
      }
    }
  }, []);

  const handleSort = (order) => {
    sortedData = {};
    if (order === "price-asc") {
      sortedData = Object.fromEntries(
        Object.entries(data).sort((a, b) => parseFloat(a[1].price)-parseFloat(b[1].price))
      );
    } else if (order === "price-desc") {
      sortedData = Object.fromEntries(
        Object.entries(data).sort((a, b) => parseFloat(b[1].price)-parseFloat(a[1].price))
      );
    } else if (order === "name-asc") {
      sortedData = Object.fromEntries(
        Object.entries(data).sort((a, b) => a[1].smb.localeCompare(b[1].smb))
      );
    } else if (order === "name-desc") {
      sortedData = Object.fromEntries(
        Object.entries(data).sort((a, b) => b[1].smb.localeCompare(a[1].smb))
      );
    } else if (order === "change-asc") {
      sortedData = Object.fromEntries(
        Object.entries(data).sort((a, b) => parseFloat(a[1].percentChange1d)-parseFloat(b[1].percentChange1d))
      );
    } else if (order === "change-desc") {
      sortedData = Object.fromEntries(
        Object.entries(data).sort((a, b) => parseFloat(b[1].percentChange1d)-parseFloat(a[1].percentChange1d))
      );
    } else if (order === "lowprice-asc") {
      sortedData = Object.fromEntries(
        Object.entries(data).sort((a, b) => parseFloat(a[1].lowprice)-parseFloat(b[1].lowprice))
      );
    } else if (order === "lowprice-desc") {
      sortedData = Object.fromEntries(
        Object.entries(data).sort((a, b) => parseFloat(b[1].lowprice)-parseFloat(a[1].lowprice))
      );
    } else if (order === "highprice-asc") {
      sortedData = Object.fromEntries(
        Object.entries(data).sort((a, b) => parseFloat(a[1].highprice)-parseFloat(b[1].highprice))
      );
    } else if (order === "highprice-desc") {
      sortedData = Object.fromEntries(
        Object.entries(data).sort((a, b) => parseFloat(b[1].highprice)-parseFloat(a[1].highprice))
      );
    } else if (order === "volume-asc") {
      sortedData = Object.fromEntries(
        Object.entries(data).sort((a, b) => parseFloat(a[1].volume)-parseFloat(b[1].volume))
      );
    } else if (order === "volume-desc") {
      sortedData = Object.fromEntries(
        Object.entries(data).sort((a, b) => parseFloat(b[1].volume)-parseFloat(a[1].volume))
      );
    } else if (order === "id-asc") {
      sortedData = Object.fromEntries(
        Object.entries(data).sort((a, b) => parseFloat(a[1].id)-parseFloat(b[1].id))
      );
    } else if (order === "id-desc") {
      sortedData = Object.fromEntries(
        Object.entries(data).sort((a, b) => parseFloat(b[1].id)-parseFloat(a[1].id))
      );
    }
    setData(sortedData);
    setSortOrder(order);
  };
  const handleResetSort = () => {
    let sortedData = {};
      sortedData = Object.fromEntries(
        Object.entries(data).sort((a, b) => (a[1].id)-(b[1].id))
      );
    setData(sortedData);
    setSortOrder("none");
  };
  let filteredData = Object.values(sortedData).filter(item =>
    item.smb.toLowerCase().slice(0,-4).includes(searchTerm.toLowerCase())
  );
  if (sortOrder === "price-asc") {
    filteredData = filteredData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sortOrder === "price-desc") {
    filteredData = filteredData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (sortOrder === "smb-asc") {
    filteredData = filteredData.sort((a, b) => a.smb.localeCompare(b.smb));
  } else if (sortOrder === "smb-desc") {
    filteredData = filteredData.sort((a, b) => b.smb.localeCompare(a.smb));
  } else if (sortOrder === "lowprice-asc") {
    filteredData = filteredData.sort((a, b) => parseFloat(a.lowprice) - parseFloat(b.lowprice));
  } else if (sortOrder === "lowprice-desc") {
    filteredData = filteredData.sort((a, b) => parseFloat(b.lowprice) - parseFloat(a.lowprice));
  } else if (sortOrder === "highprice-asc") {
    filteredData = filteredData.sort((a, b) => parseFloat(a.highprice) - parseFloat(b.highprice));
  } else if (sortOrder === "highprice-desc") {
    filteredData = filteredData.sort((a, b) => parseFloat(b.highprice) - parseFloat(a.highprice));
  } else if (sortOrder === "volume-asc") {
    filteredData = filteredData.sort((a, b) => parseFloat(a.volume) - parseFloat(b.volume));
  } else if (sortOrder === "volume-desc") {
    filteredData = filteredData.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  } else if (sortOrder === "id-asc") {
    filteredData = filteredData.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
  } else if (sortOrder === "id-desc") {
    filteredData = filteredData.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
  }


  const handleCoinsPerPage = (num) => {
    setCoinsPerPage(num);
    setCurrentPage(1);
  };

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = filteredData.slice(indexOfFirstCoin, indexOfLastCoin);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Create buttons for each page
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / coinsPerPage); i++) {
    pageNumbers.push(i);
  }

  const LoadingBar = () => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
      setWidth(loadingPercent);
    }, [loadingPercent]);

    return (
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${width}%` }}></div>
      </div>
    );
  };

  const NoData = () => {
    if (Object.keys(filteredData).length === 0) {
      return (
        <div><p style={{width:'calc(100vw-90px)',fontWeight:'bold'}}>No data available</p></div>
      );
    }
    return;
  }

  const renderCoins = () => {
  if (loadingPercent < 100) {
    return (
      <table>
        <tr>
          <td colSpan={7}>
            <div className="loading">
              <img
                src="./icons/logo.png"
                alt="Loading..."
                style={{ opacity: loadingPercent / 100 }}
                className={'loading-image'}
              />
              <LoadingBar />
            </div>
          </td>
        </tr>
      </table>
    );
  } else { 
      return (
        <>
        <input className="input-search" placeholder="Search coins" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <table>
          <thead>
            <tr className="blueHigh">
              <th>
                <p>
                  Id
                </p>
                <div>
                  <button
                    onClick={() => {
                      if (sortOrder === "id-asc") {
                        handleResetSort();
                      } else {
                        handleSort("id-asc");
                      }
                      setActiveButton(activeButton === "id-asc" ? null : "id-asc");
                    }}
                    className={`sort-button ${activeButton === "id-asc" ? "active" : ""}`}
                  >
                    &#9650;
                  </button>
                  <button
                    onClick={() => {
                      if (sortOrder === "id-desc") {
                        handleResetSort();
                      } else {
                        handleSort("id-desc");
                      }
                      setActiveButton(activeButton === "id-desc" ? null : "id-desc");
                    }}
                    className={`sort-button ${activeButton === "id-desc" ? "active" : ""}`}
                  >
                    &#9660;
                  </button>
                </div>
              </th>
              <th>
                <p>
                  Coin
                </p>
                <div>
                  <button
                    onClick={() => {
                      if (sortOrder === "name-asc") {
                        handleResetSort();
                      } else {
                        handleSort("name-asc");
                      }
                      setActiveButton(activeButton === "name-asc" ? null : "name-asc");
                    }}
                    className={`sort-button ${activeButton === "name-asc" ? "active" : ""}`}
                  >
                    &#9650;
                  </button>
                  <button
                    onClick={() => {
                      if (sortOrder === "name-desc") {
                        handleResetSort();
                      } else {
                        handleSort("name-desc");
                      }
                      setActiveButton(activeButton === "name-desc" ? null : "name-desc");
                    }}
                    className={`sort-button ${activeButton === "name-desc" ? "active" : ""}`}
                  >
                    &#9660;
                  </button>
                </div>
              </th>
              <th>
                <p>
                  Price
                </p>
                <div>
                  <button
                    onClick={() => {
                      if (sortOrder === "price-asc") {
                        handleResetSort();
                      } else {
                        handleSort("price-asc");
                      }
                      setActiveButton(activeButton === "price-asc" ? null : "price-asc");
                    }}
                    className={`sort-button ${activeButton === "price-asc" ? "active" : ""}`}
                  >
                    &#9650;
                  </button>
                  <button
                    onClick={() => {
                      if (sortOrder === "price-desc") {
                        handleResetSort();
                      } else {
                        handleSort("price-desc");
                      }
                      setActiveButton(activeButton === "price-desc" ? null : "price-desc");
                    }}
                    className={`sort-button ${activeButton === "price-desc" ? "active" : ""}`}
                  >
                    &#9660;
                  </button>
                </div>
              </th>
              <th>
                <p>
                  1D
                </p>
                <div>
                  <button
                    onClick={() => {
                      if (sortOrder === "change-asc") {
                        handleResetSort();
                      } else {
                        handleSort("change-asc");
                      }
                      setActiveButton(activeButton === "change-asc" ? null : "change-asc");
                    }}
                    className={`sort-button ${activeButton === "change-asc" ? "active" : ""}`}
                  >
                    &#9650;
                  </button>
                  <button
                    onClick={() => {
                      if (sortOrder === "change-desc") {
                        handleResetSort();
                      } else {
                        handleSort("change-desc");
                      }
                      setActiveButton(activeButton === "change-desc" ? null : "change-desc");
                    }}
                    className={`sort-button ${activeButton === "change-desc" ? "active" : ""}`}
                  >
                    &#9660;
                  </button>
                </div>
              </th>
              <th>
                <p>
                  Low Price
                </p>
                <div>
                  <button
                    onClick={() => {
                      if (sortOrder === "lowprice-asc") {
                        handleResetSort();
                      } else {
                        handleSort("lowprice-asc");
                      }
                      setActiveButton(activeButton === "lowprice-asc" ? null : "lowprice-asc");
                    }}
                    className={`sort-button ${activeButton === "lowprice-asc" ? "active" : ""}`}
                  >
                    &#9650;
                  </button>
                  <button
                    onClick={() => {
                      if (sortOrder === "lowprice-desc") {
                        handleResetSort();
                      } else {
                        handleSort("lowprice-desc");
                      }
                      setActiveButton(activeButton === "lowprice-desc" ? null : "lowprice-desc");
                    }}
                    className={`sort-button ${activeButton === "lowprice-desc" ? "active" : ""}`}
                  >
                    &#9660;
                  </button>
                </div>
              </th>
              <th>
                <p>
                  High Price
                </p>
                <div>
                  <button
                    onClick={() => {
                      if (sortOrder === "highprice-asc") {
                        handleResetSort();
                      } else {
                        handleSort("highprice-asc");
                      }
                      setActiveButton(activeButton === "highprice-asc" ? null : "highprice-asc");
                    }}
                    className={`sort-button ${activeButton === "highprice-asc" ? "active" : ""}`}
                  >
                    &#9650;
                  </button>
                  <button
                    onClick={() => {
                      if (sortOrder === "highprice-desc") {
                        handleResetSort();
                      } else {
                        handleSort("highprice-desc");
                      }
                      setActiveButton(activeButton === "highprice-desc" ? null : "highprice-desc");
                    }}
                    className={`sort-button ${activeButton === "highprice-desc" ? "active" : ""}`}
                  >
                    &#9660;
                  </button>
                </div>
              </th>
              <th>
                <p>
                  Volume
                </p>
                <div>
                  <button
                    onClick={() => {
                      if (sortOrder === "volume-asc") {
                        handleResetSort();
                      } else {
                        handleSort("volume-asc");
                      }
                      setActiveButton(activeButton === "volume-asc" ? null : "volume-asc");
                    }}
                    className={`sort-button ${activeButton === "volume-asc" ? "active" : ""}`}
                  >
                    &#9650;
                  </button>
                  <button
                    onClick={() => {
                      if (sortOrder === "volume-desc") {
                        handleResetSort();
                      } else {
                        handleSort("volume-desc");
                      }
                      setActiveButton(activeButton === "volume-desc" ? null : "volume-desc");
                    }}
                    className={`sort-button ${activeButton === "volume-desc" ? "active" : ""}`}
                  >
                    &#9660;
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentCoins.map((coin) => (
              <tr key={coin.smb} className="coin">
                <td style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}><img src="./icons/watchlist_dark.png" className="addToWatch"/>{coin.id}</td>
                <td>{coin.smb.slice(0,-4)}</td>
                <td style={{color: coin.flash}}>{coin.price > 999 ? new Intl.NumberFormat('en-US').format(coin.price) : coin.price}</td>
                <td style={{ color: coin.percentChange1d >= 0 ? '#5CC082' : '#DC4C41' }}>{coin.percentChange1d}</td>
                <td>{coin.lowprice > 999 ? new Intl.NumberFormat('en-US').format(coin.lowprice) : coin.lowprice}</td>
                <td>{coin.highprice > 999 ? new Intl.NumberFormat('en-US').format(coin.highprice) : coin.highprice}</td>
                <td>{isNaN(coin.volume) ? "Loading..." : new Intl.NumberFormat('en-US').format(coin.volume)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
      );
    };
  };

  const renderFooter = () => {
    if (loadingPercent >= 100 && Object.keys(filteredData).length !== 0) {
      return (
        <div className="pages">
          <div>
            <div className="page-number">
              {pageNumbers.map((pageNumber) => (
                <button 
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`page-number-btn${currentPage === pageNumber ? "-active" : ""}`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
            <div className="page-size">
              <button className={`page-size-btn${coinsPerPage == 25 ? "-active" : ""}`} onClick={() => handleCoinsPerPage(25)}>25</button>
              <button className={`page-size-btn${coinsPerPage == 50 ? "-active" : ""}`} onClick={() => handleCoinsPerPage(50)}>50</button>
              <button className={`page-size-btn${coinsPerPage == 100 ? "-active" : ""}`} onClick={() => handleCoinsPerPage(100)}>100</button>
            </div>
          </div>
        </div>
      );
    }
    return;
  }

  return (
    <div className="positionsList">
      {renderCoins()}
      {renderFooter()}    
      {NoData()}        
    </div>
  );
};

export default BinanceBTC;