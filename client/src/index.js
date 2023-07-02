import React from 'react';
import { RouterProvider } from "react-router-dom";
import SideBar from './sidebar/sideBar';
import router from './routes';
import { sidebarRoot, modelRoot, mainRoot } from './roots';

import './index.css';

const ServerLink = process.env.REACT_APP_DOMAIN || 'http://localhost:5000/';
const pathName = window.location.pathname;

sidebarRoot.render(<SideBar active={pathName} />);
mainRoot.render(<RouterProvider router={router} />);
modelRoot.render(null);

export default ServerLink;