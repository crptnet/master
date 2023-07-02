// View.js
import React from 'react';
import Model from './model';
import Controller from './overlay/controller';

import { v4 as uuidv4 } from 'uuid';

const View = () => {
    const model = Model();
    const  {
        inputCoin,
        setInputCoin,
        outputCoin,
        setOutputCoin,
        exchangeRate,
        fetchExchangeRates,
        handleChangeValues,
        handleSwap
    } = model;
    
      return (
    <>
      <div className='convertContainer'>
        <button className="swapBtn" onClick={handleSwap}><img src='./icons/convert_dark.png' className="swapImg" /></button>
        <div className="convertFrom">
          <div id="coinFrom">
            <p className="innerText">From</p>
            <div className="right">
              <div id="coinInput">
                <p className='coinName'>{inputCoin}</p>
              </div>
              <div id="highBtn">
                <Controller status={"from"}/>
              </div>
            </div>
          </div>
          <input className="inputAmount" type="number" inputMode="numeric" id="input" placeholder="0.00" onInput={(event) => {handleChangeValues(event, 'to');}}/>
        </div>
        <div className="convertTo">
          <div id="coinTo">
            <p className="innerText">To</p>
            <div className="right">
              <div id="coinOutput">
                <p className='coinName'>{outputCoin}</p>
              </div>
              <div id="lowBtn">
                <Controller status={"to"}/>
              </div>
            </div>
          </div>
          <input className="inputAmount" type="number" inputMode="numeric" id="output" placeholder="0.00" onInput={(event) => {handleChangeValues(event, 'from');}}/>
        </div>        
        <div className="rate">
          Exchange rate 1 {inputCoin} ~ {exchangeRate} {outputCoin}
        </div>   
      </div>
    </>
  ); 
};

export default View;
