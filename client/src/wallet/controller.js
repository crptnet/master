// Controller.js
import React, { useEffect } from 'react';
import Model from './model';
import View from './view';

import '../styles/wallet.css';

const Wallet = () => {
  const model = Model();
  const { createChart } = model;

  useEffect(() => {
    createChart();
  }, []);

  return <View />;
};

export default Wallet;
