import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './terminal.css';
import Bookmarks from './components/bookmarks';
import Title from './components/title';
import Chart from './components/chart';
import Markets from './components/markets';
import Bots from './components/bots';
import Orders from './components/orders';
import Trades from './components/trades';
import Trading from './components/trading';



const Terminal = () => {
  return (
    <>
        <div className='terminal-main'>
            <Bookmarks />
            <Title />
            <div style={{display:'flex', width:'calc(100vw - 57.5px)'}}>
                <Chart />
                <Markets />
            </div>
            <div style={{display:'flex', width:'calc(100vw - 57.5px)'}}>
                <Bots />
                <Orders />
                <Trades />
                <Trading />
            </div>
        </div>
    </>
  );
}
export default Terminal;