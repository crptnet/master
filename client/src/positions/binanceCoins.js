import React, { useState, useEffect, useRef, useCallback } from "react";
import './coins.css';
import symbols from './coinList';
import ReactDOM from 'react-dom/client';
import { v4 as uuidv4 } from 'uuid';
import { io } from 'socket.io-client';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GetListOfCoins from '../listOfCoinsAPI';
import { mainRoot, modelRoot, sidebarRoot, serverLink } from '../index';
import ReactPaginate from 'react-paginate';

const BinanceBTC = () => {
  console.log("!")
  const [bookmarkList, setBookmarkList] = useState(() => {
    const savedDivList = localStorage.getItem("bookmarkList");
    if (savedDivList) {
      return JSON.parse(savedDivList);
    } else {
      return [];
    }
  });
  const [showOverlay, setShowOverlay] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("rank_asc");
  const [activeButton, setActiveButton] = useState(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage, setCoinsPerPage] = useState(50);
  const [filteredData, setFilteredData] = useState([]);
  const [watchList, setWatchList] = useState([]);

const socketRef = useRef(null);

const SubscribeToWebSocket = useCallback(async () => {
  // Disconnect the previous socket if it exists
  if (socketRef.current) {
    socketRef.current.disconnect();
    console.log('Disconnected from previous socket');
  }

  const socket = io(`${serverLink}coins`, {
    withCredentials: true,
    extraHeaders: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  });

  socketRef.current = socket; // Store the new socket in the ref

  socket.on('connect', async () => {
    console.log('Connected to socket');
    const link = `${serverLink}api/coins?limit=${coinsPerPage}&offset=${coinsPerPage * (currentPage - 1)}&orderby=${sortOrder}&query=${searchTerm}`;
    const response = await fetch(link, {
      method: 'GET',
      mode: 'cors',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      },
    });
    const result = await response.json();
    const resultSymb = result.map(elem => ({ symbol: elem.symbol }));
    socket.emit('subscribe', resultSymb);
  });

  socket.on('subscribed', (data) => {
    console.log(data);
  });

  socket.on('data:update', (data) => {
    setFilteredData(prevData => {
      const newData = [...prevData];
      const index = newData.findIndex(elem => elem.symbol === data.symbol);
      if (index !== -1) {
        newData[index].price = data?.quotes?.USD?.price;
        newData[index].change = data?.quotes?.USD?.percent_change_24h;
        newData[index].volume = data?.quotes?.USD?.volume_24h;
        newData[index].marketCap = data?.quotes?.USD?.market_cap;
        newData[index].oneHour = data?.quotes?.USD?.percent_change_1h;
        newData[index].sevenDays = data?.quotes?.USD?.percent_change_7d;
        console.log("UPDATED", "DATA", data, "NEW DATA", newData);
      } else {
        console.log("Symbol not found:", data.symbol);
      }
      return newData;
    });
  });

  socket.on('data:price_update', (data) => {
    console.log(data);
  });

  socket.on('error', (err) => {
    console.log(err);
  });
}, [currentPage, coinsPerPage, searchTerm]);

useEffect(() => {
  if (filteredData.length === 0 || currentPage || coinsPerPage || searchTerm) {
    SubscribeToWebSocket();
    console.log(filteredData);
  }

  return () => {
    // Cleanup function to disconnect the socket when the component unmounts
    if (socketRef.current) {
      socketRef.current.disconnect();
      console.log('Disconnected from socket');
    }
  };
}, [filteredData.length, SubscribeToWebSocket]);

const getWatchList = async () => {
  try {
    const headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    };

    if (localStorage.getItem('token')) {
      const response = await fetch(`${serverLink}api/watchList/`, {
        method: 'GET',
        headers: headersList
      });
      const watchListData = await response.json();
      const res = watchListData.map(elem => elem.coin_id);
      console.log("WATCHLIST",res)        
      setWatchList(res);
    } else {
      console.error("User is not registered");
    }
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  getWatchList();
}, []);













useEffect(() => {
  const handleSort = async () => {
    const link = `${serverLink}api/coins?limit=${coinsPerPage}&offset=${coinsPerPage * (currentPage - 1)}&orderby=${sortOrder}`;
    try {
      const response = await fetch(link, {
        method: 'GET',
        mode: 'cors',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        },
      });
      const symbs = await response.json();
      
      const symbNames = symbs.map(elem => ({ key: uuidv4(), rank: elem.rank, symbol: elem.symbol, price: elem.quotes.USD.price, oneHour: elem.quotes.USD.percent_change_1h, change: elem.quotes.USD.percent_change_24h, sevenDays: elem.quotes.USD.percent_change_7d, volume: elem.quotes.USD.volume_24h, marketCap: elem.quotes.USD.market_cap}));
      console.log(filteredData,"SORTING")
      if(symbNames!=filteredData) setFilteredData(symbNames);
    } catch (error) {
      // Handle error if fetch or parsing fails
      console.error(error);
    }
  };

  handleSort();
}, [sortOrder]);

