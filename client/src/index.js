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