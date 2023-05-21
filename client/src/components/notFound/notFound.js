import React from 'react';
import './notFound.css';
import { serverLink } from '../..';

const NotFoundPage = () => {
  return (
    <div className="notFoundContainer">
      <img src={`${serverLink}upload/logo.png`} style={{height: "10vw"}} alt="Logo" className="logo" />
      <h1 className="notFoundText">404 | Not Found</h1>
    </div>
  );
};

export default NotFoundPage;
