import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './settings.css';
import SideBar from './sideBar';

import NotRegistered from './notRegistered';
import MainUserData from './mainUserData';
import SideUserData from './sideUserData';

const sidebarRoot = ReactDOM.createRoot(document.getElementById('sidebar'));
const usermainRoot = ReactDOM.createRoot(document.getElementById('user-main'));
const usersideRoot = ReactDOM.createRoot(document.getElementById('user-side'));
const modelRoot = ReactDOM.createRoot(document.getElementById('model'));

sidebarRoot.render(<SideBar active={11} />);
const mainRoot = ReactDOM.createRoot(document.getElementById('main'));
if(!localStorage.getItem('token')) {
    mainRoot.render(<NotRegistered />);
} else {
    mainRoot.render(<></>);
    usermainRoot.render(<MainUserData />);
    usersideRoot.render(<SideUserData />);
}

export {sidebarRoot,mainRoot,usermainRoot,usersideRoot,modelRoot};