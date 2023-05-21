import React, { useState } from 'react';
import './subscriptionPage.css';
import { serverLink } from '../..';

const SubscriptionDisplay = () => {
  const [subscriptionType, setSubscriptionType] = useState('Monthly');

  const handleSubscriptionChange = (type) => {
    setSubscriptionType(type);
  };

  const handleSubmit = async (event, option) => {
    event.preventDefault();
    const response = await fetch(`${serverLink}api/create-checkout-session?option=${option}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const session = await response.json();
    console.log(session);
    window.location.href = session.uri;
  };

  return (
    <div className="centeredDiv">
      <div className='subscriptionContainer'>
        <div className="subscriptionInfo">
          <h2>Basic</h2>
          <p>Basic subscription</p>
          <ul className='subscriptionFeatures'>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
            <li>Feature 4</li>
          </ul>
          <form onSubmit={(event) => handleSubmit(event, subscriptionType === 'Monthly' ? 1 : 2)}>
            <button type="submit">
              <span className="button-text">Buy Basic</span>
            </button>
          </form>
        </div>
        <div className="subscriptionInfo">
          <h2>Premium</h2>
          <p>Premium subscription</p>
          <ul className='subscriptionFeatures'>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
            <li>Feature 4</li>
          </ul>
          <form onSubmit={(event) => handleSubmit(event, subscriptionType === 'Monthly' ? 3 : 4)}>
            <button type="submit">Buy Premium</button>
          </form>
        </div>
      </div>
      <div className="optionsContainer">
        <button
          className={subscriptionType === 'Monthly' ? 'active' : ''}
          onClick={() => handleSubscriptionChange('Monthly')}
        >
          Monthly
        </button>
        <button
          className={subscriptionType === 'Annual' ? 'active' : ''}
          onClick={() => handleSubscriptionChange('Annual')}
        >
          Annual
        </button>
      </div>
    </div>
  );
};

const SubscriptionPage = () => {        
  return (
    <SubscriptionDisplay />
  );
};

export default SubscriptionPage;
