import React, { useEffect, useRef, useState } from 'react';
import './wallet.css';
import Chart from 'chart.js/auto';

const Wallet = () => {
  const [balancePeriod, setBalancePeriod] = useState('1M');
  const chartRef = useRef(null);
  const balanceData = {day:{raised:543,spent:440},week:{raised:6932,spent:8756},month:{raised:53453,spent:42324}};
  const coins = [{symbol:'BTC',price:27500.32,ownInCoin:0.14}, {symbol:'ETH',price:1754.21,ownInCoin:2.4}, {symbol:'TRX',price:0.54,ownInCoin:43129.43},{symbol:'BTC',price:27500.32,ownInCoin:0.14}, {symbol:'ETH',price:1754.21,ownInCoin:2.4}, {symbol:'TRX',price:0.54,ownInCoin:43129.43},{symbol:'BTC',price:27500.32,ownInCoin:0.14}, {symbol:'ETH',price:1754.21,ownInCoin:2.4}, {symbol:'TRX',price:0.54,ownInCoin:43129.43}];
  const trades = [{symbolBuy:'BTC', amountBuy:'0.003', symbolSell:'USDT', amountSell:'94', gainedLost:-4}, {symbolBuy:'BNB', amountBuy:'50.2', symbolSell:'BTC', amountSell:'0.42', gainedLost:5432}, {symbolBuy:'TRX', amountBuy:'423.21', symbolSell:'ETH', amountSell:'0.54', gainedLost:15},{symbolBuy:'BTC', amountBuy:'0.003', symbolSell:'USDT', amountSell:'94', gainedLost:-4}, {symbolBuy:'BNB', amountBuy:'50.2', symbolSell:'BTC', amountSell:'0.42', gainedLost:5432}, {symbolBuy:'TRX', amountBuy:'423.21', symbolSell:'ETH', amountSell:'0.54', gainedLost:15},{symbolBuy:'BTC', amountBuy:'0.003', symbolSell:'USDT', amountSell:'94', gainedLost:-4}, {symbolBuy:'BNB', amountBuy:'50.2', symbolSell:'BTC', amountSell:'0.42', gainedLost:5432}, {symbolBuy:'TRX', amountBuy:'423.21', symbolSell:'ETH', amountSell:'0.54', gainedLost:15},{symbolBuy:'BTC', amountBuy:'0.003', symbolSell:'USDT', amountSell:'94', gainedLost:-4}, {symbolBuy:'BNB', amountBuy:'50.2', symbolSell:'BTC', amountSell:'0.42', gainedLost:5432}, {symbolBuy:'TRX', amountBuy:'423.21', symbolSell:'ETH', amountSell:'0.54', gainedLost:15},{symbolBuy:'BTC', amountBuy:'0.003', symbolSell:'USDT', amountSell:'94', gainedLost:-4}, {symbolBuy:'BNB', amountBuy:'50.2', symbolSell:'BTC', amountSell:'0.42', gainedLost:5432}, {symbolBuy:'TRX', amountBuy:'423.21', symbolSell:'ETH', amountSell:'0.54', gainedLost:15}];
  useEffect(() => {
    const data = {
        datasets: [
          {
            data: [300, 50, 100, 300, 50, 100],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)','rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
            borderColor: '#d1d4dc',
            hoverOffset: 20,
            weight: 20,
            clip: 20
          },
        ]
    };

    if (chartRef.current) {
      new Chart(chartRef.current, {
        type: 'doughnut',
        data: data,
      });
    }
  }, []);


  const Total = () => {
    return (
      <div className="totalContainerWallet">
        <div className="totalContainerWalletInner">
          <p className="totalAmountWallet">$ 5783790.54</p>
        </div>
      </div>
    );
  }

  const CoinData = () => {
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

    const Trades = () => {
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


  const Balance = () => {
    let raisedValue, spentValue;

    if (balancePeriod === '1D') {
      raisedValue = balanceData.day.raised;
      spentValue = balanceData.day.spent;
    } else if (balancePeriod === '1W') {
      raisedValue = balanceData.week.raised;
      spentValue = balanceData.week.spent;
    } else if (balancePeriod === '1M') {
      raisedValue = balanceData.month.raised;
      spentValue = balanceData.month.spent;
    }

    return (
      <div className='balanceContainerWallet'>
        <div className='balanceTitleWallet'>
          <span>Balance Change</span>
          <span className='chooseBalancePeriod'>{balancePeriod}</span>
          <div className="innerBalancePeriod">
            <button onClick={() => setBalancePeriod('1D')}>1D</button>
            <button onClick={() => setBalancePeriod('1W')}>1W</button>
            <button onClick={() => setBalancePeriod('1M')}>1M</button>
          </div>
        </div>
        <div className={`monthChangeContainerWallet ${raisedValue - spentValue < 0 ? 'red' : 'green'}`}>
          <div className="monthTitleContentWallet">Change</div>
          <div className="monthChangeContentWallet">
            {raisedValue - spentValue}&nbsp;$
          </div>
        </div>
        <div className="monthExpendsContainerWallet red">
          <div className="monthExpendsTitleWallet">Spent</div>
          <div className="monthChangeContentWallet">{spentValue}&nbsp;$</div>
        </div>
        <div className="monthRaiseContainerWallet green">
          <div className="monthRaiseTitleWallet">Raised</div>
          <div className="monthChangeContentWallet">{raisedValue}&nbsp;$</div>
        </div>
      </div>
    );
  }

  return (
      <div className='walletContainerOuter'>
        {/* <button className='changeMonthWallet'>this month</button> */}
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
        <CoinData />   
      </div>
    );  
};

export default Wallet;

