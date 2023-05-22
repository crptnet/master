import React, { useState, useEffect } from 'react';
import './errorMessage.css';

const ErrorMessage = ({ message }) => {
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowError(false);
    }, 5000);

    return () => {
        clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={`error-message ${showError ? 'show' : ''}`}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
