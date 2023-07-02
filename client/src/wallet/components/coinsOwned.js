import React from 'react';

import Model from '../model';

const CoinsOwned = () => {
    const model = Model();
    const { coins } = model;

    return (
        <div className='ownedCoinsWallet'>
            <div className="coinsContainerWalletInner">
                <div className='coinsTitleWallet'>Coins Owned</div>
                    <div className="coinsContainerInner">
                    <div className="coinsHeaderContainerWallet">
                        <span>Coin</span>
                        <span>Amount</span>
                        <span>Price</span>
                        <span>Sum</span>
                    </div>
                    {coins.map((elem,index)=>(
                    <div key={index} className='coinContainerWallet'>
                        <span>{elem.symbol}</span>
                        <span>{elem.ownInCoin}</span>
                        <span>{elem.price}&nbsp;$</span>
                        <span>{(elem.ownInCoin*elem.price).toFixed(2)}&nbsp;$</span>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CoinsOwned;