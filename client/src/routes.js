import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import ActiveAccountPage from './settings/active';
import ResetEmailPage from './settings/resetEmail';
import ResetPasswordPage from './settings/resetPassword';
import NotRegistered from './settings/notRegistered';
import MainUserData from './settings/mainUserData';
import SideUserData from './settings/sideUserData';
import Convert from './convert/controller';
import Faq from './faq/controller';
import Positions from './positions/positions';
import StarredList from './watchlist/starredList';
import Terminal from './terminal/terminal';
import Charts from './charts/charts';
import Wallet from './wallet/controller';
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
    element:<Positions />,
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