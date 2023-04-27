import React, { useState, useEffect} from 'react';
import './settings.css';

function MainUserData (props) {
    const { deleteUser } = props;
  return (
    <>
      <div className='mainDataContainer'>
        <div className='avatar'>
            <img src='./icons/avatar.png' />
        </div>
        <div className='userName'>
            <p className='userNameOuter'>Username</p>
            <p className='userNameInner'>Lordofaliens</p>
        </div>
        <div className='email'>
            <p className='emailOuter'>Email</p>
            <p className='emailInner'>vladam290705@gmail.com</p>
        </div>
        <div className='accLevel'>
            <p className='accLevelOuter'>Account level</p>
            <p className='accLevelInner'>Basic</p>
        </div>
        <button className='deleteUserBtn' onClick={deleteUser}>Delete user</button>
      </div>
    </>
  );
}

export default MainUserData;