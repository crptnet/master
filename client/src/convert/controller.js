// Controller.js
import React, { useEffect } from 'react';

import Model from './model';
import View from './view';

import '../styles/convert.css';

const Convert = () => {
    const model = Model();
    const {
        inputCoin,
        outputCoin,
        fetchExchangeRates,
        handleChangeValues
    } = model;

    useEffect(() => {
        fetchExchangeRates();
    }, [inputCoin, outputCoin]);

    useEffect(() => {
        handleChangeValues({ target: { value: output.value } });
    }, [inputCoin]);

    useEffect(() => {
        handleChangeValues({ target: { value: input.value } });
    }, [outputCoin]);

    return <View />;
};

export default Convert;
