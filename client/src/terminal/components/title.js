import React from 'react';

const Title = () => {
    const dataLocalStorage = JSON.parse(localStorage.getItem("bookmarkList"));
    return (
        <div className="terminal-title">
            <div className="teminal-title-coin-logo"><img src='./icons/avatar.png' style={{width:'40px'}}/></div>
            <div className="teminal-title-coin-title">
                <div className="teminal-title-coin-title-market">Binance</div>
                <div className="teminal-title-coin-title-pair">{dataLocalStorage[0].symbol}/USDT</div>
            </div>
            <div className="teminal-title-coin-lastPrice">
                <div className="teminal-title-coin-lastPrice-head">Last Price</div>
                <div className="teminal-title-coin-lastPrice-body">$ {dataLocalStorage[0].price}</div>
            </div>
            <div className="teminal-title-coin-24C">
                <div className="teminal-title-coin-24C-head">Change</div>
                <div className="teminal-title-coin-24C-body">{dataLocalStorage[0].change} %</div>
            </div>
            <div className="teminal-title-coin-24V">
                <div className="teminal-title-coin-24V-head">Volume</div>
                <div className="teminal-title-coin-24V-body">{dataLocalStorage[0].volume}</div>
            </div>
            <div className="teminal-title-coin-24M">
                <div className="teminal-title-coin-24M-head">Market Cap</div>
                <div className="teminal-title-coin-24M-body">{dataLocalStorage[0].marketCap}</div>
            </div>
        </div>
    );
}

export default Title;