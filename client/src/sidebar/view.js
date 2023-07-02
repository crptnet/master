import React from 'react';
import SideButtons from './components/sideButton/view';
import ServerLink from '..';

import '../styles/sidebar.css';

function SideBar ({ active }) {
  return (
    <>
      <div className='fullSideBar'>
        <div className='logo'>
          <img src={`${ServerLink}upload/logo.png`} />
        </div>
        <div className='sideBarWithoutLogo'>
          <SideButtons active={active} />
        </div>
      </div>
    </>
  );
}

export default SideBar;