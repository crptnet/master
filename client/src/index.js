import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './settings.css';
import SideBar from './sideBar';
import ActiveAccountPage from './active';
import ResetEmailPage from './resetPassword';
import NotRegistered from './notRegistered';
import MainUserData from './mainUserData';
import SideUserData from './sideUserData';

const sidebarRoot = ReactDOM.createRoot(document.getElementById('sidebar'));
const usermainRoot = ReactDOM.createRoot(document.getElementById('user-main'));
const usersideRoot = ReactDOM.createRoot(document.getElementById('user-side'));
const modelRoot = ReactDOM.createRoot(document.getElementById('model'));
const mainRoot = ReactDOM.createRoot(document.getElementById('main'));

const pathName = window.location.pathname;
console.log(pathName);
  if (pathName.includes('/activate')) {
    mainRoot.render(<ActiveAccountPage location={window.location} />);
  } else if(pathName.includes('/reset-email')) {
    mainRoot.render(<ResetEmailPage location={window.location} />);
  }
  else {
    sidebarRoot.render(<SideBar active={11} />);
    if(!localStorage.getItem('token')) {
    mainRoot.render(<NotRegistered />);
    } else {
        mainRoot.render(<></>);
        usermainRoot.render(<MainUserData />);
        usersideRoot.render(<SideUserData />);
    }
  }


export {sidebarRoot,mainRoot,usermainRoot,usersideRoot,modelRoot};