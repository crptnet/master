// View.js
import React from 'react';

import Total from './components/total';
import Balance from './components/balance';
import Trades from './components/trades';
import CoinsOwned from './components/coinsOwned';

import Model from './model';

const View = () => {
    const model = Model();
    const { chartRef } = model;
    
    return (
        <div className='walletContainerOuter'>
            <Total />
            <div className='walletContainer'>
                <div className="chartTopContainerWallet">
                    <canvas id="acquisitions" ref={chartRef} className='chartContainerWallet' />
                </div>
                <div className="detailedDataContainerWallet">
                    <Balance />
                    <Trades />
                </div>
            </div>
            <CoinsOwned />   
        </div>
    ); 
};

export default View;
