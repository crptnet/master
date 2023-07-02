import React from 'react';
import { sidebtns } from './content';

import '../../../styles/sidebar.css';

const Btn = (props) => {
  const { id, img, title } = props.btn;
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

export default SideButtons;