// Model.js
import React, { useState, useEffect } from 'react';

import getCoinPrice from '../components/Fetches/dataDisplay/getCoinPrice';

const Model = () => {
    const [inputCoin, setInputCoin] = useState("BTC");
    const [outputCoin, setOutputCoin] = useState("ETH");
    const [exchangeRate, setExchangeRate] = useState(0);

    async function fetchExchangeRates() {
        try {
        const response1 = await getCoinPrice(inputCoin);
        const response2 = await getCoinPrice(outputCoin);

        const rate = parseFloat(response1) / parseFloat(response2);
        setExchangeRate(rate.toFixed(4));
        } catch (error) {
        console.error(error);
        }
    };

    const handleChangeValues = async (event,type) => {
        const {value} = event.target;
        if (value !== '') {
            const response1 = await getCoinPrice(inputCoin);
            const response2 = await getCoinPrice(outputCoin);
            type=="from" ? input.value = value * (parseFloat(response2) / parseFloat(response1)) : output.value = value * (parseFloat(response1) / parseFloat(response2));
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

    return {
        inputCoin,
        setInputCoin,
        outputCoin,
        setOutputCoin,
        exchangeRate,
        fetchExchangeRates,
        handleChangeValues,
        handleSwap
    };
}

export default Model;