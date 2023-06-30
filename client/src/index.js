/*TO DO LIST*/
/*                                                            STATUS
1.Overlay for convert                                         DONE
2.Icons for coins                                             DONE
3.Fix terminal bookmarks (page update)                        DONE
4.Websocket price update                                      DONE
5.Settings googleRegistered bug fix                           DONE                       
6.Fix charts refreshments when data is updated (charts page)  UNREAL WITHOUT LIBRARY
7.Output terminal data using Binance Websocket                POSTPONED TILL OWN API
8.Wallet                                                      DONE
*/

import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import ReactDOM from 'react-dom/client';
import './index.css';
import './settings/settings.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SideBar from './sidebar/sideBar';
import Main from './main/main';
import ActiveAccountPage from './settings/active';
import ResetEmailPage from './settings/resetEmail';
import ResetPasswordPage from './settings/resetPassword';
import NotRegistered from './settings/notRegistered';
import MainUserData from './settings/mainUserData';
import SideUserData from './settings/sideUserData';
import Convert from './convert/convert';
import Faq from './faq/faq';
import BinanceBTC from './positions/binanceCoins';
import StarredList from './watchlist/starredList';
import Terminal from './terminal/terminal';
import Charts from './charts/charts';
import Wallet from './wallet/wallet';
import SubscriptionPage from './components/subscription/subscription';
import NotFoundPage from './components/notFound/notFound';
import SubscriptionView from './components/userProfile/subscriptionComponent/subscriptionView';

import GetListOfCoins from './listOfCoinsAPI';
import APiManager from './components/APIManager/KeyPairCreation/APIManager';
import KeysTable from './components/APIManager/KeysTable/KeysTable';

const serverLink = process.env.REACT_APP_DOMAIN || 'http://localhost:5000/';
const pathName = window.location.pathname;

const sidebarRoot = ReactDOM.createRoot(document.getElementById('sidebar'));
const modelRoot = ReactDOM.createRoot(document.getElementById('model'));
const mainRoot = ReactDOM.createRoot(document.getElementById('main'));

const SettingsRoute = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return (
      <>
        <MainUserData />
        <SideUserData />
        <SubscriptionView />
      </>
    );
  } else {
    return <NotRegistered />;
  }
};

const router = createBrowserRouter([
  {
    element:<ActiveAccountPage />,
    path:"/activate"
  },
  {
    element:<ResetEmailPage />,
    path:"/reset-email"
  },
  {
    element:<ResetPasswordPage />,
    path:"/password-reset"
  },
  {
    element:<APiManager />,
    path:"/settings/api-keys"
  },
  {
    element:<SubscriptionPage />,
    path:"/settings/subscription"
  },
  {
    element:<Terminal />,
    path:"/terminal"
  },
  {
    element:<Charts />,
    path:"/charts"
  },
  {
    element:<BinanceBTC />,
    path:"/list"
  },
  {
    element:<StarredList />,
    path:"/starred"
  },
  {
    element:<Wallet />,
    path:"/wallet"
  },
  {
    element:<Convert />,
    path:"/convert"
  },
  {
    element:<Faq />,
    path:"/faq"
  },
  { 
    element:<SettingsRoute />,
    path: "/settings"
  },
  {
    element:<NotFoundPage />,
    path:"*"
  }
]);

sidebarRoot.render(<SideBar active={pathName} />);
mainRoot.render(<RouterProvider router={router} />);
modelRoot.render(null);

export { serverLink };
export { sidebarRoot, mainRoot, modelRoot };