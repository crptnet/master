import React, { useEffect, useState } from 'react';
import './subscriptionPage.css';
import { serverLink } from '../..';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, Cross2Icon, FontSizeIcon } from '@radix-ui/react-icons';
import * as Toast from '@radix-ui/react-toast';

const ToastComponent = ({ type, message,  toastOpen, setOpen }) => {
  return <Toast.Provider swipeDirection="right" asChild>
  <Toast.Root className="ToastRoot" open={toastOpen} onOpenChange={setOpen}>
  {
    type == 'error' ?
      <div className="toast error">
        <div className="toast-icon error">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2a10 10 0 0 0-9.95 9H2v2h.05A10 10 0 0 0 12 22a10 10 0 0 0 9.95-9h.05v-2h-.05A10 10 0 0 0 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        </div>
        <div className="toast-content">
          <p>Error</p>
          <Toast.Title className="ToastTitle" as="p">{message}</Toast.Title>
        </div>
      </div>

    :
    (
      <div className="toast success">
        <div className="toast-icon success">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green">
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        </div>
        <div className="toast-content">
          <p>Success</p>
          <Toast.Title className="ToastTitle" as="p">{message}</Toast.Title>
          {/* <p class="toast-message">Success! Your action was completed.</p> */}
        </div>
      </div>
  )
  }
  </Toast.Root>
  <Toast.Viewport className="ToastViewport" />
  </Toast.Provider>
}

const DialogReSubscriptionView = ({ handleDialogShow, handleDialogChange, type, onClick }) => {
  return(<Dialog.Root open={handleDialogShow} onOpenChange={handleDialogChange} asChild>
    <Dialog.Portal>
      <Dialog.Overlay className='DialogOverlay' />
      <Dialog.Content className='DialogContent'>
      <div className="dialog-container">
        {
          type == 'resubsctiption' ?
          <div className="dialog-box">
            <h2>Resubscribe to a Different Subscription Plan</h2>
            <p>Are you sure you want to resubscribe to a different subscription plan?</p>
            <p>This action will update your current subscription and may affect your access to certain features or services. Please review the details of the new plan before proceeding.</p>
          </div>
          :
          type == 'cancel' ?
          <div className="dialog-box">
            <h2>Cancel Subscription</h2>
            <p>Are you sure you want to cancel your current subscription plan?</p>
            <p>This action will cancel your current subscription and your access to certain features or services will be prohibited. Please consider this before proceeding.</p>
          </div>
          :
          type == 'resubsctiption-cancel' ? 
          <div className="dialog-box">
            <h2>Resubscribe to a Subscription Plan</h2>
            <p>Are you sure you want to resubscribe to a subscription plan?</p>
            <p>This action will update your current subscription and may affect your access to certain features or services. Please review the details of the new plan before proceeding.</p>
          </div>
          :
          type == 'resubsctiption-expired' ? 
          <div className="dialog-box">
            <h2>Welcome Back</h2>
            <p>Are you sure you want to subscribe to this subscription plan?</p>
          </div>
          :
          null
        }
      </div>
      <footer className='submit-buttons'>
        <Dialog.Close asChild>
              <button className="submit">No</button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <div>
                <button className="submit" type="submit" onClick={(event) => {
                  event.preventDefault(); 
                  onClick()
                }}>Yes</button>
              </div>
            </Dialog.Close>
      </footer>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>)

}

