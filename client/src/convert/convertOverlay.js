// import React, { useState } from 'react';
// import './convert.css';
// import symbols from '../positions/coinList';

// function Overlay(props) {
//   const [showOverlay, setShowOverlay] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOrder, setSortOrder] = useState(null);
//   const [activeButton, setActiveButton] = useState(null);
//   const [data, setData] = useState([...symbols]);
//   let sortedData;
//   const { onCoinChange } = props;
//   const handleOpenOverlay = () => {
//     setShowOverlay(true);
//   };

//   const handleCloseOverlay = () => {
//     setShowOverlay(false);
//   };

//   const handleResetSort = () => {
//     setData([...symbols]);
//     setSortOrder("none");
//   };

  
//   const handleSort = (order) => {
//     sortedData = {};
//     if (order === "name-asc") {
//       sortedData = data.sort((a, b) => a.localeCompare(b));
//     } else if (order === "name-desc") {
//       sortedData = data.sort((a, b) => b.localeCompare(a));
//     }
//     setData(sortedData);
//     setSortOrder(order);
//   };
//   let filteredData = Object.values(symbols).filter(item =>
//     item.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   if (sortOrder === "name-asc") {
//     filteredData = filteredData.sort((a, b) => a.localeCompare(b));
//   } else if (sortOrder === "name-desc") {
//     filteredData = filteredData.sort((a, b) => b.localeCompare(a));
//   }


//   const changeCoin = (newCoin) => {
//     onCoinChange(newCoin);
//   };

