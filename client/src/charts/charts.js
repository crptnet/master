import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Bookmarks from './bookmarks';
import symbols from '../positions/coinList';
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
                                    <div className="teminal-title-coin-24H">
                                    <div className="teminal-title-coin-24H-head">24h High</div>
                                        <div className="teminal-title-coin-24H-body">28299.15</div>
                                    </div>
                                    <div className="teminal-title-coin-24L">
                                        <div className="teminal-title-coin-24L-head">24h Low</div>
                                        <div className="teminal-title-coin-24L-body">26777.00</div>
                                    </div>
                                    <div className="teminal-title-coin-24V">
                                        <div className="teminal-title-coin-lastPrice-head">24h Volume</div>
                                        <div className="teminal-title-coin-lastPrice-body">1.79B USDT / 65.06K BTC / $1.79B</div>
                                    </div>
                                </div>
                                <button className='deleteBookmarkBtn-chart' onClick={() => { handleDeleteDiv(item) }}>&#215;</button>
                            </div>
                            <Chart props={item.symb} index={index} />
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
                <Layout />
                <Bookmarks props={layoutProps}/>
            </div>
            <div className="main-char-container">                
                {ChartSymbListLayout}
            </div>     
        </React.Fragment>
    );
}

export default Charts;