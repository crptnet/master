// TO DO LIST - WEEKEND
// 1.Fix pagination
// 2.Fix pagination sort
// 3.Upgrade overlay for changing coin
// 4.Connect websocket
// 5.Increase the number of fields for every coin
// 6.Update data on charts page


import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactPaginate from 'react-paginate';
import GetListOfCoins from '../listOfCoinsAPI';
import symbols from '../positions/coinList';
import './charts.css';
import { modelRoot } from '../index';
import SubscribeToWebSocket from '../socket';

const Bookmarks = (props) => {
  //SubscribeToWebSocket();
  const length = props.props;
  const [bookmarkList, setBookmarkList] = useState(() => {
    const savedDivList = localStorage.getItem("bookmarkList");
    if (savedDivList) {
      return JSON.parse(savedDivList);
    } else {
      return [];
    }
  });
  const [BookListLayout, setBookListLayout] = useState(<></>);
  const [initialValue, setInitialValue] = useState(true);
  useEffect(() => {
      if (initialValue) {
          setInitialValue(false);
          return;
      }
      window.location.reload(true);
  }, [bookmarkList]);
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
      console.log(totalWidth,window.innerWidth)
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
  useEffect(()=>{console.log(bookmarkList)},[bookmarkList])
  useEffect(()=>{console.log("LAYOUT",BookListLayout)},[BookListLayout])

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(bookmarkList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBookmarkList(items);
  }

  function handleAddDiv(coin) {
    
    const newDiv = {
      key: uuidv4(),
      symb: `${coin}`,
    };
    setBookmarkList([...bookmarkList, newDiv]);
  }
  function handleDeleteDiv(id) {
    setBookmarkList(bookmarkList.filter(elem => elem.key != id));
  }





  function Overlay(props) {
    console.log("!!")
    const [showOverlay, setShowOverlay] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("default");
    const [activeButton, setActiveButton] = useState(null);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coinsPerPage, setCoinsPerPage] = useState(25);

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
      const symbData = symbs.map(elem => ({key: uuidv4(), symbol:elem.symbol, price: elem.quotes.USD.price}));
      setData([...symbData]);
      setSortOrder("default");
    };

    const handleSort = async (order) => {
      sortedData = {};
      let link;
      if (order === "Name-asc") {
        link = `http://3.8.190.201/api/coins?limit=${coinsPerPage}&offset=${coinsPerPage*(currentPage-1)}&orderby=name_asc`;
      } else if (order === "Name-desc") {
        link = `http://3.8.190.201/api/coins?limit=${coinsPerPage}&offset=${coinsPerPage*(currentPage-1)}&orderby=name_desc`;
      } else if (order === "Price-asc") {
        link = `http://3.8.190.201/api/coins?limit=${coinsPerPage}&offset=${coinsPerPage*(currentPage-1)}&orderby=price_asc`;
      } else if (order === "Price-desc") {
        link = `http://3.8.190.201/api/coins?limit=${coinsPerPage}&offset=${coinsPerPage*(currentPage-1)}&orderby=price_desc`;
      } else if (order === "Change-asc") {
        link = `http://3.8.190.201/api/coins?limit=${coinsPerPage}&offset=${coinsPerPage*(currentPage-1)}&orderby=24h_change_asc`;
      } else if (order === "Change-desc") {
        link = `http://3.8.190.201/api/coins?limit=${coinsPerPage}&offset=${coinsPerPage*(currentPage-1)}&orderby=24h_change_desc`;
      }
      const response = await fetch(link, {
        method: 'GET',
        mode : 'cors',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        },
      });
      const symbs = await response.json();
      console.log("SORTED!", symbs)
      const symbNames = symbs.map(elem => ({key: uuidv4(), symbol:elem.symbol, price: elem.quotes.USD.price}));
      setData([...symbNames]);
      setSortOrder(order);
    };

    const [filteredData, setFilteredData] = useState([]);
    useEffect(()=>{
      if(data!=[] && data!=null) setFilteredData(data.filter(item => item.symbol.toLowerCase().includes(searchTerm.toLowerCase())));
    },[data])

    const createCoin = (newCoin, newPrice) => {
        if (Array.isArray(bookmarkList)) {
            setBookmarkList([...bookmarkList, {key: uuidv4(), symb: newCoin, price: newPrice}]); 
        } else {
            console.log('ChartSymbList is not defined or is not an array');
        }
    };


    useEffect(()=>{
      console.log("limit:",coinsPerPage)
      console.log("offset:",currentPage)
      console.log(filteredData)
      if(showOverlay)
      {
        window.scrollTo(0,0);
        const coinSorts = ["Name","Price","Change"];
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
                      <div className='sortOverlay'>{elem}</div>
                      <div className='sortBtns'>
                        <button
                        onClick={() => {
                            if (sortOrder === `${elem}-asc`) {
                            handleResetSort();
                            } else {
                            handleSort(`${elem}-asc`);
                            }
                            setActiveButton(activeButton === `${elem}-asc` ? null : `${elem}-asc`);
                        }}
                        className={`sort-button ${activeButton === `${elem}-asc` ? "active" : ""}`}
                        >
                        &#9650;
                        </button>
                        <button
                        onClick={() => {
                            if (sortOrder === `${elem}-desc`) {
                            handleResetSort();
                            } else {
                            handleSort(`${elem}-desc`);
                            }
                            setActiveButton(activeButton === `${elem}-desc` ? null : `${elem}-desc`);
                        }}
                        className={`sort-button ${activeButton === `${elem}-desc` ? "active" : ""}`}
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
                  .slice((currentPage - 1) * coinsPerPage, currentPage * coinsPerPage)
                  .map((elem) => (
                    <button
                      key={uuidv4()}
                      className="listElemOverlay"
                      onClick={() => {
                        createCoin(elem.symbol, elem.price);
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
                <button
                  className={`coinsPerPageButton ${coinsPerPage === 25 ? "active" : ""}`}
                  onClick={() => {
                    setCoinsPerPage(25);
                    setCurrentPage(1);
                    handleSort(sortOrder);
                  }}
                >
                  25
                </button>
                <button
                  className={`coinsPerPageButton ${coinsPerPage === 50 ? "active" : ""}`}
                  onClick={() => {
                    setCoinsPerPage(50);
                    setCurrentPage(1);
                    handleSort(sortOrder);
                  }}
                >
                  50
                </button>
                <button
                  className={`coinsPerPageButton ${coinsPerPage === 100 ? "active" : ""}`}
                  onClick={() => {
                    setCoinsPerPage(100);
                    setCurrentPage(1);
                    handleSort(sortOrder);
                  }}
                >
                  100
                </button>
                {data.length > coinsPerPage && (
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={Math.ceil(filteredData.length / coinsPerPage)}
                    onPageChange={({ selected }) => handlePageChange(selected + 1)}
                    containerClassName={"paginationButtons"}
                    previousLinkClassName={"previousButton"}
                    nextLinkClassName={"nextButton"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                  />
                )}
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
    const [showOverlay, setShowOverlay] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState(null);
    const [activeButton, setActiveButton] = useState(null);
    const [data, setData] = useState(null);
    async function getDataStored () {
      const symbs = await GetListOfCoins(0,0);
      const symbData = symbs.map(elem => ({symbol:elem.symbol, price: elem.quotes.USD.price}));
      setData([...symbData])
    }
    getDataStored();
    let sortedData;
    const { bookmarkList, itemKey}  = props.props;
    let chartOverlay = [...bookmarkList]; 
    let index = chartOverlay.findIndex(element => element.key === itemKey);
    const handleOpenOverlay = () => {
        setShowOverlay(true);
    };

    const handleCloseOverlay = () => {
        setShowOverlay(false);
    };

    const handleResetSort = async () => {
        await getDataStored();
        setSortOrder("none");
    };

    const handleSort = (order) => {
        sortedData = {};
        if (order === "price-asc") {
        sortedData = data.sort((a, b) => a.localeCompare(b));
        } else if (order === "price-desc") {
        sortedData = data.sort((a, b) => b.localeCompare(a));
        }
        setData(sortedData);
        setSortOrder(order);
    };
    let filteredData = Object.values(symbols).filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sortOrder === "price-asc") {
        filteredData = filteredData.sort((a, b) => a.localeCompare(b));
    } else if (sortOrder === "price-desc") {
        filteredData = filteredData.sort((a, b) => b.localeCompare(a));
    }
    const changeCoin = (newCoin) => {
        if (Array.isArray(bookmarkList)) {
            chartOverlay = [...bookmarkList]; 
            index = chartOverlay.findIndex(element => element.key === itemKey);
            if (index !== -1) {
                chartOverlay[index].symb = newCoin;
                setBookmarkList(chartOverlay);
                window.location.reload(true);
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
        modelRoot.render(
          <div className="overlay" style={{zIndex:'1001'}}>
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
                    </div>
                </div>
                {filteredData.map((coin, index) => (
                    <button key={index} className="listElemOverlay" onClick={() => {changeCoin(coin); handleCloseOverlay();}}>{coin}</button>
                ))}
                </div>
            </div>
          </div>
        )
      }    
    },[showOverlay])
    return (
        <button onClick={handleOpenOverlay} className='openListFromSymb'>{chartOverlay[index].symb}</button>
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

export default Bookmarks;