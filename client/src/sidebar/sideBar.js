import React from 'react';
import './sidebar.css';
import {sidebtns} from './sidebtns';
import { serverLink } from '..';

const Btn = (props) => {
  const {id, img, title} = props.btn;
  return(
    <a href={`../${title.toLowerCase()}`} className={`sideBtn ${props.active == true ? 'activeSideBtn' : ''}`}>
      <h1>{title}</h1> 
      <img src={img} />
    </a>
  );
}
const SideButtons = ({ active }) => {
  return sidebtns.map((btn) => {
    return <Btn key={btn.id} btn={btn} active={'/'+btn.title.toLowerCase() == active}></Btn>;
  });
};

function SideBar ({ active }) {
  return (
    <>
      <div className='fullSideBar'>
        <div className='logo'>
          <img src={`${serverLink}upload/logo.png`} />
        </div>
        <div className='sideBarWithoutLogo'>
          <SideButtons active={active} />
        </div>
      </div>
    </>
  );
}

export default SideBar;