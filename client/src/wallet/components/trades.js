import React from 'react';

import Model from '../model';

const Trades = () => {
    const model = Model();
    const { trades } = model;
    
    return (
        <div className='tradesContainerWallet'>
            <div className='tradesTitleWallet'>Trade History</div>
            <div className="tradesContainerInner">
                <div className="tradesHeaderContainerWallet">
                <span>Buy</span>
                <span>Sell</span>
                <span>Gained</span>
                </div>
                {trades.map((elem,index) => (
                <div key={index} className={`tradeContainerWallet ${elem.gainedLost < 0 ? 'red' : 'green'}`}>
                    <span>{elem.amountBuy}&nbsp;{elem.symbolBuy}</span>
                    <span>{elem.amountSell}&nbsp;{elem.symbolSell}</span>
                    <span>{elem.gainedLost}&nbsp;$</span>
                </div>
                ))}
            </div>
        </div>
    );
}

export default Trades;