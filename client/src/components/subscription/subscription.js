import React, { useEffect, useState } from 'react';
import './subscriptionPage.css';
import { serverLink } from '../..';
import ErrorMessage from '../errorMessage/errorMessage'
import ConfirmationComponent from '../confirmationWindow/ConfirmationComponent';
import axios from 'axios';
import ChangeSubsctiption from '../changeSubscriptionPopUp/changeSubsctiption';


const SubscriptionDisplay = () => {
  const [showErrorMessage, setshowErrorMessage] = useState(false)
  const [showChangeSubscriptionMessage, setShowChangeSubscriptionMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState('Unhandled error')
  const [isConfirmationOpen, SetConfirmationOpen] =useState(false)
  const [plan, setPlan] = useState(null)
  const [status, setStatus] = useState(null)
  const [expDate, setExpDate] = useState(null)
  const [option, setOption] = useState(1)
  const handleClick = (e) => {
    SetConfirmationOpen(true)
  }

  useEffect(() => {
    const FetchSubData = async () => {
        const response = await axios(`${serverLink}api/user-subscription`, {
            method : 'GET', 
            headers : {
              Authorization : `Bearer ${localStorage.getItem('token')}`
            }
          })
          setStatus(response.data.status)
          setPlan(response.data.plan)
          setExpDate(response.data.current_period_end)
    }
    FetchSubData()
  }, [])

  const handleConfirmationSubmit = (e) => {
    SetConfirmationOpen(false)
    const response = axios(`${serverLink}api/subscription-delete`, {
      method : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })

    console.log(response)
  }

  const createCheckOut = async () => {
    const response = await fetch(`${serverLink}api/create-checkout-session?option=${option}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const session = await response.json();

    if(response.status === 403){
      setshowErrorMessage(true)
      setErrorMessage(session.message)
      return null
    }

    return session.uri
  }

  const handleSubmit = async (event, subOption) => {
    setOption(subOption)
    setshowErrorMessage(false)
    event.preventDefault();
    if(plan !== 'trial'){
      setShowChangeSubscriptionMessage(true)
      return
    }

    const uri = await createCheckOut(option)
    console.log(uri)
    if(!uri){
      return
    }
    window.location.href = uri;
  };
  const handleSubscriptionChangeConfirmation = async (option) => {
    const uri = await createCheckOut(option)
    if(!uri){
      return
    }
    console.log(uri)
    setShowChangeSubscriptionMessage(false)
    window.location.href = uri;

  }
  return (
    <div className="centeredDiv">
      {
        showChangeSubscriptionMessage && <ChangeSubsctiption onConfirm={handleSubscriptionChangeConfirmation} onCancel={() => {setShowChangeSubscriptionMessage(false)}}/>
      }
      {
        showErrorMessage && <ErrorMessage message={errorMessage}/> 
      } 
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
          <form onSubmit={(event) => handleSubmit(event, 1)}>
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
          <form onSubmit={(event) => handleSubmit(event, 3)}>
            <button type="submit">Buy Premium</button>
            {
              showErrorMessage && <ErrorMessage message={errorMessage}/> 
            } 
          </form>
        </div>
      </div>
      {(plan !== 'trial' && status !== 'cancelled') && <div className='cancel-container'>
            <div className='cancel-option'>
              <div className='cancel-option-left'>
              Cancel subscription?
            </div>
            <div className='cancel-option-right'>
              <button onClick={handleClick}>
                Cancel
              </button>
            </div>
              {
                isConfirmationOpen && <ConfirmationComponent onConfirm={handleConfirmationSubmit} onCancel={() => {SetConfirmationOpen(false)}}/>
              }
          </div>

      </div>}



      {/* <div className="optionsContainer">
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
      </div> */}
    </div>
  );
};

const SubscriptionPage = () => {        
  return (
    <SubscriptionDisplay />
  );
};

export default SubscriptionPage;
