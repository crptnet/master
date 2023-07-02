import React, { useEffect, useState } from 'react';
import './subscriptionView.css';
import axios from 'axios';
import ServerLink from '../../..';

const _SubscriptionView = () => {
    const [plan, setPlan] = useState(null)
    const [status, setStatus] = useState(null)
    const [expDate, setExpDate] = useState(null)
    

    useEffect(() => {
        const FetchSubData = async () => {
            const response = await axios(`${ServerLink}api/user-subscription`, {
                method : 'GET', 
                headers : {
                  Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            setStatus('ended')
            if(!response.data.period_ended){
                setStatus(response.data.status)
            }
            setPlan(response.data.plan)
            setExpDate(response.data.current_period_end)
        }
        FetchSubData()
    }, [])

    const UnixTimeConverter = (unixTime) => {
      const formattedTime = (new Date(unixTime)).toLocaleString();
      console.log(formattedTime)
    
      return <div>{formattedTime}</div>;
    };

    function getRelativeTime(unixTime) {
      const currentDate = new Date()
      const targetDate = new Date(unixTime)
      // Calculate the time difference in milliseconds
      const timeDiff = targetDate.getTime() - currentDate.getTime();
    
      // Convert the time difference to days and hours
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
      // Return the relative time string
      if (days === 1) {
        return `1 day`;
      } else if (days > 1) {
        return `${days} days`;
      } else {
        return `${hours} hours`;
      }
    }

    const subscribeStatus = () => {
        if(plan === 'trial' || status === 'cancelled'){
          const sadEmojis = [
            '😔', '😢', '😭', '😞', '😩', '😫', '😥', '😓', '😿', '😖', '😣', '😟', '🥺', '😰', '😔', '😪', '😞', '😢', '😭'
          ];
          if(status === 'cancelled'){
            return <div>Expires in {getRelativeTime(expDate * 1000)} {sadEmojis[Math.floor(Math.random() * sadEmojis.length)]}<b/><p>Cancelled</p></div>
          }
          if(status == 'ended'){
              return <div>Expired</div>
          }
          
          return <div>Expires in {getRelativeTime(expDate * 1000)} {sadEmojis[Math.floor(Math.random() * sadEmojis.length)]}</div>
        }

        if(plan === 'basic' || plan === 'premium'){
          return <div>Next payment {(new Date(expDate * 1000)).toLocaleDateString()}</div>
        }

        return UnixTimeConverter(expDate)

    }

    const handleButtonClick = () => {
      window.location.href = '/settings/subscription';
    };

    return (
      <div className="subscriptionContainer">
            <div className="sideDiv">
              <div className='side-left-subscription'>
                <div className='left-subscription-content'>
                  <p className='sideTitle'>Subscription</p>
                </div>
                <div className='left-subscription-content'>
                  <p>{ plan ? plan.charAt(0).toUpperCase() + plan.slice(1) : 'Loading..' }</p>
                </div>
              </div>
              <div className='side-right-subscription'>
                <div className='update-subscription'>
                  <button className='update-subscription-button' onClick={handleButtonClick}>
                    <span>
                      Update
                    </span>
                  </button>
                </div>
                <div className='subscription-status'>
                  {subscribeStatus()}
                </div>
              </div>
            </div>
        </div>
    );
};

const SubscriptionView = () => {        
  return (
    <_SubscriptionView />
  );
};

export default SubscriptionView;