useEffect(() => { 
  const handleSearch = async () => {
    const link = `${serverLink}api/coins?limit=2500&offset=0&orderby=${sortOrder}&query=${searchTerm}`;
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
      symbNames.push({ key: uuidv4(), rank: listOfSearch[i].rank, symbol: listOfSearch[i].symbol, price: listOfSearch[i].quotes.USD.price, change: listOfSearch[i].quotes.USD.percent_change_24h, volume: listOfSearch[i].quotes.USD.volume_24h, marketCap: listOfSearch[i].quotes.USD.market_cap, oneHour: listOfSearch[i].quotes.USD.percent_change_1h, sevenDays: listOfSearch[i].quotes.USD.percent_change_7d});
    }
    console.log(filteredData,"SEARCHING")
    if(symbNames!=filteredData) setFilteredData(symbNames);
  }

  handleSearch();
}, [coinsPerPage, currentPage, searchTerm]);

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
        const changeWatchlist = async (action,symbol) => {
          const method = action=="add" ? 'POST' : 'DELETE';
          try {
            const headersList = {
              "Accept": "*/*",
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
            };
            
            if(localStorage.getItem('token')) {
              const item = JSON.stringify({symbol: symbol});
              console.log(item)
              const response = await fetch(`${serverLink}api/watchList/${action}`, {
                method: method,
                body: item,
                headers: headersList
              });
              const userData = await response.json();
              getWatchList();
              return userData;
            } else {
              console.error("User is not registered");
            }
          } catch (error) {
            console.error(error);
          }
        }

  function Overlay() {
    console.log("?")
        useEffect(() => {
            const coinSorts = [["rank", "Rank"], ["name", "Symbol"], ["price","Price"], ["1h_change", "1H"], ["24h_change", "1D"], ["7d_change", "7D"], ["volume_24h", "Volume"], ["marketcap_24h", "Market Cap"]];
            const paginationBtns = [25, 50, 100, 200, 500, 1000];
            modelRoot.render(
              <div className="list" style={{ zIndex: '1001', width: 'calc(100vw - 60px)', marginLeft: '60px' }}>
                <div className="listContainerList">
                  <div className="listHeaderList">
                    <input className="input-search-list" placeholder="Search coins" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <div className="searchSortListOuter">
                      {coinSorts.map(elem => (
                        <div className='searchSortListInner' key={elem[0]}>
                          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div className='sortList'>{elem[1]}</div>
                            <div className='sortBtns'>
                              <button key={uuidv4()}
                                onClick={() => {
                                  if (sortOrder === `${elem[0]}_asc`.toLowerCase()) {
                                    setSortOrder("rank_asc");
                                  } else {
                                    setSortOrder(`${elem[0]}_asc`.toLowerCase());
                                  }
                                  setActiveButton(activeButton === `${elem[0]}_asc` ? null : `${elem[0]}_asc`);
                                }}
                                className={`sort-button ${activeButton === `${elem[0]}_asc` ? "active" : ""}`}
                              >
                                &#9650;
                              </button>
                              <button key={uuidv4()}
                                onClick={() => {
                                  if (sortOrder === `${elem[0]}_desc`.toLowerCase()) {
                                    setSortOrder("rank_asc");
                                  } else {
                                    setSortOrder(`${elem[0]}_desc`.toLowerCase());
                                  }
                                  setActiveButton(activeButton === `${elem[0]}_desc` ? null : `${elem[0]}_desc`);
                                }}
                                className={`sort-button ${activeButton === `${elem[0]}_desc` ? "active" : ""}`}
                              >
                                &#9660;
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="inner-list-container">
                    {filteredData
                      .slice(0, currentPage * coinsPerPage)
                      .map((elem) => (
                        <button
                          key={uuidv4()}
                          className="listElem"
                        >
                          <span style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
                            {watchList.includes(elem.symbol) ? (
                              <img src="./icons/watchlist_dark.png" className="addToWatch-remove" onClick={() => changeWatchlist("remove", elem.symbol)} />
                            ) : (
                              <img src="./icons/watchlist_dark.png" className="addToWatch-add" onClick={() => changeWatchlist("add", elem.symbol)} />
                            )}
                            {elem.rank}
                          </span>
                          <span>{elem.symbol}</span>
                          <span>${elem.price > 1 ? parseFloat(elem.price).toFixed(2) : parseFloat(elem.price).toFixed(8)}</span>
                          <span className={elem.oneHour < 0 ? "red" : "green"}> {elem.oneHour}%</span>
                          <span className={elem.change < 0 ? "red" : "green"}>{elem.change}%</span>
                          <span className={elem.sevenDays < 0 ? "red" : "green"}>{elem.sevenDays}%</span>
                          <span>${parseFloat(elem.volume).toFixed(0)}</span>
                          <span>${elem.marketCap}</span>
                        </button>
                      ))}
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
        }, [filteredData, coinsPerPage, currentPage, watchList])
        return (<></>)
      }
  return (
    <Overlay />        
  );
};

export default BinanceBTC;