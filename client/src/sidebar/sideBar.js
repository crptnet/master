import React from 'react';
import './positions.css';
import {sidebtns} from './sidebtns';

const Btn = (props) => {
  const {id, img, title} = props.btn;
  return(
    <a href={`../${title.toLowerCase()}`} className={`sideBtn ${props.active == true ? 'activeSideBtn' : ''}`}>
      <img src={img} />
      <h1 style={{textDecoration:'none'}}>
        {title}
      </h1>      
    </a>
  );
}
const SideButtons = ({ active }) => {
  return sidebtns.map((btn) => {
    return <Btn key={btn.id} btn={btn} active={btn.id == active}></Btn>;
  });
};

function SideBar ({ active }) {
  return (
    <>
      <div className='fullSideBar'>
        <div className='logo'>
          <img src='./icons/logo.png' />
        </div>
        <div className='sideBarWithoutLogo'>
          <SideButtons active={active} />
        </div>
      </div>
    </>
  );
}

export default SideBar;