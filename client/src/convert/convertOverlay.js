import React, { useState } from 'react';
import './convert.css';
import symbols from '../coinList';

function Overlay(props) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [data, setData] = useState([...symbols]);
  let sortedData;
  const { onCoinChange } = props;
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
    onCoinChange(newCoin);
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
                <input className="input-search" placeholder="Search coins" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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

export default Overlay;