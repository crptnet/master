import React, { useState } from 'react';
import './subscriptionPage.css';

const SubscriptionDisplay = () => {
  const [subscriptionType, setSubscriptionType] = useState('Monthly');

  const handleSubscriptionChange = (type) => {
    setSubscriptionType(type);
  };

  const handleSubmit = async (event, option) => {
    event.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_LOCAL_DOMAIN}/api/create-checkout-session?option=${option}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const session = await response.json();
    
    console.log(session)

    window.location.href = session.uri;
    

  };

  return (
    <div className="centeredDiv">
      <div className='subscriptionContainer'>
        <div className="subscriptionInfo">
          <h2>Basic</h2>
          <p>basic subscription</p>
          <form onSubmit={(event) => handleSubmit(event, subscriptionType === 'Monthly' ? 1 : 2)}>
            <button type="submit">Buy Basic</button>
          </form>
        </div>
        <div className="subscriptionInfo">
          <h2>Premium</h2>
          <p>subscription</p>
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
