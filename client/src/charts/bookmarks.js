import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import symbols from '../positions/coinList';
import './charts.css';
import { modelRoot } from '..';

const bookmarksArr = [];

const Bookmarks = (props) => {
  const {length, type} = props.props;
  const [bookmarkList, setBookmarkList] = useState(() => {
    const savedDivList = localStorage.getItem("bookmarkList");
    if (savedDivList) {
      return JSON.parse(savedDivList);
    } else {
      return bookmarksArr;
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
    const [showOverlay, setShowOverlay] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState(null);
    const [activeButton, setActiveButton] = useState(null);
    const [data, setData] = useState([...symbols]);
    let sortedData;
    const { bookmarkList }  = props.props;
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
        )
      } 
      else
      {
        modelRoot.render(<></>);
      }   
    },[showOverlay])

    return (
      <button onClick={handleOpenOverlay} className='addBookmarkBtnChart'><span>+</span></button>
    );
  }







  function OverlayWithSymb(props) { 
    const [showOverlay, setShowOverlay] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState(null);
    const [activeButton, setActiveButton] = useState(null);
    const [data, setData] = useState([...symbols]);
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