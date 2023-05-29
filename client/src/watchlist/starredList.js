/*TO DO LIST*/
//1.Fix bug with closing overlay when loading after pressing search/sort btns in overlay




import React, { useState, useEffect, useRef } from "react";
import './watchlist.css';
import ReactDOM from 'react-dom/client';
import { v4 as uuidv4 } from 'uuid';
import { io } from 'socket.io-client';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GetListOfCoins from '../listOfCoinsAPI';
import { mainRoot, modelRoot, sidebarRoot, serverLink } from '../index';
import ReactPaginate from 'react-paginate';

const StarredList = () => {
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
  const [sortOrder, setSortOrder] = useState("default");
  const [activeButton, setActiveButton] = useState(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage, setCoinsPerPage] = useState(50);
  const [filteredData, setFilteredData] = useState([]);
  const [watchList, setWatchList] = useState([]);
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
      setData([...symbNames]);
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
    setData([...symbNames]);
    setFilteredData([...symbNames]);
  }

  const fetchData = async (res) => {
    let output = [];
    for (const elem of res) {
      const link = `${serverLink}api/coins?limit=1&offset=0&query=${elem}`;
      try {
        const response = await fetch(link, {
          method: 'GET',
          mode: 'cors',
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          },
        });
        const rawData = await response.json();
        output.push({
          key: uuidv4(),
          rank: rawData[0].rank,
          symbol: rawData[0].symbol,
          price: rawData[0].quotes.USD.price,
          oneHour: rawData[0].quotes.USD.percent_change_1h,
          change: rawData[0].quotes.USD.percent_change_24h,
          sevenDays: rawData[0].quotes.USD.percent_change_7d,
          volume: rawData[0].quotes.USD.volume_24h,
          marketCap: rawData[0].quotes.USD.market_cap
        });
      } catch (error) {
        // Handle error if fetch or parsing fails
        console.error(error);
      }
    }
    setWatchList(output);
    console.log("NEW FILTERED DATA", output)
  };
useEffect(() => {
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
          let res = [];
          watchListData.forEach(elem => {
            res.push(elem.coin_id);
          });
          console.log(res);
          await fetchData(res);
        } else {
          console.error("User is not registered");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getWatchList();
  }, []);

  useEffect(()=>{
    console.log(filteredData)
  },[filteredData])


//===================================================================//
//*************************NOT AVALIABLE YET*************************//
//CHANGE REQUESTS, SO SEARCH OF ITEMS IS RUNNED AMONG WATCHLIST ITEMS//
//===================================================================//

// useEffect(() => {
//   const handleSort = async () => {
//     const link = `${serverLink}api/coins?limit=${coinsPerPage}&offset=${coinsPerPage * (currentPage - 1)}&orderby=${sortOrder}`;
//     try {
//       const response = await fetch(link, {
//         method: 'GET',
//         mode: 'cors',
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//         },
//       });
//       const symbs = await response.json();
      
//       const symbNames = symbs.map(elem => ({ key: uuidv4(), rank: elem.rank, symbol: elem.symbol, price: elem.quotes.USD.price, oneHour: elem.quotes.USD.percent_change_1h, change: elem.quotes.USD.percent_change_24h, sevenDays: elem.quotes.USD.percent_change_7d, volume: elem.quotes.USD.volume_24h, marketCap: elem.quotes.USD.market_cap}));
//       console.log(filteredData,"SORTING")
//       if(symbNames!=filteredData) setFilteredData(symbNames);
//     } catch (error) {
//       // Handle error if fetch or parsing fails
//       console.error(error);
//     }
//   };
//   handleSort();
// }, [sortOrder]);



// useEffect(() => { 
//   const handleSearch = async () => {
//     const link = `${serverLink}api/coins?limit=2500&offset=0&orderby=${sortOrder}&query=${searchTerm}`;
//     const response = await fetch(link, {
//       method: 'GET',
//       mode: 'cors',
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//       },
//     });
//     const listOfSearch = await response.json();
//     let symbNames = [];
//     for (let i = coinsPerPage * (currentPage - 1); i < coinsPerPage + coinsPerPage * (currentPage - 1) && i < listOfSearch.length; i++) {
//       symbNames.push({ key: uuidv4(), rank: listOfSearch[i].rank, symbol: listOfSearch[i].symbol, price: listOfSearch[i].quotes.USD.price, change: listOfSearch[i].quotes.USD.percent_change_24h, volume: listOfSearch[i].quotes.USD.volume_24h, marketCap: listOfSearch[i].quotes.USD.market_cap, oneHour: listOfSearch[i].quotes.USD.percent_change_1h, sevenDays: listOfSearch[i].quotes.USD.percent_change_7d});
//     }
//     console.log(filteredData,"SEARCHING")
//     if(symbNames!=filteredData) setFilteredData(symbNames);
//   }