//   return (
//     <div>
//       <button onClick={handleOpenOverlay} className='openListBtn'>&#9660;</button>
//       {showOverlay && (
//         <div className="overlay">
//           <div className="overlayContainer">
//             <div className="overlayHeader">
//               <p className='overlayTitle'>Select a coin</p>
//               <button onClick={handleCloseOverlay} className='closeOverlay'>&#215;</button>
//             </div>
//             <div className='listOfCrypto'>
//               <div className='searchSortOverlay'>
//                 <input className="input-search-convert" placeholder="Search coins" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//                 <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
//                   <div className='sortOverlay'>Sort by name</div>
//                   <div className='sortBtns'>
//                     <button
//                       onClick={() => {
//                         if (sortOrder === "name-asc") {
//                           handleResetSort();
//                         } else {
//                           handleSort("name-asc");
//                         }
//                         setActiveButton(activeButton === "name-asc" ? null : "name-asc");
//                       }}
//                       className={`sort-button ${activeButton === "name-asc" ? "active" : ""}`}
//                     >
//                       &#9650;
//                     </button>
//                     <button
//                       onClick={() => {
//                         if (sortOrder === "name-desc") {
//                           handleResetSort();
//                         } else {
//                           handleSort("name-desc");
//                         }
//                         setActiveButton(activeButton === "name-desc" ? null : "name-desc");
//                       }}
//                       className={`sort-button ${activeButton === "name-desc" ? "active" : ""}`}
//                     >
//                       &#9660;
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               {filteredData.map((coin, index) => (
//                 <button key={index} className="listElemOverlay" onClick={() => {changeCoin(coin); handleCloseOverlay();}}>{coin}</button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Overlay;

// function Overlay(props) {
//         const [showOverlay, setShowOverlay] = useState(false);
//         const [searchTerm, setSearchTerm] = useState("");
//         const [sortOrder, setSortOrder] = useState("rank_asc");
//         const [activeButton, setActiveButton] = useState(null);
//         const [data, setData] = useState([]);
//         const [currentPage, setCurrentPage] = useState(1);
//         const [coinsPerPage, setCoinsPerPage] = useState(50);
//         const [filteredData, setFilteredData] = useState([]);
//         let sortedData;
//         const { bookmarkList } = props.props;
//         const handleOpenOverlay = () => {
//           setShowOverlay(true);
//           handleResetSort();
//         };

//         const handleCloseOverlay = () => {
//           setShowOverlay(false);
//         };

//         const handleResetSort = async () => {
//           const symbs = await GetListOfCoins(coinsPerPage, coinsPerPage * (currentPage - 1));
//           const symbData = symbs.map(elem => ({ key: uuidv4(), symbol: elem.symbol, price: elem.quotes.USD.price, change: elem.quotes.USD.percent_change_7d, volume: elem.quotes.USD.volume_24h, marketCap: elem.quotes.USD.market_cap}));
//           setData([...symbData]);
//           setSortOrder("rank_asc");
//         };
//         useEffect(()=>{
//           const handleSort = async () => {
//             sortedData = {};
//             const link = `${serverLink}api/coins?limit=${coinsPerPage}&offset=${coinsPerPage * (currentPage - 1)}&orderby=${sortOrder}`;
//             const response = await fetch(link, {
//               method: 'GET',
//               mode: 'cors',
//               headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//               },
//             });
//             const symbs = await response.json();
            
//             const symbNames = symbs.map(elem => ({ key: uuidv4(), symbol: elem.symbol, price: elem.quotes.USD.price, change: elem.quotes.USD.percent_change_7d, volume: elem.quotes.USD.volume_24h, marketCap: elem.quotes.USD.market_cap}));
//             setData([...symbNames]);
//             setFilteredData([...symbNames]);
//           };
//           handleSort();
//         },[sortOrder])
        
//         useEffect(() => { handleSearch() }, [coinsPerPage, currentPage, searchTerm])

//         const handleSearch = async () => {
//           const link = `http://3.8.190.201/api/coins?limit=2500&offset=0&orderby=${sortOrder}&query=${searchTerm}`;
//           const response = await fetch(link, {
//             method: 'GET',
//             mode: 'cors',
//             headers: {
//               "Access-Control-Allow-Origin": "*",
//               "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//             },
//           });
//           const listOfSearch = await response.json();
//           let symbNames = [];
//           for (let i = coinsPerPage * (currentPage - 1); i < coinsPerPage + coinsPerPage * (currentPage - 1) && i < listOfSearch.length; i++) {
//             symbNames.push({ key: uuidv4(), symbol: listOfSearch[i].symbol, price: listOfSearch[i].quotes.USD.price, change: listOfSearch[i].quotes.USD.percent_change_7d, volume: listOfSearch[i].quotes.USD.volume_24h, marketCap: listOfSearch[i].quotes.USD.market_cap});
//           }
//           setData([...symbNames]);
//           setFilteredData([...symbNames]);
//         }

//         const createCoin = (newCoin, newPrice, newChange, newVolume, newMarketCap) => {
//           if (Array.isArray(bookmarkList)) {
//             setBookmarkList([...bookmarkList, { key: uuidv4(), symbol: newCoin, price: newPrice, change: newChange, volume: newVolume, marketCap: newMarketCap }]);
//           } else {
//             console.log('ChartSymbList is not defined or is not an array');
//           }
//         };

//         const Pagination = () => {
//           const handlePageChange = (e) => {
//             const pageNumber = parseInt(e.target.value, 10);
//             if (pageNumber >= 1 && pageNumber <= Math.ceil(2500 / coinsPerPage)) {
//               setCurrentPage(pageNumber);
//             }
//           };

//           return (
//             <div>
//               <input
//                 type="number"
//                 value={currentPage}
//                 min="1"
//                 max={Math.ceil(2500 / coinsPerPage)}
//                 onChange={handlePageChange}
//               />
//               <span> of {Math.ceil(2500 / coinsPerPage)}</span>
//               <button key={uuidv4()} onClick={() => setCurrentPage(currentPage + 1)} className='paginationBtn'>Next</button>
//               <button key={uuidv4()} onClick={() => setCurrentPage(currentPage - 1)} className='paginationBtn'>Previous</button>
//             </div>
//           );
//         };

//         useEffect(() => {
//           if (showOverlay) {
//             window.scrollTo(0, 0);
//             const coinSorts = ["Name", "Price", "24h_Change"];
//             const paginationBtns = [25, 50, 100, 200, 500, 1000];
//             modelRoot.render(
//               <div className="overlay" style={{ zIndex: '1001' }}>
//                 <div className="overlayContainer">
//                   <div className="overlayHeader">
//                     <p className='overlayTitle'>Select a coin</p>
//                     <input className="input-search-convert" placeholder="Search coins" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//                     <div className="searchSortOverlayOuter">
//                       {coinSorts.map(elem => (
//                         <div className='searchSortOverlayInner' key={elem}>
//                           <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
//                             <div className='sortOverlay'>{elem != "24h_Change" ? elem : "Change"}</div>
//                             <div className='sortBtns'>
//                               <button key={uuidv4()}
//                                 onClick={() => {
//                                   if (sortOrder === `${elem}_asc`) {
//                                     handleResetSort();
//                                   } else {
//                                     setSortOrder(`${elem}_asc`.toLowerCase());
//                                   }
//                                   setActiveButton(activeButton === `${elem}_asc` ? null : `${elem}_asc`);
//                                 }}
//                                 className={`sort-button ${activeButton === `${elem}_asc` ? "active" : ""}`}
//                               >
//                                 &#9650;
//                               </button>
//                               <button key={uuidv4()}
//                                 onClick={() => {
//                                   if (sortOrder === `${elem}_desc`) {
//                                     handleResetSort();
//                                   } else {
//                                     setSortOrder(`${elem}_desc`.toLowerCase());
//                                   }
//                                   setActiveButton(activeButton === `${elem}_desc` ? null : `${elem}_desc`);
//                                 }}
//                                 className={`sort-button ${activeButton === `${elem}_desc` ? "active" : ""}`}
//                               >
//                                 &#9660;
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                     <button key={uuidv4()} onClick={handleCloseOverlay} className='closeOverlay'>&#215;</button>
//                   </div>
//                   <div className='listOfCrypto'>
//                     <div className="inner-overlay-container">
//                       {filteredData
//                         .slice(0, currentPage * coinsPerPage)
//                         .map((elem) => (
//                           <button
//                             key={uuidv4()}
//                             className="listElemOverlay"
//                             onClick={() => {
//                               createCoin(elem.symbol, elem.price, elem.change, elem.volume, elem.marketCap);
//                               handleCloseOverlay();
//                             }}
//                           >
//                             <span>{elem.symbol}</span>
//                             <span>${elem.price > 1 ? parseFloat(elem.price).toFixed(2) : parseFloat(elem.price).toFixed(8)}</span>
//                           </button>
//                         ))}
//                     </div>
//                   </div>
//                   <div className="pagination">
//                     <div>
//                       {paginationBtns.map(elem => (
//                         <button key={uuidv4()}
//                           className={`coinsPerPageButton ${coinsPerPage === elem ? "active" : ""}`}
//                           onClick={() => {
//                             setCoinsPerPage(elem);
//                             setCurrentPage(1);
//                           }}
//                         >
//                           {elem}
//                         </button>
//                       ))}
//                     </div>
//                     <Pagination />
//                   </div>
//                 </div>
//               </div>
//             )
//           }
//           else {
//             modelRoot.render(<></>);
//           }
//         }, [showOverlay, filteredData, coinsPerPage, currentPage])

//         return (
//           <button key={uuidv4()} onClick={handleOpenOverlay} className={'addBookmarkBtnChart'}><span>+</span></button>
//         );
//       }