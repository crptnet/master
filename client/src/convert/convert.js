import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './convert.css';
import SideBar from '../sideBar';
import Overlay from './convertOverlay';

function Convert() {

  const fetchExchangeRates = async () => {
    try {
      const response1 = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${inputCoin}USDT`);
      const response2 = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${outputCoin}USDT`);

      const data1 = await response1.json();
      const data2 = await response2.json();

      const rate = parseFloat(data1.price) / parseFloat(data2.price);

      setExchangeRate(rate.toFixed(4));
    } catch (error) {
      console.error(error);
    }
  };

  const [inputCoin, setInputCoin] = useState("BTC");
  const [outputCoin, setOutputCoin] = useState("ETH");
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    fetchExchangeRates();
  }, [inputCoin, outputCoin]);

  const handleInput = (event) => {
    const {value} = event.target;
    if (value !== '') {
      Promise.all([
        fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${inputCoin}USDT`),
        fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${outputCoin}USDT`)
      ])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => {
          output.value = value * (parseFloat(data[0].price) / parseFloat(data[1].price));
        })
        .catch(error => console.error(error));
    }
  };

  const handleOutput = (event) => {
    const {value} = event.target;
    if (value !== '') {
      Promise.all([
        fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${inputCoin}USDT`),
        fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${outputCoin}USDT`)
      ])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => {
          input.value = value * parseFloat(data[1].price) / parseFloat(data[0].price);
        })
        .catch(error => console.error(error));
    }
  };

  const handleSwap = () => {
    const temp1 = inputCoin;
    setInputCoin(outputCoin);
    setOutputCoin(temp1);
    const inputElement = document.getElementById('input');
    const outputElement = document.getElementById('output');
    const temp2 = inputElement.value;
    inputElement.value = outputElement.value;
    outputElement.value = temp2;
  };

  useEffect(() => {
    handleOutput({ target: { value: output.value } });
  }, [inputCoin]);

  useEffect(() => {
    handleInput({ target: { value: input.value } });
  }, [outputCoin]);

  return (
    <>
      <div className="convertFrom">
        <div id="coinFrom">
          <p className="innerText">From</p>
          <div className="right">
            <div id="coinInput">
              <p className='coinName'>{inputCoin}</p>
            </div>
            <div id="highBtn">
              <Overlay onCoinChange={setInputCoin}/>
            </div>
          </div>
        </div>
        <input className="inputAmount" type="number" inputMode="numeric" id="input" placeholder="0.00" onInput={handleInput}/>
      </div>
      <div className="convertTo">
        <div id="coinTo">
          <p className="innerText">To</p>
          <div className="right">
            <div id="coinOutput">
              <p className='coinName'>{outputCoin}</p>
            </div>
            <div id="lowBtn">
              <Overlay onCoinChange={setOutputCoin}/>
            </div>
          </div>
        </div>
        <input className="inputAmount" type="number" inputMode="numeric" id="output" placeholder="0.00" onInput={handleOutput}/>
      </div>        
      <div className="rate">
        Exchange rate 1 {inputCoin} ~ {exchangeRate} {outputCoin}
      </div>   
      <button className="swapBtn" onClick={handleSwap}><img src='./icons/convert_dark.png' className="swapImg" /></button>
    </>
  );
}
ReactDOM.createRoot(document.getElementById('convert')).render(<Convert />);
ReactDOM.createRoot(document.getElementById('sidebar')).render(<SideBar active={8} />);