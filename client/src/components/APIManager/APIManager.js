import React, { useEffect, useState } from 'react';
import './APiManager.css';
import { serverLink } from '../..';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, Cross2Icon, FontSizeIcon } from '@radix-ui/react-icons';
import * as Toast from '@radix-ui/react-toast';
import axios from 'axios'

const Selector = ({ onExchangeSelect }) => {
  const handleExchangeSelect = (value) => {
    onExchangeSelect(value);
  };

  return (
    <Select.Root onValueChange={handleExchangeSelect}>
    <Select.Trigger className="select-trigger" aria-label="Food">
      <Select.Value placeholder="Select exchange…"/>
      <Select.Icon>
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="select-content" position="popper">
        <Select.ScrollUpButton className="SelectScrollButton">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="SelectViewport">
          <Select.Item className="SelectItem" value="Binance">
            <Select.ItemText>Binance</Select.ItemText>
            <Select.ItemIndicator className="SelectItemIndicator">
              <CheckIcon />
            </Select.ItemIndicator>
          </Select.Item>

        </Select.Viewport>
        <Select.ScrollDownButton className="SelectScrollButton">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
  );
};

const DialogView = ({ selectedExchange, onSubmit, handleToast }) => {
  const [open, setOpen] = React.useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault()
    const publicKey = document.getElementById('input-public-key').value;
    const privateKey = document.getElementById('input-private-key').value;

    try {
      const res = await axios(`${serverLink}api/api-account`, {
        method : 'POST',
        headers : {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        },
        data : {
          publicKey : publicKey,
          privateKey : privateKey,
          market : selectedExchange
        }
      });

      setOpen(false)
      handleToast({ status : 'open', message : 'API key pair added successfully!', toastType : 'success'})
      // Handle the response or perform any necessary actions

      // Optionally, show a success toast message
      // showToast('API keys saved successfully', 'success');
    } catch (error) {
      console.error('Error saving API keys:', error);
      handleToast({ status : 'open', message : error.response.data.message, toastType : 'error'})
      // Handle the error case or show an error toast message
      // showToast('Failed to save API keys', 'error');
    }
  };


  return (<Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Trigger asChild>
      <button className="api-key-creation-button violet">Add API key</button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <header className="dialog-title">
          <Dialog.Title>API Keys</Dialog.Title>
        </header>
        <div className="dialog-description-container">
          <Dialog.Description className="dialog-description"> 
            If you are unfamiliar with the process, take a look at the <a target="_blank" href="/guide/binance">guide</a>
          </Dialog.Description>
        </div>
        <div className='exchange-selector-container'>
          <label id='selector-lable' for="Selector">Exchange</label>
          <Selector onExchangeSelect={onSubmit} />
        </div>

        <div className="field-set-container">
          <fieldset className='field-set'>
            <label className="Label" htmlFor="key">
              Public key
            </label>
            <input className="Input" id="input-public-key" placeholder="public key..." />
          </fieldset>
          <fieldset className='field-set'>
            <label className="Label" htmlFor="key">
              Private key
            </label>
            <input className="Input" id="input-private-key" placeholder="private key..." />
          </fieldset>
        </div>
        <footer className='submit-buttons'>
          <Dialog.Close asChild>
            <button className="submit red">Close</button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <div>
              <button className="submit green" type="submit" onClick={handleSubmit}>Save</button>
            </div>
          </Dialog.Close>
        </footer>
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>)
};

const APiManager = ({ onConfirm, onCancel }) => {
  const [selectedExchange, setSelectedExchange] = useState('');
  const [open, setOpen] = React.useState(false);
  const eventDateRef = React.useRef(new Date());
  const timerRef = React.useRef(0);
  const [message, setMessage] = useState(null)
  const [toastType, setToastType] = useState('error')

  const handleToast = (props) => {
      setOpen(props.status)
      setMessage(props.message)
      setToastType(props.toastType)
  }

  const handleToastMessage = (message) => {
    setMessage(message)
  }

  const handleExchangeSelect = (value) => {
    setSelectedExchange(value);
  };
  return (
    <Toast.Provider swipeDirection="right" asChild>
      <div className='manager-container'>
        <div className='api-key-creation-container'>
          <div className='api-key-creation-text'>
            Would you like to add one?
          </div>
          <div className='api-key-creation'>
            <DialogView selectedExchange={selectedExchange} onSubmit={handleExchangeSelect} handleToast={handleToast} handleToastMessage = {handleToastMessage}  />
          </div>
        </div>
      </div>
      {toastType == 'error' ? 
          <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
            <div className="toast error-toast">
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
          </Toast.Root>
        :
        (<Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
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
        </Toast.Root>
        )
      }
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

export default APiManager;
