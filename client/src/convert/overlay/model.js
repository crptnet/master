import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ServerLink from '../../'
import GetListOfCoins from '../../components/Fetches/dataDisplay/listOfCoinsAPI';

const ModelOverlay = (status) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("rank_asc");
    const [activeButton, setActiveButton] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [coinsPerPage, setCoinsPerPage] = useState(50);
    const [filteredData, setFilteredData] = useState([]);

    const handleOpenOverlay = () => {
        setShowOverlay(true);
        handleResetSort();
    };

    const handleCloseOverlay = () => {
        setShowOverlay(false);
    };

    const handleResetSort = async () => {
        const symbs = await GetListOfCoins(coinsPerPage, coinsPerPage * (currentPage - 1));
        const symbData = symbs.map(elem => ({ key: uuidv4(), symbol: elem.symbol, price: elem.quotes.USD.price, change: elem.quotes.USD.percent_change_7d, volume: elem.quotes.USD.volume_24h, marketCap: elem.quotes.USD.market_cap}));
        setSortOrder("rank_asc");
    };

    const handleSort = async () => {
        const link = `${ServerLink}api/coins?limit=${coinsPerPage}&offset=${coinsPerPage * (currentPage - 1)}&orderby=${sortOrder}`;
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
        setFilteredData([...symbNames]);
    };

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
        setFilteredData([...symbNames]);
    }

    return {
        showOverlay,
        setShowOverlay,
        searchTerm,
        setSearchTerm,
        sortOrder,
        setSortOrder,
        activeButton,
        setActiveButton,
        currentPage,
        setCurrentPage,
        coinsPerPage,
        setCoinsPerPage,
        filteredData,
        setFilteredData,
        status,
        handleOpenOverlay,
        handleCloseOverlay,
        handleResetSort,
        handleSort,
        handleSearch
    };
};

export default ModelOverlay;