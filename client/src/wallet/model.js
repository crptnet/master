// Model.js
import { useState, useEffect, useRef } from 'react';

import Chart from 'chart.js/auto';

const Model = () => {
    const [balancePeriod, setBalancePeriod] = useState('1M');
    const chartRef = useRef(null);
    const balanceData = {day:{raised:543,spent:440},week:{raised:6932,spent:8756},month:{raised:53453,spent:42324}};
    const coins = [{symbol:'BTC',price:27500.32,ownInCoin:0.14}, {symbol:'ETH',price:1754.21,ownInCoin:2.4}, {symbol:'TRX',price:0.54,ownInCoin:43129.43},{symbol:'BTC',price:27500.32,ownInCoin:0.14}, {symbol:'ETH',price:1754.21,ownInCoin:2.4}, {symbol:'TRX',price:0.54,ownInCoin:43129.43},{symbol:'BTC',price:27500.32,ownInCoin:0.14}, {symbol:'ETH',price:1754.21,ownInCoin:2.4}, {symbol:'TRX',price:0.54,ownInCoin:43129.43}];
    const trades = [{symbolBuy:'BTC', amountBuy:'0.003', symbolSell:'USDT', amountSell:'94', gainedLost:-4}, {symbolBuy:'BNB', amountBuy:'50.2', symbolSell:'BTC', amountSell:'0.42', gainedLost:5432}, {symbolBuy:'TRX', amountBuy:'423.21', symbolSell:'ETH', amountSell:'0.54', gainedLost:15},{symbolBuy:'BTC', amountBuy:'0.003', symbolSell:'USDT', amountSell:'94', gainedLost:-4}, {symbolBuy:'BNB', amountBuy:'50.2', symbolSell:'BTC', amountSell:'0.42', gainedLost:5432}, {symbolBuy:'TRX', amountBuy:'423.21', symbolSell:'ETH', amountSell:'0.54', gainedLost:15},{symbolBuy:'BTC', amountBuy:'0.003', symbolSell:'USDT', amountSell:'94', gainedLost:-4}, {symbolBuy:'BNB', amountBuy:'50.2', symbolSell:'BTC', amountSell:'0.42', gainedLost:5432}, {symbolBuy:'TRX', amountBuy:'423.21', symbolSell:'ETH', amountSell:'0.54', gainedLost:15},{symbolBuy:'BTC', amountBuy:'0.003', symbolSell:'USDT', amountSell:'94', gainedLost:-4}, {symbolBuy:'BNB', amountBuy:'50.2', symbolSell:'BTC', amountSell:'0.42', gainedLost:5432}, {symbolBuy:'TRX', amountBuy:'423.21', symbolSell:'ETH', amountSell:'0.54', gainedLost:15},{symbolBuy:'BTC', amountBuy:'0.003', symbolSell:'USDT', amountSell:'94', gainedLost:-4}, {symbolBuy:'BNB', amountBuy:'50.2', symbolSell:'BTC', amountSell:'0.42', gainedLost:5432}, {symbolBuy:'TRX', amountBuy:'423.21', symbolSell:'ETH', amountSell:'0.54', gainedLost:15}];
    
    useEffect(() => {
        createChart();
    }, []);

    const createChart = () => {
        const data = {
            datasets: [
                {
                data: [300, 50, 100, 300, 50, 100],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                ],
                borderColor: '#d1d4dc',
                hoverOffset: 20,
                weight: 20,
                clip: 20,
                },
            ],
        };

        if (chartRef.current) {
            new Chart(chartRef.current, {
                type: 'doughnut',
                data: data,
            });
        }
    };
    
    return {
        balancePeriod,
        setBalancePeriod,
        chartRef,
        balanceData,
        coins,
        trades,
        createChart
    };
}

export default Model;