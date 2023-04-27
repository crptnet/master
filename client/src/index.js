import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './settings.css';
import SideBar from './sideBar';
import MainUserData from './mainUserData';
import SideUserData from './sideUserData';
import NotRegistered from './notRegistered';

let registered = false;
ReactDOM.createRoot(document.getElementById('sidebar')).render(<SideBar active={11} />);
ReactDOM.createRoot(document.getElementById('main')).render(<NotRegistered submitUser={submitUser}/>);

function submitUser () {
    document.getElementById('main').innerHTML = '';
    ReactDOM.createRoot(document.getElementById('user-main')).render(<MainUserData deleteUser={deleteUser}/>);
    ReactDOM.createRoot(document.getElementById('user-side')).render(<SideUserData />);
}

function deleteUser () {
    ReactDOM.createRoot(document.getElementById('main')).render(<NotRegistered submitUser={submitUser}/>);
    document.getElementById('user-main').innerHTML = '';
    document.getElementById('user-side').innerHTML = '';
}
