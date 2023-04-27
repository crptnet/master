import React from 'react';
import ReactDOM from 'react-dom/client';
import './positions.css';
import BTCPrice from './binanceCoins';
import SideBar from '../sideBar';

ReactDOM.createRoot(document.getElementById('sidebar')).render(<SideBar active={3} />);
ReactDOM.createRoot(document.getElementById('main')).render(<BTCPrice />);