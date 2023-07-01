import React from 'react';
import './index.css';
import { RouterProvider } from "react-router-dom";
import SideBar from './sidebar/sideBar';
import router from './routes';
import { sidebarRoot, modelRoot, model2Root, mainRoot } from './roots';

const serverLink = process.env.REACT_APP_DOMAIN || 'http://localhost:5000/';
const pathName = window.location.pathname;

sidebarRoot.render(<SideBar active={pathName} />);
mainRoot.render(<RouterProvider router={router} />);
modelRoot.render(null);

export { serverLink };
export { sidebarRoot, mainRoot, modelRoot, model2Root }; // change in other files