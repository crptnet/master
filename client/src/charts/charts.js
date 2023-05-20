import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GetListOfCoins from '../listOfCoinsAPI';
import GetDataCoin from '../getDataCoin';
import Bookmarks from './bookmarks';
import symbols from '../positions/coinList';
import { modelRoot } from '../index';
import './charts.css';

const Charts = () => {
    let tvScriptLoadingPromise;
    let chartSymbArr = [];
    const [chartSymbList, setChartSymbList] = useState(() => {
        const savedChartList = localStorage.getItem("bookmarkList");
        if (savedChartList) {
            return JSON.parse(localStorage.getItem("bookmarkList"));
        } else {
            return chartSymbArr;
        }
    })
    const [initialValue, setInitialValue] = useState(true);
    const [ChartSymbListLayout, setchartSymbListLayout] = useState(<></>);
    const [layoutProps,setLayoutProps] = useState(() => {
        const savedChartToDisplay = localStorage.getItem("layout");
        if (savedChartToDisplay) {
            return JSON.parse(localStorage.getItem("layout"));
        } else {
            return {length: 4, type: 1};
        }
    })

    useEffect(() => {
        if (initialValue) {
            setInitialValue(false);
            return;
        }
        window.location.reload(true);
    }, [chartSymbList]);
    
    useEffect(()=>{localStorage.setItem("bookmarkList",JSON.stringify(chartSymbList))},[chartSymbList])
    useEffect(()=>{console.log(chartSymbList)},[chartSymbList])
    useEffect(()=>{ 
        const handleDragEnd = (result) => {
            if (!result.destination) return;

            const items = Array.from(chartSymbList);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);

            setChartSymbList(items);
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
                    {chartSymbList.slice(0,(layoutProps.length)).map((item, index) => (
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
                                        <div className="charts-title-coin-title-pair">{item.symbol}/USDT<Overlay props={{ bookmarkList: chartSymbList, itemKey: item.key }} /></div>
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
                                        <div className="teminal-title-coin-24H-body">{item.volume.toFixed(2)}</div>
                                    </div>
                                    <div className="teminal-title-coin-24M">
                                        <div className="teminal-title-coin-24L-head">Market Cap</div>
                                        <div className="teminal-title-coin-24L-body">{item.marketCap.toFixed(2)}</div>
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
                    {chartSymbList.length<4 ? <button onClick={handleAddDiv} className='addChartBtn'><span>+</span></button> : <></>}
                </div>
                )}
            </Droppable>
        </DragDropContext>);
        setchartSymbListLayout(layout)
    },[chartSymbList,layoutProps])



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
            setLayoutProps(localStorage.getItem("layout"));
            window.location.reload(true);
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

    function Overlay(props) { 
      console.log("props",props)
    const itemKey = props.props.itemKey;
    const [bookmarkList, setBookmarkList] = useState(props.props.bookmarkList);
    let chartOverlay = [...bookmarkList]; 
    let index = chartOverlay.findIndex(element => element.key === itemKey);
    console.log("??")
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
      console.log(link)
      const symbs = await response.json();
      console.log("SORTED!", symbs)
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

    const changeCoin = (newCoin, newPrice, newChange, newVolume, newMarketCap) => {
        if (Array.isArray(bookmarkList)) {
            chartOverlay = [...bookmarkList]; 
            index = chartOverlay.findIndex(element => element.key === itemKey);
            if (index !== -1) {
              console.log("SHOULD BE CHANGED!")
                chartOverlay[index].symbol = newCoin;
                chartOverlay[index].price = newPrice;
                chartOverlay[index].change = newChange;
                chartOverlay[index].volume = newVolume;
                chartOverlay[index].marketCap = newMarketCap;
                setBookmarkList(chartOverlay);
                setChartSymbList(chartOverlay);
                window.location.reload(true);
            } else {
                console.log('Element is not found');
            }
        } else {
            console.log('ChartSymbList is not defined or is not an array');
        }
    };
    
    useEffect(()=>{
      console.log("limit:",coinsPerPage)
      console.log("offset:",coinsPerPage*(currentPage-1))
      console.log(filteredData)
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
    function handleAddDiv() {
        const newElem = { key:uuidv4(), symb: "BTC"};
        setChartSymbList([...chartSymbList, newElem]);
    }
    function handleDeleteDiv(item) {
        setChartSymbList(chartSymbList.filter(elem => elem.key != item.key));
    }
    console.log("**")
    return (
        <React.Fragment key={JSON.stringify(chartSymbList)}>
            <div className="bookmark-container">
                <Layout />
                <Bookmarks props={layoutProps.length}/>
            </div>
            <div className="main-char-container">                
                {ChartSymbListLayout}
            </div>     
        </React.Fragment>
    );
}

export default Charts;