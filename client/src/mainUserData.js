import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { sidebarRoot, mainRoot, usermainRoot, usersideRoot, modelRoot } from './index';
import SideUserData from './sideUserData';
import NotRegistered from './notRegistered';
import './settings.css';

const getData = async () => {
  try {
    const headersList = {
      "Accept": "*/*",
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    };
    if(localStorage.getItem('token')) {
      const response = await fetch("http://localhost:5000/api/current", {
        method: 'GET',
        headers: headersList
      });
      const userData = await response.json();
      return userData;
    } else {
      return {email:'Unauthorized', password: 'Unauthorized'};
    }
  } catch (error) {
    console.error(error);
  }
}

function MainUserData () {
  const [email, setEmail] = useState('Not Registered');
  const [username, setUsername] = useState('Not Registered');
  const circlePosX = useRef();
  const circlePosY = useRef();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      if(data.email != undefined && data.username != undefined) {
        setEmail(data.email);
        setUsername(data.username);
        console.log('My data!!!');
        console.log(email);
        console.log(username);
      }
    };
    fetchData();
  }, [username, email]);
  


  function handleMouseMove(event) {
    const { clientX, clientY } = event;
    const screenWidth = 0.5 * window.innerWidth;
    console.log('screenWidth',screenWidth);
    const screenHeight = 0.5 * window.innerHeight;
    console.log('screenHeight',screenHeight);
    const pxToSubtractX = clientX;
    const pxToSubtractY = clientY;

    const centerX = parseInt(`${-1*(screenWidth + screenHeight - pxToSubtractX)}`);
    const centerY = parseInt(`${-2*(screenHeight + screenHeight - pxToSubtractY)}`);
    console.log('CenterX',centerX,'CenterY',centerY);
    circlePosX.current = `${centerX}px`;
    circlePosY.current = `${centerY}px`;;

  }
  // useEffect(() => {
  //   console.log("#^@!*&$^#&!$^#!@&*",circlePosX.current,circlePosY.current);
  // }, [circlePosX.current,circlePosY.current]);
  async function confirmDeletion() {
    try {
        const headersList = {
          "Accept": "*/*",
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        };
        if(localStorage.getItem('token')) {
          const response = await fetch("http://localhost:5000/api/delete", {
            method: 'DELETE',
            headers: headersList
          });
          const userData = await response.json();
          localStorage.removeItem('token');
        } 
      } catch (error) {
        console.error(error);
      }
      console.log("!!!!!!!!!",circlePosX.current,circlePosY.current);
    modelRoot.render(
      <>
        <div className="circcontainer">
          <div className="circle" style={{ marginLeft: circlePosX.current,  marginTop: circlePosY.current }}></div>
        </div>
      </>
    );
    setTimeout(() => {
      usermainRoot.render(<></>);
      usersideRoot.render(<></>);
      mainRoot.render(<NotRegistered/>);
    }, 800);
    setTimeout(() => {
      modelRoot.render(
        <>
          <div className="circcontainer">
            <div className='circle shrink hidden' style={{ marginLeft: circlePosX.current,  marginTop: circlePosY.current }}></div>
          </div>
        </>
      )
      setTimeout(() => {
        modelRoot.render(<></>)
      }, 800);
    }, 800);
  }

  const cancelDeletion = () => {
    modelRoot.render(<></>);
  }

  function renderDeleteConfirmation () {
    modelRoot.render(
      <>
        <div className="delete-container" style={{ display: open ? 'block' : 'none' }}>
          <div className="delete-content">
            <img src="./icons/logo.png" alt="crpt.net" />
            <p className='delete-title'>Confirm deletion. This process is permanent.</p>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
              <button onClick={confirmDeletion} onMouseMove={handleMouseMove} className='deleteConfirmBtn'>Delete</button>
            <button onClick={cancelDeletion} className='deleteCancelBtn'>Cancel</button>
            </div>
          </div>
        </div> 
      </>
    );
  }

  return (
    <>
      <div className='mainDataContainer'>
        <div className='avatar'>
            <img src='./icons/avatar.png' />
        </div>
        <div className='userName'>
            <p className='userNameOuter'>Username</p>
            <p className='userNameInner'>{username}</p>
        </div>
        <div className='email'>
            <p className='emailOuter'>Email</p>
            <p className='emailInner'>{email}</p>
        </div>
        <div className='accLevel'>
            <p className='accLevelOuter'>Account level</p>
            <p className='accLevelInner'>Basic</p>
        </div>
        <button className='deleteUserBtn' onClick={renderDeleteConfirmation}>Delete user</button>
      </div>
    </>
  );
}

export default MainUserData;