//   handleSearch();
// }, [coinsPerPage, currentPage, searchTerm]);

// const Pagination = () => {
//   const handlePageChange = (e) => {
//     const pageNumber = parseInt(e.target.value, 10);
//     if (pageNumber >= 1 && pageNumber <= Math.ceil(2500 / coinsPerPage)) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="number"
//         value={currentPage}
//         min="1"
//         max={Math.ceil(2500 / coinsPerPage)}
//         onChange={handlePageChange}
//       />
//       <span> of {Math.ceil(2500 / coinsPerPage)}</span>
//       <button key={uuidv4()} onClick={() => setCurrentPage(currentPage + 1)} className='paginationBtn'>Next</button>
//       <button key={uuidv4()} onClick={() => setCurrentPage(currentPage - 1)} className='paginationBtn'>Previous</button>
//     </div>
//   );
//  };

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
        const watchListData = await response.json();
        let res = [];
        watchListData.forEach(elem => {
          res.push(elem.coin_id);
        });
        console.log(res); 
        await fetchData(res);
      } else {
        console.error("User is not registered");
      }
    } catch (error) {
      console.error(error);
    }
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
              <button key={uuidv4()} onClick={()=>{setShowOverlay(false)}} className='closeOverlay'>&#215;</button>
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
                        changeWatchlist('add',elem.symbol);
                        setShowOverlay(false);
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
      modelRoot.render(<Overlay />);
    }
  }, [showOverlay, filteredData, coinsPerPage, currentPage])
  function Overlay() {
    console.log("?")
        useEffect(() => {
            const coinSorts = [["rank", "Rank"], ["name", "Symbol"], ["price","Price"], ["1h_change", "1H"], ["24h_change", "1D"], ["7d_change", "7D"], ["volume_24h", "Volume"], ["marketcap_24h", "Market Cap"]];
            const paginationBtns = [25, 50, 100, 200, 500, 1000];
            modelRoot.render(
              <div className="list" style={{ zIndex: '1001', width: 'calc(100vw - 60px)', marginLeft: '60px' }}>
                <div className="listContainerList">
                  <h1 style={{textAlign:"center"}}>WATCHLIST</h1>
                  {/*SERVER IMPROVEMENTS NEEDED TO BE DONE*/}
                  <div className="listHeaderList">
                    {watchList.length > 0 ? (
                      <>
                        {/* <input className="input-search-list" placeholder="Search coins" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /> */}
                        <div className="searchSortListOuter">
                          {coinSorts.map(elem => (
                            <div className='searchSortListInner' key={elem[0]}>
                              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <div className='sortList'>{elem[1]}</div>
                                {/* <div className='sortBtns'>
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
                                </div> */}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : null}
                  </div> 
                  <div className="inner-list-container">
                    {watchList
                      .slice(0, currentPage * coinsPerPage)
                      .map((elem) => (
                        <button
                          key={uuidv4()}
                          className="listElem"
                        >
                          <span style={{display:'flex',justifyContent:'center', alignItems:'center'}}><img src="./icons/watchlist_dark.png" className="addToWatch-remove" onClick={()=>changeWatchlist("remove",elem.symbol)}/>{elem.rank}</span>
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
                  {watchList.length>0 ? <button className="addNewToWatchList" onClick={()=>{setShowOverlay(true)}}>Click to add a new coin to WatchList</button> : <button className="addNewToWatchList" onClick={()=>{setShowOverlay(true)}}>It seems to be empty here. Click to create your WatchList</button>}
                  
                  {/*SERVER IMPROVEMENTS NEEDED TO BE DONE*/}
                  {/* <div className="pagination">
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
                  </div> */}
                </div>
              </div>
            )
        }, [watchList, coinsPerPage, currentPage])
        return (<></>)
      }
  return (
    <Overlay />        
  );
};

export default StarredList;