// View.js
import React from 'react';
import Model from '../model';
import ModelOverlay from './model';

import Pagination from "./pagination/pagination";

import { v4 as uuidv4 } from 'uuid';

const View = () => {
    const model = ModelOverlay();
    const { 
        searchTerm,
        sortOrder,
        setSortOrder,
        activeButton,
        setActiveButton,
        currentPage,
        setCurrentPage,
        coinsPerPage,
        setCoinsPerPage,
        filteredData,
        status,
        handleCloseOverlay,
        handleResetSort
    } = model;

    const model2 = Model();
    const {
        inputCoin,
        setInputCoin,
        outputCoin,
        setOutputCoin,
        exchangeRate
    } = model2;
    window.scrollTo(0, 0);
    const coinSorts = ["Name", "Price", "24h_Change"];     
    const paginationBtns = [25, 50, 100, 200, 500, 1000];

    return (
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
    );  
};

export default View;