const SubscriptionDisplay = () => {
  const [plan, setPlan] = useState('trial')
  const [status, setStatus] = useState(null)
  const [expDate, setExpDate] = useState(null)
  const [option, setOption] = useState(1)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogType, setDialogType] = useState('resubsctiption')
  const [toastType, setToastType] = useState(null)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
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
  }, [showDialog])

  const handleConfirmationSubmit = async () => {
    const response = axios(`${serverLink}api/subscription-delete`, {
      method : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((response) => {
      setShowDialog(false)
      setToastOpen(true)
      setToastType('success')
      setToastMessage('Successfully canceled subscription')
      return response
    }).catch((response) => {
      setToastOpen(true)
      setToastType('error')
      setToastMessage(response.message)
    })

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
    if(response.status !== 200){ 
      console.log(response.status)
      setToastType('error')
      setToastOpen(true)
      setShowDialog(false)
      setToastMessage(session.message) 
      return null
    }
    return session
  }

  const handleCancel = (event) => {
    event.preventDefault();
    setDialogType('cancel')    
    setShowDialog(true)
  }


  const handleResubscribeSubmit = async () => {
    const session = await createCheckOut()
    if(!session){
      return
    }
    setShowDialog(false) 
    setToastOpen(true)
    setToastType('success')
    setToastMessage('Successfully created Checkout')
    window.location.href = session.uri
  }

  const handleSubmit = async (event, subscription) => {
    event.preventDefault();
    setOption(subscription)
    setDialogType('resubsctiption')
    if(status === 'cancelled'){
      setDialogType('resubsctiption-cancel')
    }
    if(status == 'expired'){
      setDialogType('resubsctiption-expired')
    }
    if(plan !== 'trial'){
      setShowDialog(true)
      return
    }

    const uri = await createCheckOut(option)
    if(!uri){
      return
    }
    window.location.href = uri;
  };

  const handleDialogChange = (value) => {
    setShowDialog(value)
  }

  const handleToastStateChange = (value) => setToastOpen(value)
  return (
      <div className='container subscriptions'>
        {
          showDialog && <DialogReSubscriptionView handleDialogShow={setShowDialog} handleDialogChange={handleDialogChange} type={dialogType} onClick={dialogType == 'resubsctiption' ? handleResubscribeSubmit : dialogType == 'resubsctiption' ? handleConfirmationSubmit : dialogType == 'cancel' ? handleConfirmationSubmit : handleResubscribeSubmit}/>
        }
        {toastOpen && (
          <ToastComponent
            type={toastType}
            toastOpen={toastOpen}
            message={toastMessage}
            setOpen={handleToastStateChange}
          />
        )}
        <div className='subscription-plan-title'>
          <h1>Subscription plan</h1> 
          <p>Choose Your Level: Basic vs. Premium Subscription Plan</p>
        </div>
        <div className='subscription-main'>
          <div className={`subscription basic-subscription${plan == 'basic' && status !== 'cancelled' ? ' button-inactive' : ''}`}>
            <h2><img id="basic-ico"src={`${serverLink}upload/cat.svg`}/>Basic</h2>
            <p>Basic subscription</p>
            <ul className='subscriptionFeatures'>
              <li><img src={`${serverLink}upload/check.svg`}/>Feature 1</li>
              <li><img src={`${serverLink}upload/check.svg`}/>Feature 2</li>
              <li><img src={`${serverLink}upload/check.svg`}/>Feature 3</li>
              <li><img src={`${serverLink}upload/check.svg`}/>Feature 4</li>
            </ul>
            <form onSubmit={(event) => handleSubmit(event, 1)}>
              <button type={plan !== 'basic' || status !== 'cancelled' ? "submit" : 'button'}>
                <span>Buy Basic</span>
              </button>
            </form>
          </div>
          <div className={`subscription premium-subscription${plan == 'premium' && status !== 'cancelled' ? ' button-inactive' : ''}`}>
            <h2><img src={`${serverLink}upload/dog.svg`}/>Premium</h2>
            <p>Premium subscription</p>
            <ul className='subscriptionFeatures'>
              <li><img src={`${serverLink}upload/check.svg`}/>Feature 1</li>
              <li><img src={`${serverLink}upload/check.svg`}/>Feature 2</li>
              <li><img src={`${serverLink}upload/check.svg`}/>Feature 3</li>
              <li><img src={`${serverLink}upload/check.svg`}/>Feature 4</li>
            </ul>
            <form onSubmit={(event) => handleSubmit(event, 3)}>
              <button type={(plan !== 'premium' || status == 'cancelled') ? "submit" : 'button'}>Buy Premium</button>
            </form>
          </div>
        </div>
        {(plan !== 'trial' && status !== 'cancelled') && 
          <div className='cancel-container'>
                <div className='cancel-option'>
                  <div className='cancel-option-left'>
                  Cancel subscription?
                </div>
                <div className='cancel-option-right'>
                  <button onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
          </div>}
      </div>
  );
};

const SubscriptionPage = () => {        
  return (
    <SubscriptionDisplay />
  );
};

export default SubscriptionPage;
