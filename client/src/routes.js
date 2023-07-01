import React from 'react';
import './index.css';
import './settings/settings.css';
import { createBrowserRouter } from "react-router-dom";

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
import APiManager from './components/APIManager/KeyPairCreation/APIManager';

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

export default router;