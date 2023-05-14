import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { v4 as uuidv4 } from 'uuid';
import Bookmarks from './bookmarks';

import symbols from '../positions/coinList';
import './charts.css';

const Charts = () => {
    
    let tvScriptLoadingPromise;

    let chartSymbArr = [];
    //REWRITE USING REF TO MAKE UPDATE AUTOMATICALLY FROM LOCALSTORAGE, NOT ONLY AT THE BEGINNING
    const [chartSymbList, setChartSymbList] = useState(() => {
        const savedChartList = localStorage.getItem("bookmarkList");
        if (savedChartList) {
        return JSON.parse(localStorage.getItem("bookmarkList"));
        } else {
        return chartSymbArr;
        }
    })
    const [ChartSymbListLayout, setchartSymbListLayout] = useState(<></>);

    useEffect(()=>{localStorage.setItem("bookmarkList",JSON.stringify(chartSymbList))},[chartSymbList])
    useEffect(()=>{console.log(chartSymbList)},[chartSymbList])
    useEffect(()=>{ 
        const layout = chartSymbList.map((item) => (
                <div key={item.key} className='chart-container'>
                    <div className='overChartConsole'>
                        <div className="charts-title-coin-logo"><img src='./icons/avatar.png' style={{width:'30px'}}/></div>
                        <div className="charts-title-coin-title">
                            <div className="charts-title-coin-title-market">Binance</div>
                            <div className="charts-title-coin-title-pair">{item.symb}/USDT<Overlay props={{ chartSymbList: chartSymbList, itemKey: item.key }} /></div>
                        </div>
                        <div className="charts-title-coin-lastPrice">
                            <div className="charts-title-coin-lastPrice-head">Last Price</div>
                            <div className="charts-title-coin-lastPrice-body">27155.74 </div>
                        </div>
                        <div className="charts-title-coin-24C">
                            <div className="charts-title-coin-24C-head">
            24h Change</div>
                            <div className="charts-title-coin-24C-body">-3.68%</div>
                        </div>
                        
                        <button className='deleteBookmarkBtn' onClick={() => { handleDeleteDiv(item) }}>&#215;</button>
                    </div>
                    <Chart props={item.symb} />
                </div>
            ))
        setchartSymbListLayout(layout)
    },[chartSymbList])



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
      <div id={containerId} className='tradingviewDiv' />
    </div>
  );
};

    function Overlay(props) {
        const [showOverlay, setShowOverlay] = useState(false);
        const [searchTerm, setSearchTerm] = useState("");
        const [sortOrder, setSortOrder] = useState(null);
        const [activeButton, setActiveButton] = useState(null);
        const [data, setData] = useState([...symbols]);
        let sortedData;
        const { chartSymbList, itemKey}  = props.props;
        const handleOpenOverlay = () => {
            setShowOverlay(true);
        };

        const handleCloseOverlay = () => {
            setShowOverlay(false);
        };

        const handleResetSort = () => {
            setData([...symbols]);
            setSortOrder("none");
        };

        const handleSort = (order) => {
            sortedData = {};
            if (order === "name-asc") {
            sortedData = data.sort((a, b) => a.localeCompare(b));
            } else if (order === "name-desc") {
            sortedData = data.sort((a, b) => b.localeCompare(a));
            }
            setData(sortedData);
            setSortOrder(order);
        };
        let filteredData = Object.values(symbols).filter(item =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (sortOrder === "name-asc") {
            filteredData = filteredData.sort((a, b) => a.localeCompare(b));
        } else if (sortOrder === "name-desc") {
            filteredData = filteredData.sort((a, b) => b.localeCompare(a));
        }


        const changeCoin = (newCoin) => {
            if (Array.isArray(chartSymbList)) {
                let chartOverlay = [...chartSymbList]; 
                const index = chartOverlay.findIndex(element => element.key === itemKey);
                if (index !== -1) {
                    chartOverlay[index].symb = newCoin;
                    setChartSymbList(chartOverlay);
                    window.location.reload(true);
                } else {
                    console.log('Element is not found');
                }
            } else {
                console.log('ChartSymbList is not defined or is not an array');
            }
        };

        return (
            <div>
            <button onClick={handleOpenOverlay} className='openListBtn'>&#9660;</button>
            {showOverlay && (
                <div className="overlay">
                <div className="overlayContainer">
                    <div className="overlayHeader">
                    <p className='overlayTitle'>Select a coin</p>
                    <button onClick={handleCloseOverlay} className='closeOverlay'>&#215;</button>
                    </div>
                    <div className='listOfCrypto'>
                    <div className='searchSortOverlay'>
                        <input className="input-search-convert" placeholder="Search coins" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <div className='sortOverlay'>Sort by name</div>
                        <div className='sortBtns'>
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
                        </div>
                    </div>
                    {filteredData.map((coin, index) => (
                        <button key={index} className="listElemOverlay" onClick={() => {changeCoin(coin); handleCloseOverlay();}}>{coin}</button>
                    ))}
                    </div>
                </div>
                </div>
            )}
            </div>
        );
        }
    function handleAddDiv() {
        const newElem = { key:uuidv4(), symb: "BTC"};
        setChartSymbList([...chartSymbList, newElem]);
    }
    function handleDeleteDiv(item) {
        setChartSymbList(chartSymbList.filter(elem => elem.key != item.key));
    }
    return (
        <React.Fragment key={JSON.stringify(chartSymbList)}>
            <div className="bookmark-container">
                <Bookmarks />
            </div>
            <div className="main-char-container">                
                {ChartSymbListLayout}
                {chartSymbList.length<4 ? <button onClick={handleAddDiv} className='addChartBtn'><span>+</span></button> : <></>}
            </div>     
        </React.Fragment>
    );
}

export default Charts;