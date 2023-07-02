// Controller.js
import React, { useEffect } from 'react';
import ModelOverlay from './model';
import View from './view';
import { v4 as uuidv4 } from 'uuid';
import { modelRoot } from '../../roots';


const Controller = (props) => {
    console.log(props.status);
    const model = ModelOverlay(props.status);
    const {
        showOverlay,
        searchTerm,
        sortOrder,
        currentPage,
        coinsPerPage,
        filteredData,
        handleOpenOverlay,
        handleSort,
        handleSearch
    } = model;

    useEffect(()=>{ handleSort() }, [sortOrder]);
    
    useEffect(() => { handleSearch() }, [coinsPerPage, currentPage, searchTerm]);

    useEffect(() => {
        showOverlay ? modelRoot.render(<View />) : modelRoot.render(<></>);
    }, [showOverlay, filteredData, coinsPerPage, currentPage]);

    return (
        <button key={uuidv4()} onClick={handleOpenOverlay} className='sort-button'><span>&#9660;</span></button>
    );
}

export default Controller;