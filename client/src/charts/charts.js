import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { v4 as uuidv4 } from 'uuid';
import { io } from 'socket.io-client';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GetListOfCoins from '../listOfCoinsAPI';
//import GetDataCoin from '../getDataCoin';
import symbols from '../positions/coinList';
import { modelRoot, serverLink } from '../index';
import './charts.css';
import ReactPaginate from 'react-paginate';

const Charts = () => {
  const [bookmarkList, setBookmarkList] = useState(() => {
    const savedDivList = localStorage.getItem("bookmarkList");
    if (savedDivList) {
      return JSON.parse(savedDivList);
    } else {
      return [];
    }
  });

  const socket = io('http://3.8.190.201/coins', {
    withCredentials: true,
    extraHeaders : {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  });

  function SubscribeToWebSocket() {
    const listToSub = (JSON.parse(localStorage.getItem("bookmarkList"))).map(elem => ({symbol: elem.symbol}));
    
    socket.on('connect', () => {
        console.log('Connected to socket');
        // Subscribe to events or send data to the server
        socket.emit('subscribe', listToSub); // Example subscription event
    });

    socket.on('subscribed', (data) => {
    });

    socket.on('data:update', (data) => {
      const listToUpdate = (JSON.parse(localStorage.getItem("bookmarkList")))
      const index = listToUpdate.findIndex(elem => elem.symbol == data.symbol)
      listToUpdate[index].price = data.quotes.USD.price;
      listToUpdate[index].change = data.quotes.USD.percent_change_24h;
      listToUpdate[index].volume = data.quotes.USD.volume_24h;
      listToUpdate[index].marketCap = data.quotes.USD.market_cap;
      console.log("UPDATED")
      setBookmarkList(listToUpdate)
    })

    // socket.on('data:price_update', (data) => {
    //     console.log(data)
    // })

    socket.on('error', (err) => {
        console.log(err)
    })
  }

  SubscribeToWebSocket();

  function ChartInner () {
  let tvScriptLoadingPromise;
  const [bookmarkListLayout, setBookmarkListLayout] = useState(<></>);
  const [layoutProps,setLayoutProps] = useState(() => {
      const savedChartToDisplay = localStorage.getItem("layout");
      if (savedChartToDisplay) {
          return JSON.parse(localStorage.getItem("layout"));
      } else {
          return {length: 4, type: 1};
      }
  })
    
    useEffect(()=>{localStorage.setItem("bookmarkList",JSON.stringify(bookmarkList))},[bookmarkList])

    useEffect(()=>{ 
        const handleDragEnd = (result) => {
            if (!result.destination) return;

            const items = Array.from(bookmarkList);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);

            setBookmarkList(items);
        };
        const layout = (<DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="chart-symb-list">
                {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    width: '100%'
                    }}>
                    {bookmarkList.slice(0,(layoutProps.length)).map((item, index) => (
                    <Draggable key={item.key} draggableId={item.key} index={index}>
                        {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <div className="overChartConsole">
                                <div className='overChartConsoleWithoutExit'>
                                    <div className="charts-title-coin-logo"><img src='./icons/avatar.png' style={{width:'30px'}}/></div>
                                    <div className="charts-title-coin-title">
                                        <div className="charts-title-coin-title-market">Binance</div>
                                        <div className="charts-title-coin-title-pair">{item.symbol}/USDT<Overlay props={{ bookmarkList: bookmarkList, itemKey: item.key }} /></div>
                                    </div>
                                    <div className="charts-title-coin-lastPrice">
                                        <div className="charts-title-coin-lastPrice-head">Last Price</div>
                                        <div className="charts-title-coin-lastPrice-body">${item.price > 1 ? parseFloat(item.price).toFixed(2) : parseFloat(item.price).toFixed(8)}</div>
                                    </div>
                                    <div className="charts-title-coin-24C">
                                        <div className="charts-title-coin-24C-head">Change</div>
                                        <div className="charts-title-coin-24C-body">{item.change}</div>
                                    </div>
                                    <div className="teminal-title-coin-24V">
                                    <div className="teminal-title-coin-24H-head">Volume</div>
                                        <div className="teminal-title-coin-24H-body">{parseFloat(item.volume).toFixed(2)}</div>
                                    </div>
                                    <div className="teminal-title-coin-24M">
                                        <div className="teminal-title-coin-24L-head">Market Cap</div>
                                        <div className="teminal-title-coin-24L-body">{parseFloat(item.marketCap).toFixed(2)}</div>
                                    </div>
                                </div>
                                <button className='deleteBookmarkBtn-chart' onClick={() => { handleDeleteDiv(item) }}>&#215;</button>
                            </div>
                            <Chart props={item.symbol} index={index} />
                        </div>
                        )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                    {bookmarkList.length<4 ? <button onClick={handleAddDiv} className='addChartBtn'><span>+</span></button> : <></>}
                </div>
                )}
            </Droppable>
        </DragDropContext>);
        setBookmarkListLayout(layout)
    },[bookmarkList,layoutProps])



    const Chart = (props) => {
        const containerId = `tradingview_${uuidv4()}`;
        const onLoadScriptRef = useRef();

        useEffect(() => {
            onLoadScriptRef.current = createWidget;

            if (!tvScriptLoadingPromise) {
            tvScriptLoadingPromise = new Promise((resolve) => {
                const script = document.createElement('script');
                script.id = 'tradingview-widget-loading-script';
                script.src = 'https://s3.tradingview.com/tv.js';
                script.type = 'text/javascript';
                script.onload = resolve;

                document.head.appendChild(script);
            });
            }

            tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

            return () => onLoadScriptRef.current = null;

            function createWidget() {
            if (!document.getElementById(containerId) || !('TradingView' in window)) {
                return;
            }

            new window.TradingView.widget({
                autosize: true,
                symbol: `${props.props}USDT`,
                timezone: "Etc/UTC",
                theme: "dark",
                style: "1",
                locale: "in",
                toolbar_bg: "#f1f3f6",
                enable_publishing: false,
                withdateranges: true,
                range: "1M",
                hide_side_toolbar: false,
                allow_symbol_change: true,
                show_popup_button: true,
                popup_width: "1980",
                popup_height: "1080",
                container_id: containerId,
            });
            }
        }, [containerId, props.props]);

        return (
            <div className='tradingview-widget-container'>
            <div id={containerId} className={`tradingviewDiv chart-container-${props.index}-${layoutProps.length}-${layoutProps.type}`}/>
            </div>
        );
    };

    const Layout = () => {
        const [isOpen, setIsOpen] = useState(false);

        const handleButtonHover = () => {
            setIsOpen(true);
        };

        const handleDivMouseLeave = () => {
            setIsOpen(false);
        };

        const handleChartLayoutType = (length, type) => {
            const layoutProps = {length: length, type: type};
            localStorage.setItem("layout", JSON.stringify(layoutProps));
            setLayoutProps(JSON.parse(localStorage.getItem("layout")));
            
        }

        return (
            <div className='layout-container'>
            <button onMouseEnter={handleButtonHover} className="layout-btn">
                <img src='./icons/avatar.png' className='layout-icon'/>
            </button>
            {isOpen && (
                <div className="layout-inner" onMouseLeave={handleDivMouseLeave}>
                    <div className="charttype-container">
                        <p className='charttype-title'>1 Chart</p>
                        <button onClick={()=>{handleChartLayoutType(1,1)}}><img src='./icons/avatar.png' className='layout-icon'/></button>
                    </div>
                    <div className="charttype-container">
                        <p className='charttype-title'>2 Charts</p>
                        <button onClick={()=>{handleChartLayoutType(2,1)}}><img src='./icons/avatar.png' className='layout-icon'/></button>
                        <button onClick={()=>{handleChartLayoutType(2,2)}}><img src='./icons/avatar.png' className='layout-icon'/></button>
                    </div>
                    <div className="charttype-container">
                        <p className='charttype-title'>3 Charts</p>
                        <button onClick={()=>{handleChartLayoutType(3,1)}}><img src='./icons/avatar.png' className='layout-icon'/></button>
                        <button onClick={()=>{handleChartLayoutType(3,2)}}><img src='./icons/avatar.png' className='layout-icon'/></button>
                    </div>
                    <div className="charttype-container">
                        <p className='charttype-title'>4 Charts</p>
                        <button onClick={()=>{handleChartLayoutType(4,1)}}><img src='./icons/avatar.png' className='layout-icon'/></button>
                    </div>
                </div>
            )}
            </div>
        );
    };
  async function handleAddDiv() {
      const link = `${serverLink}api/coins?limit=1&offset=0&orderby=rank_asc`;
      const response = await fetch(link, {
        method: 'GET',
        mode : 'cors',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        },
      });
    const symbs = await response.json();
    const symbNames = {key: uuidv4(), symbol:symbs[0].symbol, price: symbs[0].quotes.USD.price, change:symbs[0].quotes.USD.percent_change_7d, volume: symbs[0].quotes.USD.volume_24h, marketCap: symbs[0].quotes.USD.market_cap_change_24h};
    setBookmarkList([...bookmarkList, symbNames]);
  }
  function Overlay(props) { 
    const itemKey = props.props.itemKey;
    const [bookmarkList, setBookmarkList] = useState(props.props.bookmarkList);
    let chartOverlay = [...bookmarkList]; 
    let index = chartOverlay.findIndex(element => element.key === itemKey);
    const [showOverlay, setShowOverlay] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("rank_asc");
    const [activeButton, setActiveButton] = useState(null);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coinsPerPage, setCoinsPerPage] = useState(50);

    let sortedData;
    const handleOpenOverlay = () => {
      setShowOverlay(true);
      handleResetSort();
    };

    const handleCloseOverlay = () => {
      setShowOverlay(false);
    };

    const handleResetSort = async () => {
      const symbs = await GetListOfCoins(coinsPerPage,coinsPerPage*(currentPage-1));
      const symbData = symbs.map(elem => ({key: uuidv4(), symbol:elem.symbol, price: elem.quotes.USD.price, change:elem.quotes.USD.percent_change_7d, volume: elem.quotes.USD.volume_24h, marketCap: elem.quotes.USD.market_cap_change_24h}));
      setData([...symbData]);
      setSortOrder("rank_asc");
    };
    const [filteredData, setFilteredData] = useState([]);
    const handleSort = async (order) => {
      sortedData = {};
      const link = `http://3.8.190.201/api/coins?limit=${coinsPerPage.toString()}&offset=${(coinsPerPage*(currentPage-1)).toString()}&orderby=${order.toLowerCase()}&query=${searchTerm}`;
      const response = await fetch(link, {
        method: 'GET',
        mode : 'cors',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        },
      });
      const symbs = await response.json();
      const symbNames = symbs.map(elem => ({key: uuidv4(), symbol:elem.symbol, price: elem.quotes.USD.price, change:elem.quotes.USD.percent_change_7d, volume: elem.quotes.USD.volume_24h, marketCap: elem.quotes.USD.market_cap_change_24h}));
      setFilteredData([...symbNames]);
      setSortOrder(order);
    };

    useEffect(()=>{handleSort(sortOrder)},[coinsPerPage,currentPage,searchTerm])

    
    // useEffect(()=>{
    //   if(data!=[] && data!=null) setFilteredData(data.filter(item => item.symbol.toLowerCase().includes(searchTerm.toLowerCase())));
    // },[data])



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
        <button onClick={() => setCurrentPage(currentPage + 1)} className='paginationBtn'>Next</button>
        <button onClick={() => setCurrentPage(currentPage - 1)} className='paginationBtn'>Previous</button>
      </div>
    );
  };

    const changeCoin = (newCoin, newPrice, newChange, newVolume, newMarketCap) => {
        if (Array.isArray(bookmarkList)) {
            chartOverlay = [...bookmarkList]; 
            index = chartOverlay.findIndex(element => element.key === itemKey);
            if (index !== -1) {
              chartOverlay[index].symbol = newCoin;
              chartOverlay[index].price = newPrice;
              chartOverlay[index].change = newChange;
              chartOverlay[index].volume = newVolume;
              chartOverlay[index].marketCap = newMarketCap;
              setBookmarkList(chartOverlay);
              setBookmarkList(chartOverlay);
            }
        } 
    };
    
    useEffect(()=>{
      if(showOverlay)
      {
        window.scrollTo(0,0);
        const coinSorts = ["Name","Price","24h_Change"];
        const paginationBtns = [25,50,100,200,500,1000];
        modelRoot.render(
          <div className="overlay" style={{zIndex:'1001'}}>
            <div className="overlayContainer">
                <div className="overlayHeader">
                <p className='overlayTitle'>Select a coin</p>
                <input className="input-search-convert" placeholder="Search coins" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <div className="searchSortOverlayOuter">
                {coinSorts.map(elem => (
                  <div className='searchSortOverlayInner' key={uuidv4()}>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                      <div className='sortOverlay'>{elem!="24h_Change" ? elem : "Change"}</div>
                      <div className='sortBtns'>
                        <button
                        onClick={() => {
                            if (sortOrder === `${elem}_asc`) {
                            handleResetSort();
                            } else {
                            handleSort(`${elem}_asc`);
                            }
                            setActiveButton(activeButton === `${elem}_asc` ? null : `${elem}_asc`);
                        }}
                        className={`sort-button ${activeButton === `${elem}_asc` ? "active" : ""}`}
                        >
                        &#9650;
                        </button>
                        <button
                        onClick={() => {
                            if (sortOrder === `${elem}_desc`) {
                            handleResetSort();
                            } else {
                            handleSort(`${elem}_desc`);
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
                <button onClick={handleCloseOverlay} className='closeOverlay'>&#215;</button>
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
                        changeCoin(elem.symbol, elem.price, elem.change, elem.volume, elem.marketCap);
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
    },[showOverlay])
    return (
        <button onClick={handleOpenOverlay} className='openListBtn'>&#9660;</button>
    );
  }
    
    function handleDeleteDiv(item) {
        setBookmarkList(bookmarkList.filter(elem => elem.key != item.key));
    }

    









const Bookmarks = (props) => {
  const length = props.props;
  
  const [BookListLayout, setBookListLayout] = useState(<></>);
  // const [initialValue, setInitialValue] = useState(true);
  // useEffect(() => {
  //     if (initialValue) {
  //         setInitialValue(false);
  //         return;
  //     }
  //     window.location.reload(true);
  // }, [bookmarkList]);
  useEffect(() => {
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    const bookmarksEl = document.querySelector('.bookmarksChart');
    const addBtnEl = document.querySelector('.addBookmarkBtnChart');
    let totalWidth = 0;
    if (bookmarksEl && addBtnEl) {
      for (let i = 0; i < bookmarksEl.children.length; i++) {
        let rect = bookmarksEl.children[i].getBoundingClientRect();
        totalWidth += rect.width;
      }
      if (totalWidth + 120 >= window.innerWidth) {
        addBtnEl.classList.add('addBookmarkBtnChart-fixed');
      } else {
        addBtnEl.classList.remove('addBookmarkBtnChart-fixed');
      }
    }
  }, [bookmarkList]);
  useEffect(()=>{
    
    const layout = bookmarkList.map((item, index) => (
      <Draggable key={item.key} draggableId={item.key} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className='bookmarkDiv-charts'
            style={{
              ...(index < length ? {borderColor: '#2962FF'} : {}),
              ...provided.draggableProps.style
            }}
          >
            <OverlayWithSymb className='openListFromSymb' props={{ bookmarkList: bookmarkList, itemKey: item.key }} />
            <button className='deleteBookmarkBtn' onClick={()=>{handleDeleteDiv(item.key)}}>&#215;</button>
          </div>
        )}
      </Draggable>
    ))
    setBookListLayout(layout)
  },[bookmarkList])

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(bookmarkList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBookmarkList(items);
  }

  function handleDeleteDiv(id) {
    setBookmarkList(bookmarkList.filter(elem => elem.key != id));
  }





  function Overlay(props) {
    const [showOverlay, setShowOverlay] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("rank_asc");
    const [activeButton, setActiveButton] = useState(null);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coinsPerPage, setCoinsPerPage] = useState(50);

    let sortedData;
    const { bookmarkList }  = props.props;
    const handleOpenOverlay = () => {
      setShowOverlay(true);
      handleResetSort();
    };

    const handleCloseOverlay = () => {
      setShowOverlay(false);
    };

    const handleResetSort = async () => {
      const symbs = await GetListOfCoins(coinsPerPage,coinsPerPage*(currentPage-1));
      const symbData = symbs.map(elem => ({key: uuidv4(), symbol:elem.symbol, price: elem.quotes.USD.price, change:elem.quotes.USD.percent_change_7d, volume: elem.quotes.USD.volume_24h, marketCap: elem.quotes.USD.market_cap_change_24h}));
      setData([...symbData]);
      setSortOrder("rank_asc");
    };

    const handleSort = async (order) => {
      sortedData = {};
      const link = `http://3.8.190.201/api/coins?limit=${coinsPerPage}&offset=${coinsPerPage*(currentPage-1)}&orderby=${order.toLowerCase()}`;
      const response = await fetch(link, {
        method: 'GET',
        mode : 'cors',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        },
      });
      const symbs = await response.json();
      const symbNames = symbs.map(elem => ({key: uuidv4(), symbol:elem.symbol, price: elem.quotes.USD.price, change:elem.quotes.USD.percent_change_7d, volume: elem.quotes.USD.volume_24h, marketCap: elem.quotes.USD.market_cap_change_24h}));
      setData([...symbNames]);
      setSortOrder(order);
    };

    useEffect(()=>{handleSort(sortOrder)},[coinsPerPage,currentPage])

    const [filteredData, setFilteredData] = useState([]);
    useEffect(()=>{
      if(data!=[] && data!=null) setFilteredData(data.filter(item => item.symbol.toLowerCase().includes(searchTerm.toLowerCase())));
    },[data])

    const createCoin = (newCoin, newPrice, newChange, newVolume, newMarketCap) => {
        if (Array.isArray(bookmarkList)) {
            setBookmarkList([...bookmarkList, {key: uuidv4(), symbol:newCoin, price: newPrice, change:newChange, volume: newVolume, marketCap: newMarketCap}]); 
        } else {
            console.log('ChartSymbList is not defined or is not an array');
        }
    };

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
      <button onClick={() => setCurrentPage(currentPage + 1)} className='paginationBtn'>Next</button>
      <button onClick={() => setCurrentPage(currentPage - 1)} className='paginationBtn'>Previous</button>
    </div>
  );
};

    useEffect(()=>{
      if(showOverlay)
      {
        window.scrollTo(0,0);
        const coinSorts = ["Name","Price","24h_Change"];
        const paginationBtns = [25,50,100,200,500,1000];
        modelRoot.render(
          <div className="overlay" style={{zIndex:'1001'}}>
            <div className="overlayContainer">
                <div className="overlayHeader">
                <p className='overlayTitle'>Select a coin</p>
                <input className="input-search-convert" placeholder="Search coins" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <div className="searchSortOverlayOuter">
                {coinSorts.map(elem => (
                  <div className='searchSortOverlayInner' key={elem}>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                      <div className='sortOverlay'>{elem!="24h_Change" ? elem : "Change"}</div>
                      <div className='sortBtns'>
                        <button
                        onClick={() => {
                            if (sortOrder === `${elem}_asc`) {
                            handleResetSort();
                            } else {
                            handleSort(`${elem}_asc`);
                            }
                            setActiveButton(activeButton === `${elem}_asc` ? null : `${elem}_asc`);
                        }}
                        className={`sort-button ${activeButton === `${elem}_asc` ? "active" : ""}`}
                        >
                        &#9650;
                        </button>
                        <button
                        onClick={() => {
                            if (sortOrder === `${elem}_desc`) {
                            handleResetSort();
                            } else {
                            handleSort(`${elem}_desc`);
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
                <button onClick={handleCloseOverlay} className='closeOverlay'>&#215;</button>
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
                        createCoin(elem.symbol, elem.price, elem.change, elem.volume, elem.marketCap);
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
                    <button
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
      else
      {
        modelRoot.render(<></>);
      }   
    },[showOverlay, filteredData, coinsPerPage, currentPage])

    return (
      <button onClick={handleOpenOverlay} className='addBookmarkBtnChart'><span>+</span></button>
    );
  }

  function OverlayWithSymb(props) { 
    const { bookmarkList, itemKey}  = props.props;
    let chartOverlay = [...bookmarkList]; 
    let index = chartOverlay.findIndex(element => element.key === itemKey);
    const [showOverlay, setShowOverlay] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("rank_asc");
    const [activeButton, setActiveButton] = useState(null);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coinsPerPage, setCoinsPerPage] = useState(50);

    let sortedData;
    const handleOpenOverlay = () => {
      setShowOverlay(true);
      handleResetSort();
    };

    const handleCloseOverlay = () => {
      modelRoot.render(<></>);
      setShowOverlay(false);
    };

    const handleResetSort = async () => {
      const symbs = await GetListOfCoins(coinsPerPage,coinsPerPage*(currentPage-1));
      const symbData = symbs.map(elem => ({key: uuidv4(), symbol:elem.symbol, price: elem.quotes.USD.price, change:elem.quotes.USD.percent_change_7d, volume: elem.quotes.USD.volume_24h, marketCap: elem.quotes.USD.market_cap_change_24h}));
      setData([...symbData]);
      setSortOrder("rank_asc");
    };

    const handleSort = async (order) => {
      sortedData = {};
      const link = `http://3.8.190.201/api/coins?limit=${coinsPerPage}&offset=${coinsPerPage*(currentPage-1)}&orderby=${order.toLowerCase()}`;
      const response = await fetch(link, {
        method: 'GET',
        mode : 'cors',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        },
      });
      const symbs = await response.json();
      const symbNames = symbs.map(elem => ({key: uuidv4(), symbol:elem.symbol, price: elem.quotes.USD.price, change:elem.quotes.USD.percent_change_7d, volume: elem.quotes.USD.volume_24h, marketCap: elem.quotes.USD.market_cap_change_24h}));
      setData([...symbNames]);
      setSortOrder(order);
    };

    useEffect(()=>{handleSort(sortOrder)},[coinsPerPage,currentPage])

    const [filteredData, setFilteredData] = useState([]);
    useEffect(()=>{
      if(data!=[] && data!=null) setFilteredData(data.filter(item => item.symbol.toLowerCase().includes(searchTerm.toLowerCase())));
    },[data])



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
        <button onClick={() => setCurrentPage(currentPage + 1)} className='paginationBtn'>Next</button>
        <button onClick={() => setCurrentPage(currentPage - 1)} className='paginationBtn'>Previous</button>
      </div>
    );
  };

    const changeCoin = (newCoin, newPrice) => {
        if (Array.isArray(bookmarkList)) {
            chartOverlay = [...bookmarkList]; 
            index = chartOverlay.findIndex(element => element.key === itemKey);
            if (index !== -1) {
                chartOverlay[index].symbol = newCoin;
                chartOverlay[index].price = newPrice;
                setBookmarkList(chartOverlay);
            } else {
                console.log('Element is not found');
            }
        } else {
            console.log('ChartSymbList is not defined or is not an array');
        }
    };
    
    useEffect(()=>{
      if(showOverlay)
      {
        window.scrollTo(0,0);
        const coinSorts = ["Name","Price","24h_Change"];
        const paginationBtns = [25,50,100,200,500,1000];
        modelRoot.render(
          <div className="overlay" style={{zIndex:'1001'}}>
            <div className="overlayContainer">
                <div className="overlayHeader">
                <p className='overlayTitle'>Select a coin</p>
                <input className="input-search-convert" placeholder="Search coins" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <div className="searchSortOverlayOuter">
                {coinSorts.map(elem => (
                  <div className='searchSortOverlayInner' key={elem}>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                      <div className='sortOverlay'>{elem!="24h_Change" ? elem : "Change"}</div>
                      <div className='sortBtns'>
                        <button
                        onClick={() => {
                            if (sortOrder === `${elem}_asc`) {
                            handleResetSort();
                            } else {
                            handleSort(`${elem}_asc`);
                            }
                            setActiveButton(activeButton === `${elem}_asc` ? null : `${elem}_asc`);
                        }}
                        className={`sort-button ${activeButton === `${elem}_asc` ? "active" : ""}`}
                        >
                        &#9650;
                        </button>
                        <button
                        onClick={() => {
                            if (sortOrder === `${elem}_desc`) {
                            handleResetSort();
                            } else {
                            handleSort(`${elem}_desc`);
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
                <button onClick={handleCloseOverlay} className='closeOverlay'>&#215;</button>
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
                        changeCoin(elem.symbol, elem.price, elem.change, elem.volume, elem.marketCap);
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
                    <button
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
    },[showOverlay,bookmarkList])
    return (
        <button onClick={handleOpenOverlay} className='openListFromSymb'><p>{chartOverlay[index].symbol}</p><p>${parseFloat(chartOverlay[index].price).toFixed(2)}</p></button>
    );
  }

  return (
    <div className='bookmarksChart'>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="bookmarksArr" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} style={{ display: 'flex' }}>
              {BookListLayout}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Overlay props={{ bookmarkList: bookmarkList}}/>
    </div>
  );
}


    return (
        <div key={JSON.stringify(bookmarkList)}>
            <div className="bookmark-container">
                <Layout />
                <Bookmarks props={layoutProps.length}/>
            </div>
            <div className="main-char-container">                
                {bookmarkListLayout}
            </div>     
        </div>
    );
  }
  return ChartInner();
}

export default Charts;