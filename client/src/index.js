import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import ReactDOM from 'react-dom/client';
import './index.css';
import './settings/settings.css';
import SideBar from './sidebar/sideBar';
import Main from './main/main';
import ActiveAccountPage from './settings/active';
import ResetEmailPage from './settings/resetEmail';
import ResetPasswordPage from './settings/resetPassword';
import NotRegistered from './settings/notRegistered';
import MainUserData from './settings/mainUserData';
import SideUserData from './settings/sideUserData';
import Convert from './convert/convert';
import BTCPrice from './positions/binanceCoins';
import StarredList from './watchlist/starredList';
import Terminal from './terminal/terminal';
import Charts from './charts/charts';
import SubscriptionPage from './subscription/subscription';

import GetListOfCoins from './listOfCoinsAPI';

const scrollRoot = ReactDOM.createRoot(document.getElementById('scroll'));
const sidebarRoot = ReactDOM.createRoot(document.getElementById('sidebar'));
const modelRoot = ReactDOM.createRoot(document.getElementById('model'));
const mainRoot = ReactDOM.createRoot(document.getElementById('main'));

const pathName = window.location.pathname;
  console.log(pathName);
  console.log(process.env.REACT_APP_LOCAL_DOMAIN)
  if (pathName.includes('/activate')) {
    mainRoot.render(<ActiveAccountPage location={window.location} />);
  } else if (pathName.includes('/reset-email')) {
    mainRoot.render(<ResetEmailPage location={window.location} />);
  } else if (pathName.includes('/password-reset')) {
    mainRoot.render(<ResetPasswordPage location={window.location} />);
  } else if (pathName.includes('/subscription')) {
    mainRoot.render(<SubscriptionPage />);
  } else if (pathName.includes('/terminal')) {
    mainRoot.render(<Terminal />);
    sidebarRoot.render(<SideBar active={1} />);
  } else if (pathName.includes('/charts')) {
    mainRoot.render(<Charts initialData={GetListOfCoins()}/>);
    sidebarRoot.render(<SideBar active={2} />);
  } else if (pathName.includes('/list')) {
    mainRoot.render(<BTCPrice />);
    sidebarRoot.render(<SideBar active={3} />);
  } else if (pathName.includes('/starred')) {
    mainRoot.render(<StarredList />);
    sidebarRoot.render(<SideBar active={3} />);
  } else if (pathName.includes('/convert')) {
    mainRoot.render(<Convert />);
    sidebarRoot.render(<SideBar active={8} />);
  } else if (pathName.includes('/settings')) {
    sidebarRoot.render(<SideBar active={11} />);
    if (!localStorage.getItem('token')) {
      mainRoot.render(<NotRegistered />);
    } else {
      mainRoot.render(<><MainUserData /><SideUserData /></>);
    }
  } else {
    scrollRoot.render(<Main />);
  }


const serverLink = "http://3.8.190.201.nip.io/";
export {serverLink};

export {sidebarRoot,mainRoot,modelRoot};