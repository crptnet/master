import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import ReactDOM from 'react-dom/client';
import './index.css';
import './global.css'
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
import BinanceBTC from './positions/binanceCoins';
import StarredList from './watchlist/starredList';
import Terminal from './terminal/terminal';
import Charts from './charts/charts';
import SubscriptionPage from './components/subscription/subscription';
import NotFoundPage from './components/notFound/notFound';
import SubscriptionView from './components/userProfile/subscriptionComponent/subscriptionView';

import GetListOfCoins from './listOfCoinsAPI';
import APiManager from './components/APIManager/APIManager';

//const serverLink = "http://3.8.190.201.nip.io/";

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
  } else if (pathName.includes('/settings/api-keys')) {
    mainRoot.render(<APiManager/>);
    sidebarRoot.render(<SideBar active={11} />);
  } else if (pathName.includes('/settings/subscription')) {
    mainRoot.render(<SubscriptionPage />);
    sidebarRoot.render(<SideBar active={11} />);
  } else if (pathName.includes('/terminal')) {
    mainRoot.render(<Terminal />);
    sidebarRoot.render(<SideBar active={1} />);
  } else if (pathName.includes('/charts')) {
    mainRoot.render(<Charts />);
    sidebarRoot.render(<SideBar active={2} />);
  } else if (pathName.includes('/list')) {
    mainRoot.render(<BinanceBTC />);
    sidebarRoot.render(<SideBar active={3} />);
  } else if (pathName.includes('/starred')) {
    mainRoot.render(<StarredList />);
    sidebarRoot.render(<SideBar active={4} />);
  } else if (pathName.includes('/convert')) {
    mainRoot.render(<Convert />);
    sidebarRoot.render(<SideBar active={8} />);
  } else if (pathName.includes('/settings')) {
    sidebarRoot.render(<SideBar active={11} />);
    if (!localStorage.getItem('token')) {
      mainRoot.render(<NotRegistered />);
    } else {
      mainRoot.render(<><MainUserData /><SideUserData /> <SubscriptionView/></>);
    }
  } else {
    modelRoot.render(<NotFoundPage />);
  }

const serverLink = "http://localhost:5000/";
export {serverLink};

export {sidebarRoot,mainRoot,modelRoot};