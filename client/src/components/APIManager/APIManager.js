import React, { useEffect, useState } from 'react';
import './APiManager.css';
import { serverLink } from '../..';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, Cross2Icon } from '@radix-ui/react-icons';
import { ToastProvider, useToast } from '@radix-ui/react-toast';

const selector = () => {
  const [selectedExchange, setSelectedExchange] = useState('');
  console.log(selectedExchange)
  
  const handleExchangeSelect = (value) => {
    setSelectedExchange(value);
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

const dialogView = () => {
  const handleSubmit = () => {
    if(!selectedExchange){
      
    }

  }

  return (<Dialog.Root>
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
          {selector()}
        </div>

        <div className="field-set-container">
          <fieldset className='field-set'>
            <label className="Label" htmlFor="key">
              Public key
            </label>
            <input className="Input" id="input-api-key" placeholder="public key..." />
          </fieldset>
          <fieldset className='field-set'>
            <label className="Label" htmlFor="key">
              Private key
            </label>
            <input className="Input" id="input-api-key" placeholder="private key..." />
          </fieldset>
        </div>
        <footer className='submit-buttons'>
          <Dialog.Close asChild>
            <button className="submit red">Close</button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <button className="submit green" onSubmit={handleSubmit}>Save</button>
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
  const handleAPIKeyCreation = () => {
    

  };

  return (
    <div className='manager-container'>
      <div className='api-key-creation-container'>
        <div className='api-key-creation-text'>
          Would you like to add one?
        </div>
        <div className='api-key-creation'>
          {dialogView()}
        </div>
      </div>

    </div>
  );
};

export default APiManager;
