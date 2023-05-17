import React, { useState } from 'react';
import './subscriptionPage.css';

const SubscriptionDisplay = () => {
  const [subscriptionType, setSubscriptionType] = useState('monthly');
  
  const handleSubscriptionChange = (type) => {
    setSubscriptionType(type);
  };
  const serverDomain = 'http://localhost:5000/api';
  console.log(serverDomain)
  return(<div className="centeredDiv">
    <div className='subscriptionContainer'>
        <div className="subscriptionInfo">
            <h2>Basic</h2>
            <p>basic subscription</p>
            <form action={`${serverDomain}/create-checkout-session?productId=${}`} method="POST">
              <button type="submit">Buy Basic</button>
            </form>
        </div>
        <div className="subscriptionInfo">
            <h2>Premium</h2>
            <p>subscription</p>
            <form action={`${serverDomain}/create-checkout-session?productId=`} method="POST">
              <button type="submit">Buy Premium</button>
              
            </form>
        </div>
    </div>
  <div className="optionsContainer">
    <button
      className={subscriptionType === 'monthly' ? 'active' : ''}
      onClick={() => handleSubscriptionChange('monthly')}
    >
      Monthly
    </button>
    <button
      className={subscriptionType === 'annual' ? 'active' : ''}
      onClick={() => handleSubscriptionChange('annual')}
    >
      Annual
    </button>
  </div>
</div>)
}

const SubscriptionPage = () => {        
    return (
      <SubscriptionDisplay/>
    );
  };

export default SubscriptionPage;
