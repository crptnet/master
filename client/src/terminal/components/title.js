import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import '../terminal.css';

const Title = () => {
    return (
        <div className="terminal-title">
            <div className="teminal-title-coin-logo"><img src='./icons/avatar.png' style={{width:'40px'}}/></div>
            <div className="teminal-title-coin-title">
                <div className="teminal-title-coin-title-market">Binance</div>
                <div className="teminal-title-coin-title-pair">BTC/USDT</div>
            </div>
            <div className="teminal-title-coin-lastPrice">
                <div className="teminal-title-coin-lastPrice-head">Last Price</div>
                <div className="teminal-title-coin-lastPrice-body">27155.74 (~27165.18 USD)</div>
            </div>
            <div className="teminal-title-coin-24C">
                <div className="teminal-title-coin-24C-head">
24h Change</div>
                <div className="teminal-title-coin-24C-body">-3.68%</div>
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
    );
}

export default Title;