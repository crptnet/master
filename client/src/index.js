import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {sidebtns} from './sidebtns';
import BTCPrice from './binanceCoins';

const Btn = (props) => {
  const {id, img, title} = props.btn;
  return(
    <button className={`sideBtn ${id === 3 ? 'activeSideBtn' : ''}`}>
      <img src={img} />
      <h1>
        {title}
      </h1>      
    </button>
  );
}
const SideButtons = sidebtns.map((btn) => {
  return <Btn key={btn.id} btn={btn}></Btn>;
});

function SideBar () {
  return (
    <>
      <div className='fullSideBar'>
        <div className='logo'>
          <img src='./icons/logo.png' />
        </div>
        <div className='sideBarWithoutLogo'>
          {SideButtons}
        </div>
      </div>
    </>
  );
}
ReactDOM.createRoot(document.getElementById('SideBar')).render(<SideBar />);
//ReactDOM.createRoot(document.getElementById('main')).render(<CryptoPrices />);
ReactDOM.createRoot(document.getElementById('main')).render(<BTCPrice />);
//ReactDOM.createRoot(document.getElementById('main')).render(<CryptoPrices2 />);