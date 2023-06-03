import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './convert.css';
import { v4 as uuidv4 } from 'uuid';
import { io } from 'socket.io-client';
import GetListOfCoins from '../listOfCoinsAPI';
import { modelRoot, serverLink } from '../index';

function Convert() {
  const getCoinPrice = async (coin) => {
    const link = `${serverLink}api/coins?limit=1&offset=0&query=${coin}`;
    const response = await fetch(link, {
      method: 'GET',
      mode: 'cors',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      },
    });
    const data = await response.json();
    return data[0].quotes.USD.price;
  }

  const fetchExchangeRates = async () => {
    try {
      const response1 = await getCoinPrice(inputCoin);
      const response2 = await getCoinPrice(outputCoin);

      const rate = parseFloat(response1) / parseFloat(response2);
      setExchangeRate(rate.toFixed(4));
    } catch (error) {
      console.error(error);
    }
  };

  const [inputCoin, setInputCoin] = useState("BTC");
  const [outputCoin, setOutputCoin] = useState("ETH");
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    fetchExchangeRates();
  }, [inputCoin, outputCoin]);

  useEffect(() => {
    handleChangeValues({ target: { value: output.value } });
  }, [inputCoin]);

  useEffect(() => {
    handleChangeValues({ target: { value: input.value } });
  }, [outputCoin]);

  const handleChangeValues = async (event,type) => {
    const {value} = event.target;
    if (value !== '') {
      const response1 = await getCoinPrice(inputCoin);
      const response2 = await getCoinPrice(outputCoin);
      type=="from" ? input.value = value * (parseFloat(response2) / parseFloat(response1)) : output.value = value * (parseFloat(response1) / parseFloat(response2));
    }
  };

  const handleSwap = () => {
    const temp1 = inputCoin;
    setInputCoin(outputCoin);
    setOutputCoin(temp1);
    const inputElement = document.getElementById('input');
    const outputElement = document.getElementById('output');
    const temp2 = inputElement.value;
    inputElement.value = outputElement.value;
    outputElement.value = temp2;
  };

  function Overlay(props) {
    const [showOverlay, setShowOverlay] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("rank_asc");
    const [activeButton, setActiveButton] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [coinsPerPage, setCoinsPerPage] = useState(50);
    const [filteredData, setFilteredData] = useState([]);

    const {status} = props;

    const handleOpenOverlay = () => {
      setShowOverlay(true);
      handleResetSort();
    };

    const handleCloseOverlay = () => {
      setShowOverlay(false);
    };

    const handleResetSort = async () => {
      const symbs = await GetListOfCoins(coinsPerPage, coinsPerPage * (currentPage - 1));
      const symbData = symbs.map(elem => ({ key: uuidv4(), symbol: elem.symbol, price: elem.quotes.USD.price, change: elem.quotes.USD.percent_change_7d, volume: elem.quotes.USD.volume_24h, marketCap: elem.quotes.USD.market_cap}));
      setSortOrder("rank_asc");
    };

    useEffect(()=>{
      const handleSort = async () => {
        const link = `${serverLink}api/coins?limit=${coinsPerPage}&offset=${coinsPerPage * (currentPage - 1)}&orderby=${sortOrder}`;
        const response = await fetch(link, {
          method: 'GET',
          mode: 'cors',
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          },
        });
        const symbs = await response.json();
        
        const symbNames = symbs.map(elem => ({ key: uuidv4(), symbol: elem.symbol, price: elem.quotes.USD.price, change: elem.quotes.USD.percent_change_7d, volume: elem.quotes.USD.volume_24h, marketCap: elem.quotes.USD.market_cap}));
        setFilteredData([...symbNames]);
      };
      handleSort();
    },[sortOrder])
    
    useEffect(() => { handleSearch() }, [coinsPerPage, currentPage, searchTerm])

    const handleSearch = async () => {
      const link = `http://3.8.190.201/api/coins?limit=2500&offset=0&orderby=${sortOrder}&query=${searchTerm}`;
      const response = await fetch(link, {
        method: 'GET',
        mode: 'cors',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        },
      });
      const listOfSearch = await response.json();
      let symbNames = [];
      for (let i = coinsPerPage * (currentPage - 1); i < coinsPerPage + coinsPerPage * (currentPage - 1) && i < listOfSearch.length; i++) {
        symbNames.push({ key: uuidv4(), symbol: listOfSearch[i].symbol, price: listOfSearch[i].quotes.USD.price, change: listOfSearch[i].quotes.USD.percent_change_7d, volume: listOfSearch[i].quotes.USD.volume_24h, marketCap: listOfSearch[i].quotes.USD.market_cap});
      }
      setFilteredData([...symbNames]);
    }

    const Pagination = () => {
      const handlePageChange = (e) => {
        const pageNumber = parseInt(e.target.value, 10);
        if (pageNumber >= 1 && pageNumber <= Math.ceil(2500 / coinsPerPage)) {
          setCurrentPage(pageNumber);
        }
      };

      return (
        <div>
          <input
            type="number"
            value={currentPage}
            min="1"
            max={Math.ceil(2500 / coinsPerPage)}
            onChange={handlePageChange}
          />
          <span> of {Math.ceil(2500 / coinsPerPage)}</span>
          <button key={uuidv4()} onClick={() => setCurrentPage(currentPage + 1)} className='paginationBtn'>Next</button>
          <button key={uuidv4()} onClick={() => setCurrentPage(currentPage - 1)} className='paginationBtn'>Previous</button>
        </div>
      );
    };

    useEffect(() => {
      if (showOverlay) {
        window.scrollTo(0, 0);
        const coinSorts = ["Name", "Price", "24h_Change"];
        const paginationBtns = [25, 50, 100, 200, 500, 1000];
        modelRoot.render(
          <div className="overlay" style={{ zIndex: '1001' }}>
            <div className="overlayContainer">
              <div className="overlayHeader">
                <p className='overlayTitle'>Select a coin</p>
                <input className="input-search-convert" placeholder="Search coins" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <div className="searchSortOverlayOuter">
                  {coinSorts.map(elem => (
                    <div className='searchSortOverlayInner' key={elem}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div className='sortOverlay'>{elem != "24h_Change" ? elem : "Change"}</div>
                        <div className='sortBtns'>
                          <button key={uuidv4()}
                            onClick={() => {
                              if (sortOrder === `${elem}_asc`) {
                                handleResetSort();
                              } else {
                                setSortOrder(`${elem}_asc`.toLowerCase());
                              }
                              setActiveButton(activeButton === `${elem}_asc` ? null : `${elem}_asc`);
                            }}
                            className={`sort-button ${activeButton === `${elem}_asc` ? "active" : ""}`}
                          >
                            &#9650;
                          </button>
                          <button key={uuidv4()}
                            onClick={() => {
                              if (sortOrder === `${elem}_desc`) {
                                handleResetSort();
                              } else {
                                setSortOrder(`${elem}_desc`.toLowerCase());
                              }
                              setActiveButton(activeButton === `${elem}_desc` ? null : `${elem}_desc`);
                            }}
                            className={`sort-button ${activeButton === `${elem}_desc` ? "active" : ""}`}
                          >
                            &#9660;
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button key={uuidv4()} onClick={handleCloseOverlay} className='closeOverlay'>&#215;</button>
              </div>
              <div className='listOfCrypto'>
                <div className="inner-overlay-container">
                  {filteredData
                    .slice(0, currentPage * coinsPerPage)
                    .map((elem) => (
                      <button
                        key={uuidv4()}
                        className="listElemOverlay"
                        onClick={() => {
                          if(status=="from") setInputCoin(elem.symbol);
                          else setOutputCoin(elem.symbol);
                          handleCloseOverlay();
                        }}
                      >
                        <span>{elem.symbol}</span>
                        <span>${elem.price > 1 ? parseFloat(elem.price).toFixed(2) : parseFloat(elem.price).toFixed(8)}</span>
                      </button>
                    ))}
                </div>
              </div>
              <div className="pagination">
                <div>
                  {paginationBtns.map(elem => (
                    <button key={uuidv4()}
                      className={`coinsPerPageButton ${coinsPerPage === elem ? "active" : ""}`}
                      onClick={() => {
                        setCoinsPerPage(elem);
                        setCurrentPage(1);
                      }}
                    >
                      {elem}
                    </button>
                  ))}
                </div>
                <Pagination />
              </div>
            </div>
          </div>
        )
      }
      else {
        modelRoot.render(<></>);
      }
    }, [showOverlay, filteredData, coinsPerPage, currentPage])

    return (
      <button key={uuidv4()} onClick={handleOpenOverlay} className='sort-button'><span>&#9660;</span></button>
    );
  }


  return (
    <>
      <div className='convertContainer'>
        <button className="swapBtn" onClick={handleSwap}><img src='./icons/convert_dark.png' className="swapImg" /></button>
        <div className="convertFrom">
          <div id="coinFrom">
            <p className="innerText">From</p>
            <div className="right">
              <div id="coinInput">
                <p className='coinName'>{inputCoin}</p>
              </div>
              <div id="highBtn">
                <Overlay status={"from"}/>
              </div>
            </div>
          </div>
          <input className="inputAmount" type="number" inputMode="numeric" id="input" placeholder="0.00" onInput={(event) => {handleChangeValues(event, 'to');}}/>
        </div>
        <div className="convertTo">
          <div id="coinTo">
            <p className="innerText">To</p>
            <div className="right">
              <div id="coinOutput">
                <p className='coinName'>{outputCoin}</p>
              </div>
              <div id="lowBtn">
                <Overlay status={"to"}/>
              </div>
            </div>
          </div>
          <input className="inputAmount" type="number" inputMode="numeric" id="output" placeholder="0.00" onInput={(event) => {handleChangeValues(event, 'from');}}/>
        </div>        
        <div className="rate">
          Exchange rate 1 {inputCoin} ~ {exchangeRate} {outputCoin}
        </div>   
      </div>
    </>
  );
}

export default Convert;