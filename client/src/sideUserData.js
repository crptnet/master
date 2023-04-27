import React, { useState, useEffect} from 'react';
import './settings.css';
import SideUserBtns from './sideUserBtns';

const SideDiv = (props) => {
  const {id, img, title, status, btn} = props;
  return(
    <div className={`sideDiv ${id}`}>
        <div className="sideLeft">
            <img src={`${img}`} className='sideImg'/>
            <p className='sideTitle'>{title}</p>
        </div>
        <div className="sideRight">
            <p className='sideStatus'>{status}</p>
            <button className='sideBtnData'>{btn}</button>
        </div>
    </div>
  );
}
const SideButtons = () => {
  return SideUserBtns.map((element) => {
    return <SideDiv key={element.id} img={element.img} title={element.title} status={element.status} btn={element.btn}></SideDiv>;
  });
};

function SideUserData () {
  return (
    <>
      <div className='sideDataContainer'>
          <SideButtons />
      </div>
    </>
  );
}

export default SideUserData;