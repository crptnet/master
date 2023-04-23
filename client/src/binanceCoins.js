import React, { useState, useEffect } from "react";
import './coins.css';
import symbols from './coinList';
//import { data } from './useCoinData';

const BinanceBTC = () => {
  const [data, setData] = useState({
  BTCUSDT: { id: 1, smb: "BTCUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  ETHUSDT: { id: 2, smb: "ETHUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  USDTUSDT: { id: 3, smb: "USDT", price: "1.00", percentChange1d: "0", lowprice: "1.00", highprice: "1.00", volume: "20511465812" },
  BNBUSDT: { id: 4, smb: "BNBUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  USDCUSDT: { id: 5, smb: "USDCUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  XRPUSDT: { id: 6, smb: "XRPUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  ADAUSDT: { id: 7, smb: "ADAUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  DOGEUSDT: { id: 8, smb: "DOGEUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  MATICUSDT: { id: 9, smb: "MATICUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  SOLUSDT: { id: 10, smb: "SOLUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  DOTUSDT: { id: 11, smb: "DOTUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  BUSDUSDT: { id: 12, smb: "BUSDUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  LTCUSDT: { id: 13, smb: "LTCUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  SHIBUSDT: { id: 14, smb: "SHIBUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  TRXUSDT: { id: 15, smb: "TRXUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  AVAXUSDT: { id: 16, smb: "AVAXUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  //DAIUSDT: { id: 17, smb: "DAIUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  //WBTCUSDT: { id: 18, smb: "WBTCUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  LINKUSDT: { id: 19, smb: "LINKUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  UNIUSDT: { id: 20, smb: "UNIUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  //LEOUSDT: { id: 21, smb: "LEOUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  ATOMUSDT: { id: 22, smb: "ATOMUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  //OKBUSDT: { id: 23, smb: "OKBUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  //TONUSDT: { id: 24, smb: "TONUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  XMRUSDT: { id: 25, smb: "XMRUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  ETCUSDT: { id: 26, smb: "ETCUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  XLMUSDT: { id: 27, smb: "XLMUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  ICPUSDT: { id: 28, smb: "ICPUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  BCHUSDT: { id: 29, smb: "BCHUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  FILUSDT: { id: 30, smb: "FILUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  TUSDUSDT: { id: 31, smb: "TUSDUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  APTUSDT: { id: 32, smb: "APTUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  HBARUSDT: { id: 33, smb: "HBARUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  ARBUSDT: { id: 34, smb: "ARBUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  LDOUSDT: { id: 35, smb: "LDOUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  NEARUSDT: { id: 36, smb: "NEARUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  //CROUSDT: { id: 37, smb: "CROUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  VETUSDT: { id: 38, smb: "VETUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  APEUSDT: { id: 39, smb: "APEUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  ALGOUSDT: { id: 40, smb: "ALGOUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  QNTUSDT: { id: 41, smb: "QNTUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  GRTUSDT: { id: 42, smb: "GRTUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  FTMUSDT: { id: 43, smb: "FTMUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  EOSUSDT: { id: 44, smb: "EOSUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  SANDUSDT: { id: 45, smb: "SANDUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  MANAUSDT: { id: 46, smb: "MANAUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  AAVEUSDT: { id: 47, smb: "AAVEUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  THETAUSDT: { id: 48, smb: "THETAUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  EGLDUSDT: { id: 49, smb: "EGLDUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  //USDPUSDT: { id: 50, smb: "USDPUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  FLOWUSDT: { id: 51, smb: "FLOWUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  STXUSDT: { id: 52, smb: "STXUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  XTZUSDT: { id: 53, smb: "XTZUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  AXSUSDT: { id: 54, smb: "AXSUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  //BITUSDT: { id: 55, smb: "BITUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  RPLUSDT: { id: 56, smb: "RPLUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  CHZUSDT: { id: 57, smb: "CHZUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  IMXUSDT: { id: 58, smb: "IMXUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  CFXUSDT: { id: 59, smb: "CFXUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  //KCSUSDT: { id: 60, smb: "KCSUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  NEOUSDT: { id: 61, smb: "NEOUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  OPUSDT: { id: 62, smb: "OPUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  CRVUSDT: { id: 63, smb: "CRVUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  //USDDUSDT: { id: 64, smb: "USDDUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  MKRUSDT: { id: 65, smb: "MKRUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  KLAYUSDT: { id: 66, smb: "KLAYUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  SNXUSDT: { id: 67, smb: "SNXUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  //BSVUSDT: { id: 68, smb: "BSVUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  LUNCUSDT: { id: 69, smb: "LUNCUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  GMXUSDT: { id: 70, smb: "GMXUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  CAKEUSDT: { id: 71, smb: "CAKEUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  FXSUSDT: { id: 72, smb: "FXSUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  ZECUSDT: { id: 73, smb: "ZECUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  MINAUSDT: { id: 74, smb: "MINAUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  RNDRUSDT: { id: 75, smb: "RNDRUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  INJUSDT: { id: 76, smb: "INJUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  //HTUSDT: { id: 77, smb: "HTUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  XECUSDT: { id: 78, smb: "XECUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  //XDCUSDT: { id: 79, smb: "XDCUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  DASHUSDT: { id: 80, smb: "DASHUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  //MIOTAUSDT: { id: 81, smb: "MIOTAUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  PAXGUSDT: { id: 82, smb: "PAXGUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  //CSPRUSDT: { id: 83, smb: "CSPRUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  //GTUSDT: { id: 84, smb: "GTUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  TWTUSDT: { id: 85, smb: "TWTUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  ZILUSDT: { id: 86, smb: "ZILUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  LRCUSDT: { id: 87, smb: "LRCUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  //FLRUSDT: { id: 88, smb: "FLRUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  RUNEUSDT: { id: 89, smb: "RUNEUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  //GUSDUSDT: { id: 90, smb: "GUSDUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  WOOUSDT: { id: 91, smb: "WOOUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  AGIXUSDT: { id: 92, smb: "AGIXUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  '1INCHUSDT': { id: 93, smb: "1INCHUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  CVXUSDT: { id: 94, smb: "CVXUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  DYDXUSDT: { id: 95, smb: "DYDXUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  ENJUSDT: { id: 96, smb: "ENJUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  KAVAUSDT: { id: 97, smb: "KAVAUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  OSMOUSDT: { id: 98, smb: "OSMOUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" },
  BATUSDT: { id: 99, smb: "BATUSDT", price: "", percentChange1d: "", lowprice: "", highprice: "", volume: "" }
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
  const [searchTerm, setSearchTerm] = useState("");
  const [coinsPerPage, setCoinsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  
  let sortedData = data;
  useEffect(() => {
    const socket = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${symbols.map(symbol => symbol.toLowerCase() + "@ticker").join("/")}`
    );
    
    socket.onmessage = (event) => {
      const rawData = JSON.parse(event.data);
        if (rawData.data.e === "24hrTicker") {
          setData(prevData => ({
            ...prevData,
            [rawData.data.s]: {
              ...prevData[rawData.data.s],
              smb: rawData.data.s.slice(0,-4),
              price: roundNumber(parseFloat(rawData.data.w)),
              percentChange1d: parseFloat(rawData.data.P).toFixed(2),
              lowprice: roundNumber(parseFloat(rawData.data.l)),
              highprice: roundNumber(parseFloat(rawData.data.h)),
              volume: (parseFloat(rawData.data.v)*parseFloat(rawData.data.w)).toFixed(0)
            }
          }));
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
    item.smb.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="positionsList">
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
              <td>{coin.id}</td>
              <td>{coin.smb}</td>
              <td>{coin.price > 999 ? new Intl.NumberFormat('en-US').format(coin.price) : coin.price}</td>
              <td style={{ color: coin.percentChange1d >= 0 ? '#5CC082' : '#DC4C41' }}>{coin.percentChange1d}</td>
              <td>{coin.lowprice > 999 ? new Intl.NumberFormat('en-US').format(coin.price) : coin.lowprice}</td>
              <td>{coin.highprice > 999 ? new Intl.NumberFormat('en-US').format(coin.price) : coin.highprice}</td>
              <td>{new Intl.NumberFormat('en-US').format(coin.volume)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
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
};

export default BinanceBTC;



// TO DO
// 1.Create flashing
// 2.Create download of the page
// 3.Add full name of crypto